import { Notifications } from 'expo';
import { debounce } from 'lodash';
import * as React from 'react';
import { graphql, Query } from 'react-apollo';
import { FlatList, Dimensions, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { CategoriesScroll, HomeLoading, Noresult } from '../../componenets';
import ItemViewSmall from '../../componenets/ItemView';
import {
  Edit,
  Menu,
  OfferAdChoise,
  Report,
  PhotoModal
} from '../../componenets/Menu';
import NotificationModal from '../../componenets/NotificationScreen/NotificationModal';
import createReport from '../../graphql/mutation/createReport';
import deletePost from '../../graphql/mutation/deletePost';
import editClassifieds from '../../graphql/mutation/editClassifieds';
import favoritePost from '../../graphql/mutation/favoritePost';
import unFavoritePost from '../../graphql/mutation/unFavoritePost';
import notificationSub from '../../graphql/mutation/notificationSub';
import refreshToken from '../../graphql/mutation/refreshToken';
import getTimeLine from '../../graphql/query/getTimeLine';
import dislikePost from '../../graphql/mutation/dislikePost';
import likePost from '../../graphql/mutation/likePost';
import {
  addPermission,
  showModal,
  hideModal,
  addNotification,
  addFav,
  saveFav,
  addLike
} from '../../store/actions/globActions';
import { delQuery, setBuckets } from '../../store/actions/postActions';
import { updateUser } from '../../store/actions/userAtions';
import {
  getNextPosts,
  isTablet,
  Message,
  readyPosts,
  registerForPushNotificationsAsync,
  handleOnMenuModal,
  getUserLocation
} from '../../utils';
import MessageAlert from '../../utils/message/MessageAlert';
import CategoriesModal from '../../componenets/HomeScreen/CategoriesModal';
import updateMyQty from '../../graphql/mutation/updateMyQty';
import LoadingTiny from '../../componenets/Common/LoadingTiny';
import MapModal from '../../componenets/ProfileScreen/MapModal';

const { width, height } = Dimensions.get('window');
class HomeScreen extends React.Component<any, any> {
  static navigationOptions = { header: null };

  catScrollHome: any;
  flatListRef: any;
  getNextPosts: any;
  scrollValue = 0;
  subs: any;
  notify: any;
  timer: any;
  constructor(props: any) {
    super(props);
    this.getNextPosts = debounce(getNextPosts, 100);

    this.state = {
      isMenuModalVisible: false,
      isReportModalVisible: false,
      isMessageVisible: false,
      isEditModalVisible: false,
      isCheckMessaheVisible: false,
      isCategoriesModalVisible: false,
      isNotificationModalVisible: false,
      isOfferAdChoiseModalVisible: false,
      isPhotoModalVisible: false,
      isMapModalVisible: false,
      photo: null,
      modalPost: null,
      pressed: null,
      refreshing: false,
      notification: null,
      query: null,
      rest: {},
      location: null,
      itemLocation: null,
      loading: false,
      message: null
    };
  }

  addPushNotification = async () => {
    if (!this.props.permissions.NOTIFICATIONS) {
      if (this.props.isAuthenticated) {
        const pushToken = await registerForPushNotificationsAsync();
        if (pushToken) {
          const res = await this.props.notificationSub({
            variables: {
              userId: this.props.user._id,
              pushToken
            }
          });
          if (res.data.notificationSub.ok) {
            this.props.addPermission('NOTIFICATIONS');
          }
        }
      }
    }
  };

  async componentDidMount() {
    this.getLocation();
    this.subs = [
      this.props.navigation.addListener('didFocus', () => {
        this.addPushNotification();
      }),
      this.props.navigation.addListener('willBlur', () => {
        //
      })
    ];

    this.notify = Notifications.addListener(this.handleNotification);
    this.props.navigation.setParams({ handleHome: this.handleHome });
    this.props.navigation.setParams({ addItem: this.addItem });

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('comments', {
        name: 'Comments',
        priority: 'max',
        sound: true,
        vibrate: [0, 250, 250, 250]
      });
    }
  }

  componentWillUnmount() {
    this.subs.forEach((sub: any) => sub.remove());
    clearTimeout(this.timer);
  }

  getLocation = async () => {
    const location = await getUserLocation();
    this.setState({
      location: {
        lat: location.coords.latitude,
        lon: location.coords.longitude
      },
      loading: false
    });
  };

  handleNotification = async (notification: any) => {
    await this.setState({ notification });
    const { title, body, channelId, priority } = notification;
    Notifications.presentLocalNotificationAsync({
      title,
      body,
      android: {
        channelId
        // priority
      }
    });

    this.props.addNotification();
    if (notification.origin === 'received') {
      this.showNotificationModal();
    } else {
      const postId = notification.data.postId;
      this.props.navigation.navigate('ItemScreen', {
        postId,
        word: this.props.words,
        lang: this.props.lang,
        isRTL: this.props.isRTL
      });
    }
  };

  showMenuModal = (post: any) => {
    this.setState({ isMenuModalVisible: true, modalPost: post });
  };
  hideMenuModal = (payload?: any) => {
    if (payload) {
      const { menuId, postId, post } = payload;
      this.setState({
        isMenuModalVisible: false,
        hideMenuData: { menuId, postId, post }
      });
    } else {
      this.setState({
        isMenuModalVisible: false,
        hideMenuData: null
      });
    }
  };
  showPhotoModal = (photo: any) => {
    this.setState({ isPhotoModalVisible: true, photo });
  };
  hidePhotoModal = () => {
    this.setState({ isPhotoModalVisible: false });
  };
  showEditModal = () => {
    this.setState({ isEditModalVisible: true });
  };
  hideEditModal = () => {
    this.setState({ isEditModalVisible: false });
  };
  showReportModal = () => {
    this.setState({ isReportModalVisible: true });
  };
  hideReportModal = () => {
    this.setState({ isReportModalVisible: false });
  };
  showMessageModal = async ({ message }: any) => {
    await this.setState({ message });
    this.setState({ isMessageVisible: true });
  };
  hideMessageModal = () => {
    this.setState({ isMessageVisible: false, message: null });
  };
  showCheckMessageModal = async () => {
    this.setState({ isCheckMessaheVisible: true });
  };
  hideCheckMessageModal = () => {
    this.setState({ isCheckMessaheVisible: false });
  };
  onCheckMessageModalHide = () => {
    this.showMessageModal({ message: this.props.words.addeleted });
  };
  showCategoriesModal = () => {
    this.props.showModal();
  };
  hideCategoriesModal = () => {
    this.props.hideModal();
  };
  showNotificationModal = () => {
    this.setState({ isNotificationModalVisible: true });
  };
  hideNotificationModal = () => {
    this.setState({ isNotificationModalVisible: false });
  };

  showOfferAdChoiseModal = () => {
    this.setState({ isOfferAdChoiseModalVisible: true });
  };
  hideOfferAdChoiseModal = () => {
    this.setState({ isOfferAdChoiseModalVisible: false });
  };

  showMapModal = async ({ itemLocation, itemTitle }: any) => {
    await this.setState({ itemLocation, itemTitle });
    this.setState({ isMapModalVisible: true });
  };
  hideMapModal = () => {
    this.setState({ isMapModalVisible: false, itemLocation: null });
  };

  deletePost = async () => {
    const res = await this.props.deletePost({
      variables: {
        postId: this.state.modalPost.id
      }
    });
    if (res.data.deletePost.ok) {
      this.updateItemsQty();
    }
    this.hideCheckMessageModal();
  };
  canceldeletePost = async () => {
    this.hideCheckMessageModal();
  };

  handleTop = () => {
    this.flatListRef.getNode().scrollToOffset({ offset: 0, animated: true });
  };

  handleHome = () => {
    if (this.state.rest.categoryId) {
      if (this.scrollValue > 0) {
        this.flatListRef
          .getNode()
          .scrollToOffset({ offset: 0, animated: true });
      } else {
        this.catScrollHome();
      }
    } else {
      if (this.scrollValue > 0) {
        this.flatListRef
          .getNode()
          .scrollToOffset({ offset: 0, animated: true });
      } else {
        this.removeAllFilters();
      }
    }
  };

  addItem = () => {
    if (this.props.isAuthenticated) {
      if (this.props.user.isstore) {
        this.showOfferAdChoiseModal();
      } else {
        this.props.navigation.navigate('ChoiseScreen', {
          title: this.props.words.addnewad
        });
      }
    } else {
      this.props.navigation.navigate('PhoneScreen', {
        add: true,
        origin: 'home'
      });
    }
  };

  clearNotification = () => {
    this.props.navigation.setParams({ notification: false });
  };

  addFilter = (itemKind: any, value: any) => {
    this.setState({ rest: { ...this.state.rest, [itemKind]: value } });
    if (itemKind === 'sortType' && value === 3) {
      this.setState({ loadinLocation: true });
    }
  };
  removeFilter = (itemKind: any) => {
    const filters = this.state.rest;
    delete filters[itemKind];
    this.setState({
      rest: filters
    });
  };
  removeAllFilters = () => {
    this.setState({
      rest: {}
    });
    this.props.delQuery();
  };
  removeAllCategoryFilters = () => {
    const newrest = { categoryId: this.state.rest.categoryId };
    this.setState({
      rest: newrest
    });
  };
  selectePost = (post: any, word: any, lang: any, isRTL: any) => {
    this.props.navigation.navigate('ItemScreen', { post, word, lang, isRTL });
  };

  updateItemsQty = (message?: any) => {
    this.showMessageModal({ message });
    this.timer = setTimeout(async () => {
      const res = await this.props.updateMyQty({});
      if (res.data.updateMyQty.ok) {
        const { data } = res.data.updateMyQty;
        await this.props.updateUser(data);
      }
    }, 2000);
  };

  handleOnMenuModalHide = async () => {
    if (!this.state.hideMenuData || !this.state.hideMenuData.menuId) {
      return;
    }
    const { menuId, postId, post } = this.state.hideMenuData;
    handleOnMenuModal({
      menuId,
      postId,
      post,
      words: this.props.words,
      isAuthenticated: this.props.isAuthenticated,
      showMessageModal: this.showMessageModal,
      favoritePost: this.props.favoritePost,
      unFavoritePost: this.props.unFavoritePost,
      showReportModal: this.showReportModal,
      editClassifieds: this.props.editClassifieds,
      updateItemsQty: this.updateItemsQty,
      showEditModal: this.showEditModal,
      showCheckMessageModal: this.showCheckMessageModal
    });
  };

  render() {
    const { rest } = this.state;
    const { lang, words, isRTL } = this.props;
    const postId = this.state.modalPost
      ? this.state.modalPost.id
        ? this.state.modalPost.id
        : this.state.modalPost._id
      : null;

    if (this.state.loading) {
      return <LoadingTiny size={40} />;
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        {this.state.isNotificationModalVisible && (
          <NotificationModal
            isNotificationModalVisible={this.state.isNotificationModalVisible}
            hideNotificationModal={this.hideNotificationModal}
            notification={this.state.notification}
            lang={lang}
            word={words}
            navigation={this.props.navigation}
            isRTL={isRTL}
          />
        )}
        <Menu
          post={this.state.modalPost}
          favoritePost={this.props.favoritePost}
          isMenuModalVisible={this.state.isMenuModalVisible}
          hideMenuModal={this.hideMenuModal}
          showReportModal={this.showReportModal}
          showMessageModal={this.showMessageModal}
          editClassifieds={this.props.editClassifieds}
          showEditModal={this.showEditModal}
          showCheckMessageModal={this.showCheckMessageModal}
          handleOnMenuModalHide={this.handleOnMenuModalHide}
          postId={postId}
          word={words}
          isRTL={isRTL}
          isAuthenticated={this.props.isAuthenticated}
          user={this.props.user}
        />
        <PhotoModal
          photo={this.state.photo}
          favoritePost={this.props.favoritePost}
          isPhotoModalVisible={this.state.isPhotoModalVisible}
          hidePhotoModal={this.hidePhotoModal}
        />
        <OfferAdChoise
          isOfferAdChoiseModalVisible={this.state.isOfferAdChoiseModalVisible}
          hideOfferAdChoiseModal={this.hideOfferAdChoiseModal}
          navigation={this.props.navigation}
          word={words}
          isRTL={isRTL}
          user={this.props.user}
        />

        {this.state.isEditModalVisible && (
          <Edit
            isEditModalVisible={this.state.isEditModalVisible}
            editClassifieds={this.props.editClassifieds}
            hideEditModal={this.hideEditModal}
            showMessageModal={this.showMessageModal}
            word={words}
            isRTL={isRTL}
            postId={postId}
            post={this.state.modalPost}
          />
        )}
        <Report
          isReportModalVisible={this.state.isReportModalVisible}
          showMessageModal={this.showMessageModal}
          hideReportModal={this.hideReportModal}
          createReport={this.props.createReport}
          post={this.state.modalPost}
          word={words}
          isRTL={isRTL}
        />
        <MessageAlert
          isMessageVisible={this.state.isMessageVisible}
          hideMessageModal={this.hideMessageModal}
          message={this.state.message}
          screen={this.state.screen}
          icon="ios-checkmark-circle"
          isRTL={isRTL}
          height={120}
        />
        <Message
          isVisible={this.state.isCheckMessaheVisible}
          body={words.deleteareyousure}
          icon="ios-information-circle"
          width={width}
          okbtnTitle={words.yes}
          cancelbtnTitle={words.cancel}
          okAction={this.deletePost}
          cancelAction={this.canceldeletePost}
          onCheckMessageModalHide={this.onCheckMessageModalHide}
          isRTL={isRTL}
          iconColor="#E85255"
          height={200}
        />
        <CategoriesModal
          isCategoriesModalVisible={this.props.isShowModal}
          hideCategoriesModal={this.hideCategoriesModal}
          categories={this.props.categories}
          isRTL={this.props.isRTL}
          navigation={this.props.navigation}
          addFilter={this.addFilter}
          word={words}
          removeAllFilters={this.removeAllFilters}
        />
        {this.state.itemLocation &&
          this.state.itemLocation.lat &&
          this.state.itemLocation.lon && (
            <MapModal
              isMapModalVisible={this.state.isMapModalVisible}
              hideMapModal={this.hideMapModal}
              lat={this.state.itemLocation.lat}
              lon={this.state.itemLocation.lon}
              title={this.state.itemTitle}
              width={width}
              height={height}
            />
          )}

        <Query
          query={getTimeLine}
          variables={{
            ...rest
            // trueLocation: this.state.location,
            // sortType: 3
          }}
        >
          {({ loading, error, data, fetchMore, refetch }: any) => {
            if (loading) {
              return <HomeLoading categoryId={rest.categoryId} />;
            }
            if (error) {
              return <Noresult title="error" top={100} />;
            }
            const postsQuery = data.getTimeLine.posts;
            const posts =
              postsQuery.length > 0
                ? readyPosts(postsQuery, isTablet() ? 800 : 600, 79, lang)
                : postsQuery;

            return (
              <FlatList
                data={posts}
                ref={(ref: any) => {
                  this.flatListRef = ref;
                }}
                scrollEventThrottle={16}
                contentContainerStyle={{
                  paddingBottom: 160
                }}
                showsVerticalScrollIndicator={false}
                onRefresh={() => refetch()}
                refreshing={this.state.refreshing}
                onEndReached={async () => {
                  this.getNextPosts(data, fetchMore, 'getTimeLine');
                }}
                renderItem={({ item }: any) => (
                  <ItemViewSmall
                    post={item}
                    pressed={this.state.pressed}
                    navigation={this.props.navigation}
                    showMenuModal={this.showMenuModal}
                    showPhotoModal={this.showPhotoModal}
                    selectePost={this.selectePost}
                    word={this.props.words}
                    isRTL={isRTL}
                    lang={lang}
                    mylocation={this.state.location}
                    addFav={this.props.addFav}
                    addLike={this.props.addLike}
                    saveFav={this.props.saveFav}
                    likes={this.props.likes}
                    favoorites={this.props.favoorites}
                    isAuthenticated={this.props.isAuthenticated}
                    favs={this.props.favs}
                    likePost={this.props.likePost}
                    dislikePost={this.props.dislikePost}
                    favoritePost={this.props.favoritePost}
                    unFavoritePost={this.props.unFavoritePost}
                    showMapModal={this.showMapModal}
                  />
                )}
                ListHeaderComponent={() => {
                  if (posts.length === 0) {
                    return <Noresult title={words.noresults} />;
                  } else {
                    // return <View />;
                    // TODO:
                    return (
                      <CategoriesScroll
                        setHome={(click: any) => (this.catScrollHome = click)}
                        isRTL={isRTL}
                        currentCategory={this.state.rest.categoryId}
                        showCategoriesModal={this.showCategoriesModal}
                        addFilter={this.addFilter}
                        removeFilter={this.removeFilter}
                        removeAllFilters={this.removeAllFilters}
                        removeAllCategoryFilters={this.removeAllCategoryFilters}
                        navigation={this.props.navigation}
                        rest={this.state.rest}
                      />
                    );
                  }
                }}
                numColumns={1}
                keyExtractor={(item: any) => item.id}
                onEndReachedThreshold={5}
                removeClippedSubviews={true}
                disableVirtualization={false}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  lang: state.glob.languageName,
  isRTL: state.glob.isRTL,
  permissions: state.glob.permissions,
  categories: state.glob.language.category,
  words: state.glob.language.words,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
  pushToken: state.user.pushToken,
  query: state.post.query,
  isShowModal: state.glob.showModal,
  likes: state.glob.likes,
  favs: state.glob.favs,
  favoorites: state.glob.favoorites
});

export default connect(
  mapStateToProps,
  {
    setBuckets,
    delQuery,
    addPermission,
    showModal,
    hideModal,
    addNotification,
    updateUser,
    addFav,
    saveFav,
    addLike
  }
)(
  graphql(refreshToken, {
    name: 'refreshToken'
  })(
    graphql(favoritePost, {
      name: 'favoritePost',
      options: { refetchQueries: ['getMyFavoritePosts'] }
    })(
      graphql(notificationSub, {
        name: 'notificationSub'
      })(
        graphql(deletePost, {
          name: 'deletePost'
        })(
          graphql(editClassifieds, {
            name: 'editClassifieds'
          })(
            graphql(createReport, {
              name: 'createReport'
            })(
              graphql(updateMyQty, {
                name: 'updateMyQty',
                options: { refetchQueries: ['getUserPosts', 'getTimeLine'] }
              })(
                graphql(likePost, {
                  name: 'likePost'
                })(
                  graphql(dislikePost, {
                    name: 'dislikePost'
                  })(
                    graphql(unFavoritePost, {
                      name: 'unFavoritePost'
                    })(HomeScreen)
                  )
                )
              )
            )
          )
        )
      )
    )
  )
);

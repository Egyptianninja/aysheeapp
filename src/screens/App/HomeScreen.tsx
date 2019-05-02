import { Notifications, Constants } from 'expo';
import { debounce } from 'lodash';
import * as React from 'react';
import { graphql, Query } from 'react-apollo';
import {
  FlatList,
  Dimensions,
  View,
  Platform,
  Text,
  TouchableOpacity,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import { HomeLoading, Noresult } from '../../componenets';
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
import createComment from '../../graphql/mutation/createComment';
import deleteComment from '../../graphql/mutation/deleteComment';
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
  addLike,
  addCategoryId
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
  getUserLocation,
  rtlos
} from '../../utils';
import MessageAlert from '../../utils/message/MessageAlert';
import updateMyQty from '../../graphql/mutation/updateMyQty';
import LoadingTiny from '../../componenets/Common/LoadingTiny';
import MapModal from '../../componenets/ProfileScreen/MapModal';
import Comments from '../../componenets/ItemView/Comments';
import FollowModal from '../../componenets/HomeScreen/FollowModal';
import HomeHeader from '../../componenets/HomeScreen/HomeHeader';

const { width, height } = Dimensions.get('window');

const AnimatedListView = Animated.createAnimatedComponent(FlatList);

class HomeScreen extends React.Component<any, any> {
  static navigationOptions = { header: null };

  catScrollHome: any;
  flatListRef: any;
  getNextPosts: any;
  scrollEndTimer: any;
  clampedScrollValue = 0;
  scrollValue = 0;
  offsetValue = 0;
  NAVBAR_HEIGHT = 40;
  subs: any;
  notify: any;
  timer: any;
  constructor(props: any) {
    super(props);
    this.getNextPosts = debounce(getNextPosts, 100);

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);
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
      isCommentsModalVisible: false,
      isFollowModalVisible: false,
      photo: null,
      photos: null,
      modalPost: null,
      pressed: null,
      refreshing: false,
      notification: null,
      query: null,
      rest: {},
      location: null,
      itemLocation: null,
      itemLocations: null,
      loading: false,
      message: null,
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp'
          }),
          offsetAnim
        ),
        0,
        this.NAVBAR_HEIGHT
      )
    };
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.isShowModal !== this.props.isShowModal) {
      this.addItem();
    }
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
    this.subs = [
      this.props.navigation.addListener('didFocus', () => {
        this.addPushNotification();
        // this.flatListRef &&
        //   this.flatListRef.getNode().scrollToOffset({
        //     offset: this.state.offsetAnim + 1,
        //     animated: true
        //   });
      }),
      this.props.navigation.addListener('willBlur', () => {
        //
      })
    ];

    this.state.scrollAnim.addListener(({ value }: any) => {
      const diff = value - this.scrollValue;
      this.scrollValue = value;
      this.clampedScrollValue = Math.min(
        Math.max(this.clampedScrollValue + diff, 0),
        this.NAVBAR_HEIGHT
      );
    });
    this.state.offsetAnim.addListener(({ value }: any) => {
      this.offsetValue = value;
    });

    this.notify = Notifications.addListener(this.handleNotification);
    this.props.navigation.setParams({ handleHome: this.handleTop });
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
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
    this.subs.forEach((sub: any) => sub.remove());
    clearTimeout(this.timer);
  }

  _onScrollEndDrag = () => {
    this.scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  };

  _onMomentumScrollBegin = () => {
    clearTimeout(this.scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    const toValue =
      this.scrollValue > this.NAVBAR_HEIGHT &&
      this.clampedScrollValue > this.NAVBAR_HEIGHT / 2
        ? this.offsetValue + this.NAVBAR_HEIGHT
        : this.offsetValue - this.NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true
    }).start();
  };

  getLocation = async () => {
    this.setState({ loading: true });
    const location = await getUserLocation();
    if (location) {
      this.setState({
        location: {
          lat: location.coords.latitude,
          lon: location.coords.longitude
        },
        loading: false
      });
      return true;
    } else {
      return false;
    }
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
  showPhotoModal = ({ photos, photo }: any) => {
    this.setState({ isPhotoModalVisible: true, photos, photo });
  };
  hidePhotoModal = () => {
    this.setState({ isPhotoModalVisible: false, photos: null, photo: null });
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

  showMapModal = async ({ itemLocation, itemLocations, itemTitle }: any) => {
    await this.setState({ itemLocation, itemLocations, itemTitle });
    this.setState({ isMapModalVisible: true });
  };
  hideMapModal = () => {
    this.setState({ isMapModalVisible: false, itemLocation: null });
  };

  showCommentsModal = async (post: any) => {
    await this.setState({ modalPost: post });
    this.setState({ isCommentsModalVisible: true });
  };
  hideCommentsModal = () => {
    this.setState({ isCommentsModalVisible: false, modalPost: null });
  };
  showFollowModal = () => {
    this.setState({ isFollowModalVisible: true });
  };
  hideFollowModal = () => {
    this.setState({ isFollowModalVisible: false });
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
    // this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
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

  addFilter = async (itemKind: any, value: any) => {
    if (itemKind === 'sortType' && value === 3) {
      const loc = await this.getLocation();
      if (loc) {
        this.setState({
          rest: {
            ...this.state.rest,
            [itemKind]: value,
            trueLocation: this.state.location
          }
        });
      }
    } else if (itemKind === 'sortType' && value === 1) {
      const filters = this.state.rest;
      delete filters.trueLocation;
      const updatedfilters = { ...filters, [itemKind]: value };
      this.setState({ rest: updatedfilters });
    } else {
      this.setState({ rest: { ...this.state.rest, [itemKind]: value } });
    }
  };
  removeFilter = (itemKind: any) => {
    const filters = this.state.rest;
    if (itemKind === 'sortType') {
      delete filters[itemKind];
      delete filters.trueLocation;
      this.setState({
        rest: filters
      });
    } else {
      delete filters[itemKind];
      this.setState({
        rest: filters
      });
    }
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

  addOfferFilter = (value: any) => {
    const offerinrest = this.state.rest.isoffer === true;
    if (value === true) {
      if (offerinrest) {
        return;
      } else {
        this.addFilter('isoffer', true);
      }
    } else if (value === false) {
      if (offerinrest) {
        this.removeFilter('isoffer');
      } else {
        return;
      }
    }
  };

  renderSubHeader = () => {
    const { words } = this.props;
    const near = this.state.rest.sortType === 3;
    const time = this.state.rest.sortType === 1;
    const isoffer = this.state.rest.isoffer === true;

    return (
      <View
        style={{
          height: 40,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#F3F3F3',
          width
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginHorizontal: 10,
            flex: 1
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              padding: 4,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor: time || !near ? '#373737' : '#f9f9f9'
            }}
            onPress={() =>
              time
                ? this.removeFilter('sortType')
                : this.addFilter('sortType', 1)
            }
            disabled={time || !near}
          >
            <Text
              style={{
                fontSize: 13,
                color: time || !near ? '#f9f9f9' : '#373737'
              }}
            >
              {words.latest}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              padding: 4,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor: near ? '#373737' : '#f9f9f9'
            }}
            onPress={() =>
              near
                ? this.removeFilter('sortType')
                : this.addFilter('sortType', 3)
            }
            disabled={near}
          >
            <Text style={{ fontSize: 13, color: near ? '#f9f9f9' : '#373737' }}>
              {words.nearby}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 10,
              borderWidth: 1,
              minWidth: 80,
              borderColor: '#ccc',
              marginHorizontal: 10,
              paddingHorizontal: 10,
              padding: 4,
              backgroundColor: isoffer ? '#373737' : '#f9f9f9',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            // onPress={() => this.showFollowModal()}
            onPress={() =>
              isoffer
                ? this.removeFilter('isoffer')
                : this.addFilter('isoffer', true)
            }
          >
            <Text
              style={{ color: isoffer ? '#f9f9f9' : '#373737', fontSize: 14 }}
            >
              {words.offersoly}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderTimeLineQuery = ({ variables, lang, isRTL, words }: any) => {
    return (
      <Query
        query={getTimeLine}
        variables={{ ...variables, ...this.state.rest }}
      >
        {({ loading, error, data, fetchMore, refetch }: any) => {
          if (loading) {
            return <HomeLoading />;
          }
          if (error) {
            return <Noresult top={100} title="network error" />;
          }
          const postsQuery =
            data.getTimeLine && data.getTimeLine.posts
              ? data.getTimeLine.posts
              : [];

          const posts =
            postsQuery.length > 0
              ? readyPosts(postsQuery, isTablet() ? 800 : 600, 79, lang)
              : postsQuery;

          return (
            <AnimatedListView
              data={posts}
              ref={(ref: any) => {
                this.flatListRef = ref;
              }}
              scrollEventThrottle={16}
              contentContainerStyle={{
                paddingTop: 40,
                paddingBottom: 160
              }}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: { y: this.state.scrollAnim }
                    }
                  }
                ],
                { useNativeDriver: true }
              )}
              style={{ flex: 1 }}
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
                  showCommentsModal={this.showCommentsModal}
                  showPhotoModal={this.showPhotoModal}
                  selectePost={this.selectePost}
                  word={this.props.words}
                  isRTL={isRTL}
                  lang={lang}
                  locSort={this.state.rest.sortType === 3}
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
                  width={width}
                />
              )}
              ListHeaderComponent={() => {
                if (!data.getTimeLine || !data.getTimeLine.posts) {
                  setTimeout(() => {
                    refetch();
                  }, 1000);
                  return (
                    <View
                      style={{
                        flex: 1,
                        height: height - 100,
                        width,
                        bottom: 0
                      }}
                    >
                      <HomeLoading />
                    </View>
                  );
                } else if (posts.length === 0) {
                  return <Noresult top={100} title={words.noresults} />;
                } else {
                  return <View />;
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
    );
  };

  render() {
    const { lang, words, isRTL } = this.props;
    const postId = this.state.modalPost
      ? this.state.modalPost.id
        ? this.state.modalPost.id
        : this.state.modalPost._id
      : null;
    const navbarTranslate = this.state.clampedScroll.interpolate({
      inputRange: [0, this.NAVBAR_HEIGHT],
      outputRange: [0, -this.NAVBAR_HEIGHT],
      extrapolate: 'clamp'
    });

    if (this.state.loading) {
      return (
        <React.Fragment>
          <HomeHeader
            showFollowModal={this.showFollowModal}
            navigation={this.props.navigation}
          />
          {this.renderSubHeader()}
          <LoadingTiny size={40} />
        </React.Fragment>
      );
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
        {this.state.modalPost && (
          <Comments
            post={this.state.modalPost}
            favoritePost={this.props.favoritePost}
            createComment={this.props.createComment}
            isCommentsModalVisible={this.state.isCommentsModalVisible}
            hideCommentsModal={this.hideCommentsModal}
            postId={postId}
            word={words}
            isRTL={isRTL}
            isAuthenticated={this.props.isAuthenticated}
            user={this.props.user}
            lang={this.props.lang}
            deleteComment={this.props.deleteComment}
            navigation={this.props.navigation}
          />
        )}
        <PhotoModal
          photo={this.state.photo}
          photos={this.state.photos}
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
        <FollowModal
          isFollowModalVisible={this.state.isFollowModalVisible}
          hideFollowModal={this.hideFollowModal}
          word={words}
          isRTL={isRTL}
          user={this.props.user}
          removeFilter={this.removeFilter}
          addFilter={this.addFilter}
          categories={this.props.categories}
          addCategoryId={this.props.addCategoryId}
          categoryIds={this.props.categoryIds}
          addOfferFilter={this.addOfferFilter}
          navigation={this.props.navigation}
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

        {(this.state.itemLocation || this.state.itemLocations) && (
          <MapModal
            isMapModalVisible={this.state.isMapModalVisible}
            hideMapModal={this.hideMapModal}
            itemLocation={this.state.itemLocation}
            itemLocations={this.state.itemLocations}
            title={this.state.itemTitle}
            width={width}
            height={height}
          />
        )}
        <HomeHeader
          showFollowModal={this.showFollowModal}
          navigation={this.props.navigation}
        />
        <Animated.View
          style={{
            zIndex: 100,
            position: 'absolute',
            top: Constants.statusBarHeight + 40,
            left: 0,
            right: 0,
            height: this.NAVBAR_HEIGHT,
            transform: [{ translateY: navbarTranslate }],
            minHeight: this.NAVBAR_HEIGHT,
            borderBottomWidth: 1,
            borderBottomColor: '#eee'
          }}
        >
          {this.renderSubHeader()}
        </Animated.View>
        {this.renderTimeLineQuery({
          variables:
            this.props.categoryIds.length > 0
              ? { categoryIds: this.props.categoryIds }
              : {},
          isRTL,
          lang,
          words
        })}
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
  favoorites: state.glob.favoorites,
  categoryIds: state.glob.categoryIds
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
    addLike,
    addCategoryId
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
                    })(
                      graphql(createComment, {
                        name: 'createComment'
                      })(
                        graphql(deleteComment, {
                          name: 'deleteComment',
                          options: { refetchQueries: ['getPostComments'] }
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
    )
  )
);

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
  Animated,
  Modal,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { HomeLoading, Noresult } from '../../componenets';
import ItemViewSmall from '../../componenets/ItemView';
import { PhotoModal } from '../../componenets/Menu';
import NotificationModal from '../../componenets/NotificationScreen/NotificationModal';
import getTimeLine from '../../graphql/query/getTimeLine';

import favoritePost from '../../graphql/mutation/favoritePost';
import unFavoritePost from '../../graphql/mutation/unFavoritePost';
import notificationSub from '../../graphql/mutation/notificationSub';
import refreshToken from '../../graphql/mutation/refreshToken';
import createComment from '../../graphql/mutation/createComment';
import deleteComment from '../../graphql/mutation/deleteComment';
import dislikePost from '../../graphql/mutation/dislikePost';
import likePost from '../../graphql/mutation/likePost';
import {
  addPermission,
  addNotification,
  addFav,
  saveFav,
  addLike,
  addCategoryId
} from '../../store/actions/globActions';
import { delQuery, setBuckets } from '../../store/actions/postActions';
import {
  getNextPosts,
  isTablet,
  readyPosts,
  registerForPushNotificationsAsync,
  getUserLocation,
  rtlos
} from '../../utils';
import MapModal from '../../componenets/ProfileScreen/MapModal';
import Comments from '../../componenets/ItemView/Comments';
import HomeHeader from '../../componenets/HomeScreen/HomeHeader';
import BranchModal from '../../componenets/HomeScreen/BranchModal';
import { images } from '../../load';

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
  nonNativeScroll = new Animated.Value(0);

  constructor(props: any) {
    super(props);
    this.getNextPosts = debounce(getNextPosts, 100);
    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);
    this.state = {
      isNotificationModalVisible: false,
      isPhotoModalVisible: false,
      isMapModalVisible: false,
      isCommentsModalVisible: false,
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
      // modalVisible: Platform.OS === 'android' ? false : true,
      modalVisible: false,
      message: null,
      branch: null,
      branchTitle: null,
      nearbyActive: false,
      latestActive: true,
      offersActive: false,
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

        this.flatListRef &&
          this.flatListRef.getNode().scrollToOffset({
            offset: this.scrollValue + 1,
            animated: false
          });
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

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('comments', {
        name: 'Comments',
        priority: 'max',
        sound: true,
        vibrate: [0, 250, 250, 250]
      });
    }
    setTimeout(() => {
      this.setState({ modalVisible: false });
    }, 1000);
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

  showPhotoModal = ({ photos, photo }: any) => {
    this.setState({ isPhotoModalVisible: true, photos, photo });
  };
  hidePhotoModal = () => {
    this.setState({ isPhotoModalVisible: false, photos: null, photo: null });
  };

  showNotificationModal = () => {
    this.setState({ isNotificationModalVisible: true });
  };
  hideNotificationModal = () => {
    this.setState({ isNotificationModalVisible: false });
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
  showBranchModal = async ({ origbranch, branch }: any) => {
    await this.setState({ branch: origbranch, branchTitle: branch });
    this.setState({ isBranchModalVisible: true });
  };
  hideBranchModal = () => {
    this.setState({
      isBranchModalVisible: false,
      branch: null,
      branchTitle: null
    });
  };

  handleTop = () => {
    this.flatListRef.getNode().scrollToOffset({ offset: 0, animated: true });
    // this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
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
    return (
      <View
        style={{
          height: 40,
          flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#F3F3F3',
          width
        }}
      >
        <View
          style={{
            flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
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
              borderTopLeftRadius: rtlos() === 3 ? undefined : 10,
              borderBottomLeftRadius: rtlos() === 3 ? undefined : 10,
              borderTopRightRadius: rtlos() === 3 ? 10 : undefined,
              borderBottomRightRadius: rtlos() === 3 ? 10 : undefined,
              borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor: this.state.latestActive ? '#373737' : '#f9f9f9'
            }}
            onPress={() => {
              this.setState({ latestActive: true, nearbyActive: false });
              this.addFilter('sortType', 1);
            }}
            disabled={this.state.latestActive}
          >
            <Text
              style={{
                fontSize: 13,
                color: this.state.latestActive ? '#f9f9f9' : '#373737'
              }}
            >
              {words.latest}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              padding: 4,
              borderTopRightRadius: rtlos() === 3 ? undefined : 10,
              borderBottomRightRadius: rtlos() === 3 ? undefined : 10,
              borderTopLeftRadius: rtlos() === 3 ? 10 : undefined,
              borderBottomLeftRadius: rtlos() === 3 ? 10 : undefined,
              borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor: this.state.nearbyActive ? '#373737' : '#f9f9f9'
            }}
            onPress={() => {
              this.setState({ latestActive: false, nearbyActive: true });
              this.addFilter('sortType', 3);
            }}
            disabled={this.state.nearbyActive}
          >
            <Text
              style={{
                fontSize: 13,
                color: this.state.nearbyActive ? '#f9f9f9' : '#373737'
              }}
            >
              {words.nearby}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: rtlos() === 3 ? 'flex-start' : 'flex-end',
            justifyContent: 'center'
          }}
        />
      </View>
    );
  };

  renderTimeLineQuery = ({ variables, lang, isRTL, words }: any) => {
    return (
      <Query
        query={getTimeLine}
        variables={{ ...variables, ...this.state.rest }}
        onCompleted={() => this.setState({ modalVisible: false })}
      >
        {({ loading, error, data, fetchMore, refetch }: any) => {
          if (loading) {
            return <HomeLoading />;
          }
          if (error) {
            return <Noresult title="network error" />;
          }
          if (!data.getTimeLine || !data.getTimeLine.posts) {
            refetch();
            return <HomeLoading />;
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
                paddingTop: this.NAVBAR_HEIGHT,
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
                  showBranchModal={this.showBranchModal}
                />
              )}
              ListHeaderComponent={() => {
                if (posts.length === 0) {
                  return <Noresult title={words.noresults} />;
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
        {this.state.branch && (
          <BranchModal
            branch={this.state.branch}
            branchTitle={this.state.branchTitle}
            rest={this.state.rest}
            hideBranchModal={this.hideBranchModal}
            categoryIds={this.props.categoryIds}
            isBranchModalVisible={this.state.isBranchModalVisible}
            width={width}
            height={height}
            navigation={this.props.navigation}
            words={this.props.words}
            isRTL={isRTL}
            lang={lang}
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
            showPhotoModal={this.showPhotoModal}
          />
        )}
        <HomeHeader
          navigation={this.props.navigation}
          word={words}
          isRTL={isRTL}
          user={this.props.user}
          removeFilter={this.removeFilter}
          addFilter={this.addFilter}
          categories={this.props.categories}
          addCategoryId={this.props.addCategoryId}
          categoryIds={this.props.categoryIds}
          addOfferFilter={this.addOfferFilter}
        />
        <Modal
          animationType="none"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View
            style={[
              {
                width,
                height,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f3f3f3'
              }
            ]}
          >
            <Image
              source={images.load}
              style={{ flex: 1 }}
              resizeMode="contain"
              fadeDuration={0}
            />
          </View>
        </Modal>
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
        {this.state.loading && <HomeLoading />}

        {!this.state.loading &&
          this.renderTimeLineQuery({
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
    addNotification,
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
);

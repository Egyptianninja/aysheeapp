import { debounce } from 'lodash';
import * as React from 'react';
import { graphql, Query } from 'react-apollo';
import {
  Animated,
  Dimensions,
  TouchableOpacity,
  View,
  FlatList,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { HomeLoading, Noresult } from '../../componenets';
import FilterModal from '../../componenets/category/FilterModal';
import Header from '../../componenets/category/Header';
import ItemViewSmall from '../../componenets/ItemView';
import { Edit, Menu, Report, PhotoModal } from '../../componenets/Menu';
import createReport from '../../graphql/mutation/createReport';
import deletePost from '../../graphql/mutation/deletePost';
import editClassifieds from '../../graphql/mutation/editClassifieds';
import deleteComment from '../../graphql/mutation/deleteComment';
import favoritePost from '../../graphql/mutation/favoritePost';
import getCategoryPosts from '../../graphql/query/getCategoryPosts';
import { delQuery, setBuckets } from '../../store/actions/postActions';
import { updateUser } from '../../store/actions/userAtions';
import {
  getNextPosts,
  isTablet,
  Message,
  readyPosts,
  rtlos,
  handleOnMenuModal,
  getUserLocation,
  getTimeLineBuckets
} from '../../utils';
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
import MessageAlert from '../../utils/message/MessageAlert';
import updateMyQty from '../../graphql/mutation/updateMyQty';
import Comments from '../../componenets/ItemView/Comments';
import likePost from '../../graphql/mutation/likePost';
import dislikePost from '../../graphql/mutation/dislikePost';
import unFavoritePost from '../../graphql/mutation/unFavoritePost';
import createComment from '../../graphql/mutation/createComment';
import MapModal from '../../componenets/ProfileScreen/MapModal';
import { Constants } from 'expo';
import LoadingTiny from '../../componenets/Common/LoadingTiny';
import * as store from '../../store/getStore';

const AnimatedListView = Animated.createAnimatedComponent(FlatList);
const { width, height } = Dimensions.get('window');
class CategoryScreen extends React.Component<any, any> {
  static navigationOptions = { header: null };
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const category = nextProps.navigation.getParam('item');
    if (category.id !== prevState.rest.categoryId) {
      return { rest: { categoryId: category.id } };
    } else {
      return { ...prevState };
    }
  }
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
      isFilterModalVisible: false,
      isMenuModalVisible: false,
      isReportModalVisible: false,
      isMessageVisible: false,
      isEditModalVisible: false,
      isCheckMessaheVisible: false,
      isMapModalVisible: false,
      isItemMapModalVisible: false,
      isCommentsModalVisible: false,
      isPhotoModalVisible: false,
      itemLocation: null,
      itemLocations: null,
      modalPost: null,
      pressed: null,
      refreshing: false,
      notification: null,
      query: null,
      rest: { categoryId: 1 },
      message: null,
      latestActive: true,
      nearbyActive: false,
      priceActive: false,
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

  componentDidMount() {
    const category = this.props.navigation.getParam('item');
    this.setState({ rest: { categoryId: category.id } });
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
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
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

  showFilterModal = () => {
    this.setState({ isFilterModalVisible: true });
  };
  hideFilterModal = () => {
    this.setState({ isFilterModalVisible: false });
  };

  showMapModal = async () => {
    this.setState({ isMapModalVisible: true });
  };
  hideMapModal = () => {
    this.setState({ isMapModalVisible: false });
  };

  showItemMapModal = async ({
    itemLocation,
    itemLocations,
    itemTitle
  }: any) => {
    await this.setState({ itemLocation, itemLocations, itemTitle });
    this.setState({ isItemMapModalVisible: true });
  };
  hideItemMapModal = () => {
    this.setState({ isItemMapModalVisible: false, itemLocation: null });
  };

  handleTop = () => {
    this.flatListRef.getNode().scrollToOffset({ offset: 0, animated: true });
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
    } else if (itemKind === 'sortType' && (value === 1 || value === 2)) {
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

  applyFilters = (rest: any) => {
    this.setState({ rest });
  };

  selectePost = (post: any, word: any, lang: any, isRTL: any) => {
    this.props.navigation.navigate('ItemScreen', { post, word, lang, isRTL });
  };

  getSortBucket = () => {
    return {
      name: 'sortType',
      buckets: this.props.sort,
      label: this.props.words.sort
    };
  };

  showCommentsModal = async (post: any) => {
    await this.setState({ modalPost: post });
    this.setState({ isCommentsModalVisible: true });
  };
  hideCommentsModal = () => {
    this.setState({ isCommentsModalVisible: false, modalPost: null });
  };

  showPhotoModal = ({ photos, photo }: any) => {
    this.setState({ isPhotoModalVisible: true, photos, photo });
  };
  hidePhotoModal = () => {
    this.setState({ isPhotoModalVisible: false, photos: null, photo: null });
  };

  renderCategoryQuery = ({ variables, lang, isRTL, words }: any) => {
    return (
      <Query
        query={getCategoryPosts}
        variables={{ ...variables, ...this.state.rest }}
        onCompleted={(data: any) => {
          const buckets = getTimeLineBuckets(
            this.state.rest.categoryId,
            store,
            data
          );
          this.props.setBuckets(buckets);
        }}
      >
        {({ loading, error, data, fetchMore, refetch }: any) => {
          if (loading) {
            return <HomeLoading />;
          }
          if (error) {
            return <Noresult top={100} title="network error" />;
          }
          if (!data.getCategoryPosts || !data.getCategoryPosts.posts) {
            refetch();
            return <HomeLoading />;
          }
          const postsQuery =
            data.getCategoryPosts && data.getCategoryPosts.posts
              ? data.getCategoryPosts.posts
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
                this.getNextPosts(data, fetchMore, 'getCategoryPosts');
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
                  showMapModal={this.showItemMapModal}
                  width={width}
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

  renderSubHeader = () => {
    const { words } = this.props;
    const {
      latestActive,
      nearbyActive,
      priceActive,
      offersActive
    } = this.state;

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
              backgroundColor: latestActive ? '#373737' : '#f9f9f9'
            }}
            onPress={() => {
              this.setState({
                latestActive: true,
                nearbyActive: false,
                priceActive: false
              });
              this.addFilter('sortType', 1);
            }}
            disabled={latestActive}
          >
            <Text
              style={{
                fontSize: 13,
                color: latestActive ? '#f9f9f9' : '#373737'
              }}
            >
              {words.latest}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              padding: 4,
              borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor: nearbyActive ? '#373737' : '#f9f9f9'
            }}
            onPress={() => {
              this.setState({
                latestActive: false,
                nearbyActive: true,
                priceActive: false
              });
              this.addFilter('sortType', 3);
            }}
            disabled={nearbyActive}
          >
            <Text
              style={{
                fontSize: 13,
                color: nearbyActive ? '#f9f9f9' : '#373737'
              }}
            >
              {words.nearby}
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
              backgroundColor: priceActive ? '#373737' : '#f9f9f9'
            }}
            onPress={() => {
              this.setState({
                latestActive: false,
                nearbyActive: false,
                priceActive: true
              });
              this.addFilter('sortType', 2);
            }}
            disabled={priceActive}
          >
            <Text
              style={{
                fontSize: 13,
                color: priceActive ? '#f9f9f9' : '#373737'
              }}
            >
              {words.lessprice}
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

  render() {
    const { rest } = this.state;
    const { lang, words, isRTL } = this.props;
    const category = this.props.navigation.getParam('item');
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
        <FilterModal
          showFilterModal={this.showFilterModal}
          hideFilterModal={this.hideFilterModal}
          isFilterModalVisible={this.state.isFilterModalVisible}
          setHome={(click: any) => (this.catScrollHome = click)}
          isRTL={isRTL}
          currentCategory={this.state.rest.categoryId}
          applyFilters={this.applyFilters}
          navigation={this.props.navigation}
          rest={this.state.rest}
          category={category}
        />
        {(this.state.itemLocation || this.state.itemLocations) && (
          <MapModal
            isMapModalVisible={this.state.isItemMapModalVisible}
            hideMapModal={this.hideItemMapModal}
            itemLocation={this.state.itemLocation}
            itemLocations={this.state.itemLocations}
            title={this.state.itemTitle}
            width={width}
            height={height}
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
        <Header
          navigation={this.props.navigation}
          title={this.props.navigation.getParam('item').name}
          showFilterModal={this.showFilterModal}
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
        {this.state.loading && <HomeLoading />}

        {!this.state.loading &&
          this.renderCategoryQuery({
            variables: rest,
            lang,
            isRTL,
            words
          })}
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  lang: state.glob.languageName,
  isRTL: state.glob.isRTL,
  categories: state.glob.language.category,
  words: state.glob.language.words,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
  likes: state.glob.likes,
  favs: state.glob.favs,
  favoorites: state.glob.favoorites
});

export default connect(
  mapStateToProps,
  {
    setBuckets,
    delQuery,
    updateUser,
    addFav,
    saveFav,
    addLike,
    addCategoryId
  }
)(
  graphql(favoritePost, {
    name: 'favoritePost',
    options: { refetchQueries: ['getMyFavoritePosts'] }
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
                    })(CategoryScreen)
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

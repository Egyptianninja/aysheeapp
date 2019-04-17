import MasonryList from '@appandflow/masonry-list';
import { Ionicons } from '@expo/vector-icons';
import { debounce } from 'lodash';
import * as React from 'react';
import { graphql, Query } from 'react-apollo';
import { Animated, Dimensions, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { HomeLoading, Noresult } from '../../componenets';
import FilterModal from '../../componenets/category/FilterModal';
import Header from '../../componenets/category/Header';
import SortView from '../../componenets/category/SortView';
import ItemViewSmall from '../../componenets/ItemViewSmall';
import { Edit, Menu, Report } from '../../componenets/Menu';
import createReport from '../../graphql/mutation/createReport';
import deletePost from '../../graphql/mutation/deletePost';
import editClassifieds from '../../graphql/mutation/editClassifieds';
import favoritePost from '../../graphql/mutation/favoritePost';
import getCategoryPosts from '../../graphql/query/getCategoryPosts';
import { delQuery, setBuckets } from '../../store/actions/postActions';
import { updateUser } from '../../store/actions/userAtions';
import * as store from '../../store/getStore';
import {
  getNextPosts,
  getTimeLineBuckets,
  isTablet,
  Message,
  readyPosts,
  rtlos,
  handleOnMenuModal
} from '../../utils';
import MultiLocations from '../../utils/location/MultiLocations';
import MessageAlert from '../../utils/message/MessageAlert';
import updateMyQty from '../../graphql/mutation/updateMyQty';

const AnimatedListView = Animated.createAnimatedComponent(MasonryList);
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
  offsetValue = 0;
  scrollValue = 0;
  NAVBAR_HEIGHT = 96;
  filter = true;
  posts: any;
  userlocation: any;
  timer: any;
  constructor(props: any) {
    super(props);
    this.getNextPosts = debounce(getNextPosts, 100);
    this.state = {
      isFilterModalVisible: false,
      isMenuModalVisible: false,
      isReportModalVisible: false,
      isMessageVisible: false,
      isEditModalVisible: false,
      isCheckMessaheVisible: false,
      isMapModalVisible: false,
      modalPost: null,
      pressed: null,
      refreshing: false,
      notification: null,
      query: null,
      rest: { categoryId: 1 },
      message: null
    };
  }

  componentDidMount() {
    const category = this.props.navigation.getParam('item');
    this.setState({ rest: { categoryId: category.id } });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  showFilterModal = () => {
    this.setState({ isFilterModalVisible: true });
    // const keys = Object.keys(this.state.rest);
    // if (this.filter || keys.length > 1) {
    //   this.setState({ isFilterModalVisible: true });
    // }
  };
  hideFilterModal = () => {
    this.setState({ isFilterModalVisible: false });
  };
  showMenuModal = (post: any) => {
    this.setState({ isMenuModalVisible: true, modalPost: post });
  };
  hideMenuModal = (payload: any) => {
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
    this.setState({ isMessageVisible: false, message: null, screen: null });
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

  showMapModal = async () => {
    this.setState({ isMapModalVisible: true });
  };
  hideMapModal = () => {
    this.setState({ isMapModalVisible: false });
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

  updateItemsQty = (message?: any) => {
    this.timer = setTimeout(async () => {
      const res = await this.props.updateMyQty({});
      if (res.data.updateMyQty.ok) {
        const { data } = res.data.updateMyQty;
        await this.props.updateUser(data);
      }
      this.showMessageModal({ message });
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

  handleTop = () => {
    this.flatListRef.getNode().scrollToOffset({ offset: 0, animated: true });
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
  setUserLocation = (userlocation: any) => {
    this.userlocation = userlocation;
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
    const rtlOS = rtlos();
    const sortData = this.getSortBucket();
    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          title={this.props.navigation.getParam('item').name}
          showFilterModal={this.showFilterModal}
        />

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
        {this.state.rest.sortType === 3 && (
          <MultiLocations
            isMapModalVisible={this.state.isMapModalVisible}
            navigation={this.props.navigation}
            hideMapModal={this.hideMapModal}
            showMapModal={this.showMapModal}
            latitude={this.userlocation.lat}
            longitude={this.userlocation.lon}
            posts={this.posts}
            width={width}
            height={height}
            word={words}
            lang={lang}
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
          onCheckMessageModalHide={this.onCheckMessageModalHide}
          body={words.deleteareyousure}
          icon="ios-information-circle"
          width={width}
          okbtnTitle={words.yes}
          cancelbtnTitle={words.cancel}
          okAction={this.deletePost}
          cancelAction={this.canceldeletePost}
          isRTL={isRTL}
          iconColor="#E85255"
          height={200}
        />
        <Query
          query={getCategoryPosts}
          variables={{ ...rest }}
          onCompleted={data => {
            const buckets = getTimeLineBuckets(rest.categoryId, store, data);
            this.props.setBuckets(buckets);
          }}
        >
          {({ loading, error, data, fetchMore, refetch }) => {
            if (loading) {
              return <HomeLoading categoryId={rest.categoryId} />;
            }
            if (error) {
              this.filter = false;
              return <Noresult title="error" />;
            }

            const postsQuery = data.getCategoryPosts.posts;
            const posts =
              postsQuery.length > 0
                ? readyPosts(postsQuery, isTablet() ? 400 : 200, 79, lang)
                : postsQuery;

            this.posts = posts;
            return (
              <React.Fragment>
                <AnimatedListView
                  data={posts}
                  ref={(ref: any) => {
                    this.flatListRef = ref;
                  }}
                  scrollEventThrottle={16}
                  contentContainerStyle={{
                    // marginTop: 8,
                    paddingBottom: 30
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
                      showMenuModal={this.showMenuModal}
                      selectePost={this.selectePost}
                      word={this.props.words}
                      isRTL={isRTL}
                      lang={lang}
                    />
                  )}
                  getHeightForItem={({ item }: any) => item.height}
                  ListHeaderComponent={() => {
                    if (posts.length === 0) {
                      return <Noresult title={words.noresults} />;
                    } else {
                      return (
                        <View>
                          {this.state.rest.sortType === 3 && (
                            <TouchableOpacity
                              style={{
                                position: 'absolute',
                                top: 5,
                                right: !isRTL || rtlos() === 3 ? 0 : undefined,
                                left: rtlos() === 2 ? 0 : undefined,
                                paddingHorizontal: 10,
                                zIndex: 100,
                                width: 60
                              }}
                              onPress={() => this.showMapModal()}
                            >
                              <Ionicons
                                name="ios-map"
                                size={31}
                                color="#9B9CF1"
                              />
                            </TouchableOpacity>
                          )}
                          <SortView
                            isRTL={isRTL}
                            rtlOS={rtlOS}
                            data={sortData}
                            sort={true}
                            itemKind="sortType"
                            addFilter={this.addFilter}
                            removeFilter={this.removeFilter}
                            // TODO: fix this setstate
                            setUserLocation={this.setUserLocation}
                            rest={rest}
                            words={words}
                          />
                        </View>
                      );
                    }
                  }}
                  numColumns={2}
                  keyExtractor={(item: any) => item.id}
                  onEndReachedThreshold={0.5}
                  removeClippedSubviews={true}
                  disableVirtualization={false}
                />
              </React.Fragment>
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
  sort: state.glob.language.sort,
  words: state.glob.language.words,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { setBuckets, delQuery, updateUser }
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
            options: { refetchQueries: ['getUserPosts'] }
          })(CategoryScreen)
        )
      )
    )
  )
);

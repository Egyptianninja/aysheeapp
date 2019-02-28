import * as React from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { debounce } from 'lodash';
import { Notifications } from 'expo';
import { connect } from 'react-redux';
import { Query, graphql } from 'react-apollo';
import MasonryList from '@appandflow/masonry-list';
import getTimeLine from '../../graphql/query/getTimeLine';
import refreshToken from '../../graphql/mutation/refreshToken';
import favoritePost from '../../graphql/mutation/favoritePost';
import notificationSub from '../../graphql/mutation/notificationSub';
import editClassifieds from '../../graphql/mutation/editClassifieds';
import deletePost from '../../graphql/mutation/deletePost';
import * as store from '../../store/getStore';
import { setBuckets } from '../../store/actions/postActions';
import {
  getNextPosts,
  getNewPosts,
  readyPosts,
  getTimeLineBuckets,
  Message,
  registerForPushNotificationsAsync
} from '../../utils';
import { HomeLoading, CategoriesScroll, Noresult } from '../../componenets';
import ItemViewSmall from '../../componenets/ItemViewSmall';
import { Menu, Report, Edit } from '../../componenets/Menu';

const AnimatedListView = Animated.createAnimatedComponent(MasonryList);
const { width } = Dimensions.get('window');
class HomeScreen extends React.Component<any, any> {
  static navigationOptions = { header: null };
  catScrollHome: any;
  flatListRef: any;
  getNextPosts: any;
  scrollEndTimer: any;
  clampedScrollValue = 0;
  offsetValue = 0;
  scrollValue = 0;
  NAVBAR_HEIGHT = 134;

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
      modalPost: null,
      pressed: null,
      refreshing: false,
      notification: null,
      query: null,
      loading: false,
      rest: {},
      scrollAnim,
      offsetAnim,
      pushToken: null,
      message: null,
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

  async componentDidMount() {
    if (this.props.isAuthenticated) {
      const pushToken = await registerForPushNotificationsAsync();
      await this.setState({ pushToken });
    }
    if (this.state.pushToken) {
      await this.props.notificationSub({
        variables: {
          userId: this.props.user._id,
          pushToken: this.state.pushToken
        }
      });
    }
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
    Notifications.addListener(this.handleNotification);
    this.props.navigation.setParams({ handleHome: this.handleHome });
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
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

  showMenuModal = (post: any) => {
    this.setState({ isMenuModalVisible: true, modalPost: post });
  };
  hideMenuModal = () => {
    this.setState({ isMenuModalVisible: false });
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
  showMessageModal = async ({ seconds, screen, message }: any) => {
    await this.setState({ message });
    this.setState({ isMessageVisible: true });
    if (seconds && !screen) {
      setTimeout(() => {
        this.setState({ isMessageVisible: false });
      }, seconds * 1000);
    }
    if (seconds && screen) {
      setTimeout(() => {
        this.setState({ isMessageVisible: false });
        this.props.navigation.navigate(screen);
      }, seconds * 1000);
    }
  };
  hideMessageModal = () => {
    this.setState({ isMessageVisible: false });
  };
  showCheckMessageModal = async () => {
    this.setState({ isCheckMessaheVisible: true });
  };
  hideCheckMessageModal = () => {
    this.setState({ isCheckMessaheVisible: false });
  };
  deletePost = async () => {
    await this.props.deletePost({
      variables: {
        postId: this.state.modalPost.id
      }
      // refetchQueries: ['getTimeLine'],
      // awaitRefetchQueries: true
    });
    this.hideCheckMessageModal();
    setTimeout(() => {
      this.showMessageModal({
        seconds: 1,
        message: this.props.words.addeleted
      });
    }, 1000);
  };
  canceldeletePost = async () => {
    this.hideCheckMessageModal();
  };

  handleTop = () => {
    this.flatListRef.getNode().scrollToOffset({ offset: 0, animated: true });
  };

  handleHome = () => {
    if (this.state.rest.categoryId || this.state.rest.categoryId === 0) {
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
        // this.state.rest.publish
        //   ? this.setState({ rest: { publish: undefined } })
        //   : this.setState({ rest: { publish: true } });
      }
    }
  };

  handleNotification = (notification: any) => {
    if (notification.origin === 'received') {
      // show internal message with notification data and way to go to post
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
  addFilter = (itemKind: any, value: any) => {
    this.setState({ rest: { ...this.state.rest, [itemKind]: value } });
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
  };
  selectePost = (post: any, word: any, lang: any, isRTL: any) => {
    this.props.navigation.navigate('ItemScreen', { post, word, lang, isRTL });
  };

  handleonPressIn = (id: any) => {
    // TODO:
    // this.setState({ pressed: id });
  };
  handleonPressOut = () => {
    // TODO:
    // this.setState({ pressed: null });
  };

  render() {
    const { clampedScroll, rest } = this.state;
    const { lang, words, query, isRTL } = this.props;
    const postId = this.state.modalPost
      ? this.state.modalPost.id
        ? this.state.modalPost.id
        : this.state.modalPost._id
      : null;
    this.NAVBAR_HEIGHT = 90;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, this.NAVBAR_HEIGHT],
      outputRange: [0, -this.NAVBAR_HEIGHT],
      extrapolate: 'clamp'
    });
    return (
      <View style={{ flex: 1, paddingHorizontal: 5 }}>
        <Menu
          post={this.state.modalPost}
          favoritePost={this.props.favoritePost}
          isMenuModalVisible={this.state.isMenuModalVisible}
          hideMenuModal={this.hideMenuModal}
          showReportModal={this.showReportModal}
          showMessageModal={this.showMessageModal}
          deletePost={this.props.deletePost}
          editClassifieds={this.props.editClassifieds}
          showEditModal={this.showEditModal}
          showCheckMessageModal={this.showCheckMessageModal}
          postId={postId}
          word={words}
          isRTL={isRTL}
          isAuthenticated={this.props.isAuthenticated}
          user={this.props.user}
          // TODO:
          // onModalHide={
          //   this.state.isMessageVisible
          //     ? this.showMessageModal({
          //         seconds: 1,
          //         message: this.state.message
          //       })
          //     : undefined
          // }
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
          hideReportModal={this.hideReportModal}
          word={words}
          isRTL={isRTL}
        />
        <Message
          isVisible={this.state.isMessageVisible}
          title={this.state.message}
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
          isRTL={isRTL}
          iconColor="#E85255"
          height={200}
        />
        <Animated.View
          style={{
            zIndex: 100,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            height: this.NAVBAR_HEIGHT,
            transform: [{ translateY: navbarTranslate }],
            minHeight: 91,
            borderBottomWidth: 1,
            borderBottomColor: '#DEDBDD'
          }}
        >
          <CategoriesScroll
            setHome={(click: any) => (this.catScrollHome = click)}
            isRTL={isRTL}
            currentCategory={this.state.rest.categoryId}
            addFilter={this.addFilter}
            removeFilter={this.removeFilter}
            removeAllFilters={this.removeAllFilters}
            navigation={this.props.navigation}
            rest={this.state.rest}
          />
        </Animated.View>

        <Query
          query={getTimeLine}
          variables={{ ...rest, query }}
          fetchPolicy="network-only"
        >
          {({ loading, error, data, fetchMore, refetch }) => {
            if (loading) {
              return <HomeLoading categoryId={rest.categoryId} />;
            }
            if (error) {
              return <Text>{error}</Text>;
            }
            const postsQuery = data.getTimeLine.posts;
            if (postsQuery && postsQuery.length === 0) {
              return <Noresult isRTL={isRTL} title={words.noresults} />;
            }
            const posts = readyPosts(postsQuery, 200, 79, lang);
            const buckets = getTimeLineBuckets(rest.categoryId, store, data);
            this.props.setBuckets(buckets);

            return (
              <React.Fragment>
                <AnimatedListView
                  data={posts}
                  ref={(ref: any) => {
                    this.flatListRef = ref;
                  }}
                  scrollEventThrottle={16}
                  contentContainerStyle={{
                    marginTop: this.NAVBAR_HEIGHT,
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
                  onMomentumScrollBegin={this._onMomentumScrollBegin}
                  onMomentumScrollEnd={this._onMomentumScrollEnd}
                  onScrollEndDrag={this._onScrollEndDrag}
                  onRefresh={() => refetch()}
                  refreshing={this.state.refreshing}
                  onEndReached={async () => {
                    this.getNextPosts(data, fetchMore, 'getTimeLine');
                  }}
                  renderItem={({ item }: any) => (
                    <ItemViewSmall
                      post={item}
                      handleonPressIn={this.handleonPressIn}
                      handleonPressOut={this.handleonPressOut}
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
  categories: state.glob.language.category,
  words: state.glob.language.words,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
  query: state.post.query
});

export default connect(
  mapStateToProps,
  { setBuckets }
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
          name: 'deletePost',
          options: { refetchQueries: ['getTimeLine', 'getMyPosts'] }
        })(
          graphql(editClassifieds, {
            name: 'editClassifieds',
            options: { refetchQueries: ['getTimeLine', 'getMyPosts'] }
          })(HomeScreen)
        )
      )
    )
  )
);

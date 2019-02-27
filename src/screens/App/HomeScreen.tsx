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
import { Menu, Report } from '../../componenets/Menu';

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
      modalPost: null,
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
    this.setState({ isMenuModalVisible: false, modalPost: null });
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
        this.state.rest.publish
          ? this.setState({ rest: { publish: undefined } })
          : this.setState({ rest: { publish: true } });
      }
    }
  };

  handleNotification = (notification: any) => {
    const postId = notification.data.postId;
    this.props.navigation.navigate('ItemScreen', {
      postId,
      word: this.props.words,
      lang: this.props.lang
    });
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
  selectePost = (post: any, word: any, lang: any) => {
    this.props.navigation.navigate('ItemScreen', { post, word, lang });
  };

  render() {
    const { clampedScroll, rest } = this.state;
    const { lang, words, query } = this.props;
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
          postId={postId}
          word={words}
          lang={lang}
          // TODO:
          onModalHide={
            this.state.isMessageVisible
              ? this.showMessageModal({
                  seconds: 1,
                  message: this.state.message
                })
              : undefined
          }
        />
        <Report
          isReportModalVisible={this.state.isReportModalVisible}
          hideReportModal={this.hideReportModal}
          word={words}
          lang={lang}
        />
        <Message
          isVisible={this.state.isMessageVisible}
          title={this.state.message}
          icon="ios-checkmark-circle"
          lang={lang}
          width={width}
          height={120}
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
            lang={lang}
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
              return <Noresult lang={lang} title={words.noresults} />;
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
                      navigation={this.props.navigation}
                      showMenuModal={this.showMenuModal}
                      selectePost={this.selectePost}
                      word={this.props.words}
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
      name: 'favoritePost'
    })(
      graphql(notificationSub, {
        name: 'notificationSub'
      })(HomeScreen)
    )
  )
);

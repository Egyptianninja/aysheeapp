import * as React from 'react';
import { View, Text, Animated } from 'react-native';
import { debounce } from 'lodash';
import { Notifications } from 'expo';
import { connect } from 'react-redux';
import { Query, graphql } from 'react-apollo';
import MasonryList from '@appandflow/masonry-list';
import getTimeLine from '../../graphql/query/getTimeLine';
import refreshToken from '../../graphql/mutation/refreshToken';
import favoritePost from '../../graphql/mutation/favoritePost';
import * as store from '../../store/getStore';
import { setBuckets } from '../../store/actions/postActions';
import {
  getNextPosts,
  getNewPosts,
  readyPosts,
  getTimeLineBuckets,
  nameToColor
} from '../../utils';
import {
  Loading,
  CategoriesScroll,
  ItemView,
  Noresult
} from '../../componenets';
import { FloatButton } from '../../lib';
const AnimatedListView = Animated.createAnimatedComponent(MasonryList);

class HomeScreen extends React.Component<any, any> {
  static navigationOptions = { header: null };
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
      query: null,
      refreshing: false,
      modalVisible: false,
      itemModalVisable: false,
      notification: null,
      pushToken: null,
      rest: {},
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

  handleHome = () => {
    this.flatListRef.getNode().scrollToOffset({ offset: 0, animated: true });
  };
  handleNotification = (notification: any) => {
    this.setState({ notification });
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
    const catSelected =
      this.state.rest.categoryId || this.state.rest.categoryId === 0;

    this.NAVBAR_HEIGHT = catSelected ? 134 : 84;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, this.NAVBAR_HEIGHT],
      outputRange: [0, -this.NAVBAR_HEIGHT],
      extrapolate: 'clamp'
    });

    const floatBtnTranslate = clampedScroll.interpolate({
      inputRange: [0, this.NAVBAR_HEIGHT],
      outputRange: [0, 84],
      extrapolate: 'clamp'
    });
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 5
        }}
      >
        <Animated.View
          style={{
            zIndex: 100,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: this.NAVBAR_HEIGHT,
            transform: [{ translateY: navbarTranslate }],
            minHeight: 85,
            borderBottomWidth: 1,
            borderBottomColor: '#DEDBDD'
          }}
        >
          <CategoriesScroll
            lang={lang}
            currentCategory={this.state.rest.categoryId}
            addFilter={this.addFilter}
            removeFilter={this.removeFilter}
            removeAllFilters={this.removeAllFilters}
            {...this.state}
          />
        </Animated.View>

        <Query
          query={getTimeLine}
          variables={{ ...rest, query }}
          fetchPolicy="network-only"
        >
          {({ loading, error, data, fetchMore, refetch }) => {
            if (loading) {
              return <Loading />;
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
                  onEndReached={() =>
                    this.getNextPosts(data, fetchMore, 'getTimeLine')
                  }
                  renderItem={({ item }: any) => (
                    <ItemView
                      post={item}
                      navigation={this.props.navigation}
                      selectePost={this.selectePost}
                      favoritePost={this.props.favoritePost}
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
        <Animated.View
          style={{ transform: [{ translateY: floatBtnTranslate }] }}
        >
          <FloatButton opacity={0.6} action={this.handleHome} />
        </Animated.View>
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
    })(HomeScreen)
  )
);

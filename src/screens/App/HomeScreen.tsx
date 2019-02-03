import * as React from 'react';
import { View, Animated, RefreshControl } from 'react-native';
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
  readyPosts,
  getBuckets,
  getCategoryBuckets
} from '../../utils';
import {
  Loading,
  CategoriesScroll,
  ItemView,
  Noresult
} from '../../componenets';
import { FloatButton } from '../../lib';

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
  handleHome = () => {
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
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
    const query = this.props.navigation.getParam('query');
    const { clampedScroll, rest } = this.state;
    const { lang, words } = this.props;

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
          backgroundColor: '#fff',
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
            transform: [{ translateY: navbarTranslate }]
          }}
        >
          <CategoriesScroll
            lang={lang}
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
              return `Error!: ${error}`;
            }

            const posts = data.getTimeLine.posts;
            if (posts && posts.length === 0) {
              return <Noresult lang={lang} title={words.noresults} />;
            }

            const rPosts = readyPosts(posts, 200, 79, lang);

            if (rest.categoryId || rest.categoryId === 0) {
              const buckets = getBuckets(store, data, 'getTimeLine').filter(
                (x: any) => x
              );
              this.props.setBuckets(buckets);
            } else {
              const buckets = getCategoryBuckets(
                store,
                data,
                'getTimeLine'
              ).filter((x: any) => x);
              this.props.setBuckets(buckets);
            }

            return (
              <MasonryList
                data={rPosts}
                ref={(ref: any) => {
                  this.flatListRef = ref;
                }}
                contentContainerStyle={{
                  marginTop: this.NAVBAR_HEIGHT,
                  paddingBottom: 160
                }}
                scrollEventThrottle={16}
                onScroll={Animated.event([
                  {
                    nativeEvent: {
                      contentOffset: { y: this.state.scrollAnim }
                    }
                  }
                ])}
                refreshControl={
                  <RefreshControl
                    onRefresh={() => refetch()}
                    refreshing={this.state.refreshing}
                    tintColor="#6FA7D5"
                  />
                }
                // onRefresh={() => getNewPosts(data, fetchMore, "getTimeLine")}
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
                removeClippedSubviews={true}
                onEndReachedThreshold={0.5}
                disableVirtualization={false}
                windowSize={21}
              />
            );
          }}
        </Query>
        <Animated.View
          style={{ transform: [{ translateY: floatBtnTranslate }] }}
        >
          <FloatButton opacity={0.8} action={this.handleHome} />
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
  user: state.user.user
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

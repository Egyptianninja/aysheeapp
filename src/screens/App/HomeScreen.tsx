import * as React from "react";
import {
  View,
  Modal,
  Image,
  Animated,
  Text,
  RefreshControl
} from "react-native";

import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import { Query, graphql } from "react-apollo";
import MasonryList from "@appandflow/masonry-list";
import { debounce } from "lodash";
import getTimeLine from "../../graphql/query/getTimeLine";
import refreshToken from "../../graphql/mutation/refreshToken";
import favoritePost from "../../graphql/mutation/favoritePost";
import * as store from "../../store/getStore";
import { appLoaded } from "../../store/actions/viewActions";
import { setBuckets } from "../../store/actions/postActions";
import { getNextPosts, readyPosts } from "../../utils";
import { getBuckets, getCategoryBuckets } from "../../utils/apollo/aggs";

import {
  CategoriesScroll,
  Loading,
  ItemView
} from "../../componenets/HomeScreen";

import FloatButton from "../../lib/elements/FloatButton";

const AnimatedListView = Animated.createAnimatedComponent(MasonryList);

import { Notifications } from "expo";

class HomeScreen extends React.Component<any, any> {
  static navigationOptions = { header: null };
  startAnim: any;
  animatedValue: any;
  flatListRef: any;
  getNextPosts: any;
  buckets: any;

  scrollEndTimer: any;

  clampedScrollValue = 0;
  offsetValue = 0;
  scrollValue = 0;
  // NAVBAR_HEIGHT = 84;
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
            extrapolateLeft: "clamp"
          }),
          offsetAnim
        ),
        0,
        this.NAVBAR_HEIGHT
      )
    };
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    Notifications.addListener(this.handleNotification);
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

    this.startAnim = setTimeout(() => {
      this.startAnimation();
    }, 1000);
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
    clearTimeout(this.startAnim);
  }

  handleHome = () => {
    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
  };

  handleNotification = (notification: any) => {
    this.setState({ notification });
  };

  startAnimation = () => {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 800
    }).start(() => this.setState({ modalVisible: false }));
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
    this.props.navigation.navigate("ItemScreen", { post, word, lang });
  };

  render() {
    // console.disableYellowBox = true;
    const { clampedScroll } = this.state;
    const catSelected =
      this.state.rest.categoryId || this.state.rest.categoryId === 0;
    this.NAVBAR_HEIGHT = catSelected ? 134 : 84;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, this.NAVBAR_HEIGHT],
      outputRange: [0, -this.NAVBAR_HEIGHT],
      extrapolate: "clamp"
    });
    const floatBtnTranslate = clampedScroll.interpolate({
      inputRange: [0, this.NAVBAR_HEIGHT],
      outputRange: [0, 84],
      extrapolate: "clamp"
    });

    const { rest } = this.state;
    const { theme, lang, words } = this.props;
    const itemColors = theme.color.item;
    const animatedStyle = {
      opacity: this.animatedValue
    };

    if (this.state.modalVisible === true) {
      setTimeout(() => {
        return <View style={{ flex: 1, backgroundColor: "#171717" }} />;
      }, 800);
    }

    const query = this.props.navigation.getParam("query");

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          paddingHorizontal: 5
        }}
      >
        <Animated.View
          style={{
            zIndex: 100,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: this.NAVBAR_HEIGHT,
            transform: [{ translateY: navbarTranslate }]
          }}
        >
          <CategoriesScroll
            lang={lang}
            theme={theme}
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
              return (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    marginTop: 84,
                    paddingTop: 10,
                    paddingHorizontal: 10,
                    zIndex: 500
                  }}
                >
                  <Text style={{ textAlign: lang === "ar" ? "right" : "left" }}>
                    {words.noresults}
                  </Text>
                </View>
              );
            }

            const rPosts = readyPosts(posts, 200, 79, lang);

            if (rest.categoryId || rest.categoryId === 0) {
              this.buckets = getBuckets(store, data, "getTimeLine").filter(
                (x: any) => x
              );

              this.props.setBuckets(this.buckets);
            } else {
              this.buckets = getCategoryBuckets(
                store,
                data,
                "getTimeLine"
              ).filter((x: any) => x);
              this.props.setBuckets(this.buckets);
            }

            return (
              // <AnimatedListView
              <MasonryList
                data={rPosts}
                ref={(ref: any) => {
                  this.flatListRef = ref;
                }}
                // style={{ marginTop: this.NAVBAR_HEIGHT }}
                contentContainerStyle={{
                  marginTop: this.NAVBAR_HEIGHT,
                  paddingBottom: 160
                }}
                // bounces={false}
                scrollEventThrottle={16}
                // onMomentumScrollBegin={this.momentumScrollBegin}
                // onMomentumScrollEnd={this.momentumScrollEnd}
                // onScrollEndDrag={this.scrollEndDrag}
                onScroll={Animated.event(
                  [
                    {
                      nativeEvent: {
                        contentOffset: { y: this.state.scrollAnim }
                      }
                    }
                  ]
                  // { useNativeDriver: true }
                )}
                refreshControl={
                  <RefreshControl
                    onRefresh={() => refetch()}
                    refreshing={this.state.refreshing}
                    tintColor="#6FA7D5"
                    // refreshing={this.props.refreshing}
                    // onRefresh={this._onRefresh.bind(this)}
                  />
                }
                // onRefresh={() => getNewPosts(data, fetchMore, "getTimeLine")}
                onEndReached={() =>
                  this.getNextPosts(data, fetchMore, "getTimeLine")
                }
                renderItem={({ item }: any) => (
                  <ItemView
                    color={itemColors}
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
        <Modal
          onRequestClose={() => null}
          transparent={true}
          visible={this.state.modalVisible}
        >
          <Animated.View
            style={[
              {
                flex: 1,
                backgroundColor: "#171717",
                alignItems: "center",
                justifyContent: "center"
              },
              animatedStyle
            ]}
          >
            <Animatable.View
              animation="zoomIn"
              duration={800}
              iterationCount={1}
              useNativeDriver={true}
              style={{
                width: 175,
                height: 175
              }}
            >
              <Image
                style={{ width: "100%", height: "100%" }}
                source={require("../../../assets/logo.png")}
              />
            </Animatable.View>
          </Animated.View>
        </Modal>
      </View>
    );
  }
}
const mapStateToProps = (state: any) => ({
  lang: state.glob.languageName,
  categories: state.glob.language.category,
  words: state.glob.language.words,
  theme: state.glob.theme,
  isAuthenticated: state.user.isAuthenticated,
  ready: state.view.appLoaded,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { appLoaded, setBuckets }
)(
  graphql(refreshToken, {
    name: "refreshToken"
  })(
    graphql(favoritePost, {
      name: "favoritePost"
    })(HomeScreen)
  )
);

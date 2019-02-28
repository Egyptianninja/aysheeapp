import * as React from 'react';
import {
  View,
  Dimensions,
  Animated,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Query, graphql } from 'react-apollo';
import MasonryList from '@appandflow/masonry-list';
import { debounce } from 'lodash';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import getUserPosts from '../../../graphql/query/getUserPosts';
import { getNextPosts, readyUserPosts, Message } from '../../../utils';
import ItemViewSmall from '../../../componenets/ItemViewSmall';
import { Avatar, Loading } from '../../../componenets';
import favoritePost from '../../../graphql/mutation/favoritePost';
import { Menu, Report } from '../../../componenets/Menu';
const { width } = Dimensions.get('window');

const HEADER_MAX_HEIGHT = 175;
const HEADER_MIN_HEIGHT = 90;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

class UserProfileScreen extends React.Component<any, any> {
  static navigationOptions = { header: null };
  flatListRef: any;
  getNextPosts: any;
  constructor(p: any) {
    super(p);
    this.getNextPosts = debounce(getNextPosts, 100);
    this.state = {
      scrollY: new Animated.Value(0),
      refreshing: false,
      isMenuModalVisible: false,
      isReportModalVisible: false,
      isMessageVisible: false,
      modalPost: null
    };
  }

  selectePost = (post: any, word: any, lang: any, isRTL: any) => {
    this.props.navigation.navigate('ItemScreenUser', {
      post,
      word,
      lang,
      isRTL
    });
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
  showMessageModal = ({ seconds, screen }: any) => {
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

  render() {
    const { lang, words, isRTL } = this.props;
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });
    const profileImageHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
      extrapolate: 'clamp'
    });

    const imageMarginTop = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2, 40],
      extrapolate: 'clamp'
    });
    const imageMarginLeft = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [10, 60],
      extrapolate: 'clamp'
    });
    const nameMarginTop = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [-75, 40],
      extrapolate: 'clamp'
    });
    const user = this.props.navigation.getParam('user');
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Menu
          post={this.state.modalPost}
          favoritePost={this.props.favoritePost}
          isMenuModalVisible={this.state.isMenuModalVisible}
          hideMenuModal={this.hideMenuModal}
          showReportModal={this.showReportModal}
          showMessageModal={this.showMessageModal}
          word={words}
          isRTL={isRTL}
        />
        <Report
          isReportModalVisible={this.state.isReportModalVisible}
          hideReportModal={this.hideReportModal}
          word={words}
          isRTL={isRTL}
        />
        <Message
          isVisible={this.state.isMessageVisible}
          title={words.successadded}
          icon="ios-checkmark-circle"
          isRTL={isRTL}
          width={width}
          height={120}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{
            position: 'absolute',
            top: Constants.statusBarHeight + 10,
            left: 10,
            zIndex: 860,
            width: 32,
            height: 32,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <Ionicons name="ios-arrow-back" size={30} color="#9C949A" />
        </TouchableOpacity>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#A7A9F3',
            height: headerHeight,
            zIndex: 200,
            flexDirection: 'row'
          }}
        >
          <Animated.View
            style={{
              height: profileImageHeight,
              width: profileImageHeight,
              borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
              overflow: 'hidden',
              marginTop: imageMarginTop,
              marginLeft: imageMarginLeft
            }}
          >
            {!user.avatar && (
              <Avatar
                name={user.name ? user.name : user.uniquename}
                size={profileImageHeight}
              />
            )}
            {user.avatar && (
              <Image
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%'
                }}
                source={{
                  uri: `http://res.cloudinary.com/arflon/image/upload/w_${100}/${
                    user.avatar
                  }`
                }}
              />
            )}
          </Animated.View>
          <Animated.View
            style={{
              marginTop: imageMarginTop,
              marginLeft: 20,
              zIndex: 210
            }}
          >
            {!user.name && (
              <Text
                style={{
                  fontFamily: 'cairo-regular',
                  fontSize: 22,
                  color: '#fff'
                }}
              >
                {user.uniquename}
              </Text>
            )}
            {user.name && (
              <Text
                style={{
                  fontFamily: 'cairo-regular',
                  fontSize: 22,
                  color: '#fff'
                }}
              >
                {user.name}
              </Text>
            )}
          </Animated.View>
        </Animated.View>
        <Query
          query={getUserPosts}
          variables={{ userId: user._id }}
          // fetchPolicy="network-only"
        >
          {({ loading, error, data, fetchMore, refetch }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              console.log(`Error!: ${error}`);
            }
            const { posts } = data.getUserPosts;
            const rPosts = readyUserPosts(posts, 200, 79, lang);
            return (
              <MasonryList
                ref={(ref: any) => {
                  this.flatListRef = ref;
                }}
                onScroll={Animated.event([
                  { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
                ])}
                scrollEventThrottle={16}
                onRefresh={() => refetch()}
                onEndReached={() =>
                  this.getNextPosts(data, fetchMore, 'getUserPosts')
                }
                contentContainerStyle={{
                  marginTop: HEADER_MAX_HEIGHT,
                  paddingBottom: 160
                }}
                refreshing={this.state.refreshing}
                data={rPosts}
                renderItem={({ item }: any) => (
                  <ItemViewSmall
                    post={item}
                    navigation={this.props.navigation}
                    selectePost={this.selectePost}
                    favoritePost={this.props.favoritePost}
                    showMenuModal={this.showMenuModal}
                    word={words}
                    lang={lang}
                    isRTL={isRTL}
                  />
                )}
                getHeightForItem={({ item }: any) => item.height}
                numColumns={2}
                keyExtractor={(item: any) => item.id}
                removeClippedSubviews={true}
                windowSize={21}
                disableVirtualization={false}
                onEndReachedThreshold={0.5}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}
const mapStateToProps = (state: any) => ({
  categories: state.glob.language.category,
  isAuthenticated: state.user.isAuthenticated,
  isRTL: state.glob.isRTL,
  lang: state.glob.languageName,
  words: state.glob.language.words
});

export default connect(mapStateToProps)(
  graphql(favoritePost, {
    name: 'favoritePost',
    options: { refetchQueries: ['getMyFavoritePosts'] }
  })(UserProfileScreen)
);

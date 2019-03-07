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
import getUserPosts from '../../../graphql/query/getUserPosts';
import { getNextPosts, readyUserPosts, Message } from '../../../utils';
import ItemViewSmall from '../../../componenets/ItemViewSmall';
import { Avatar, Loading } from '../../../componenets';
import favoritePost from '../../../graphql/mutation/favoritePost';
import { Ionicons } from '@expo/vector-icons';
import { Menu, Report } from '../../../componenets/Menu';
const { width } = Dimensions.get('window');

const HEADER_HEIGHT = 175;
const PROFILE_IMAGE_HEIGHT = 80;

class UserProfileScreen extends React.Component<any, any> {
  // static navigationOptions = { header: null };
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
      modalPost: null,
      rest: {}
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
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [HEADER_HEIGHT, 0],
      extrapolate: 'clamp'
    });
    const topPaddingIcons = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [HEADER_HEIGHT - 50, -50],
      extrapolate: 'clamp'
    });

    const imageMarginTop = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [
        HEADER_HEIGHT / 2 - PROFILE_IMAGE_HEIGHT,
        -PROFILE_IMAGE_HEIGHT
      ],
      extrapolate: 'clamp'
    });

    const user = this.props.navigation.getParam('user');
    const isofferstab = this.state.rest.isoffer;
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

        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            height: headerHeight,
            zIndex: 200,
            flexDirection: 'row'
          }}
        >
          <Animated.View
            style={{
              height: 80,
              width: 80,
              borderColor: '#7678ED',
              borderWidth: 2,
              borderRadius: 40,
              overflow: 'hidden',
              backgroundColor: '#fff',
              marginTop: imageMarginTop,
              marginLeft: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {!user.avatar && (
              <Avatar
                name={user.name ? user.name : user.uniquename}
                size={72}
              />
            )}
            {user.avatar && (
              <Image
                style={{
                  flex: 1,
                  width: 72,
                  height: 72
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
              marginLeft: 10,
              zIndex: 10
            }}
          >
            {!user.name && (
              <Text
                style={{
                  fontFamily: 'cairo-regular',
                  fontSize: 16
                }}
              >
                {user.uniquename}
              </Text>
            )}
            {user.name && (
              <Text
                style={{
                  fontFamily: 'cairo-regular',
                  fontSize: 18
                }}
              >
                {user.name}
              </Text>
            )}
            <Text
              style={{
                fontFamily: 'cairo-regular',
                fontSize: 14,
                color: '#777'
              }}
            >
              {user.about}
            </Text>
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              width,
              top: topPaddingIcons,
              height: 50,
              zIndex: 1000,
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingHorizontal: 10
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#eee',
                marginHorizontal: 10,
                borderRadius: 5
              }}
            >
              <Ionicons name="ios-call" size={33} color="#7678ED" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#eee',
                marginHorizontal: 10,
                borderRadius: 5
              }}
            >
              <Ionicons name="ios-mail" size={33} color="#7678ED" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#eee',
                marginHorizontal: 10,
                borderRadius: 5
              }}
            >
              <Ionicons name="ios-globe" size={33} color="#7678ED" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#eee',
                marginHorizontal: 10,
                borderRadius: 5
              }}
            >
              <Ionicons name="ios-map" size={33} color="#7678ED" />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{
              position: 'absolute',
              width,
              top: headerHeight,
              left: 0,
              height: 50,
              zIndex: 300,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              backgroundColor: '#fff'
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: !isofferstab ? '#7678ED' : '#eee',
                marginHorizontal: 2,
                marginLeft: 9
              }}
              onPress={() => {
                this.setState({ rest: {} });
              }}
            >
              <Text
                style={{
                  fontFamily: 'cairo-regular',
                  color: !isofferstab ? '#eee' : '#7678ED',
                  fontSize: 18
                }}
              >
                الاعلانات ({user.onlineqty})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isofferstab ? '#7678ED' : '#eee',
                marginHorizontal: 2,
                marginRight: 9
              }}
              onPress={() => {
                this.setState({ rest: { ...this.state.rest, isoffer: true } });
              }}
            >
              <Text
                style={{
                  fontFamily: 'cairo-regular',
                  color: isofferstab ? '#eee' : '#7678ED',
                  fontSize: 18
                }}
              >
                العروض ({user.offersqty})
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        <Query
          query={getUserPosts}
          variables={{ userId: user._id, ...this.state.rest }}
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
                  marginTop: HEADER_HEIGHT + 40,
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

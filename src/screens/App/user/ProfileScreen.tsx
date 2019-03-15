import MasonryList from '@appandflow/masonry-list';
import { Ionicons } from '@expo/vector-icons';
import { debounce } from 'lodash';
import * as React from 'react';
import { graphql, Query } from 'react-apollo';
import {
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import { AvatarCircle, Loading, Noresult } from '../../../componenets';
import ItemViewSmall from '../../../componenets/ItemViewSmall';
import { Edit, Menu, Report } from '../../../componenets/Menu';
import deletePost from '../../../graphql/mutation/deletePost';
import editClassifieds from '../../../graphql/mutation/editClassifieds';
import favoritePost from '../../../graphql/mutation/favoritePost';
import getUserPosts from '../../../graphql/query/getUserPosts';
import { updateQty } from '../../../store/actions/userAtions';
import { getNextPosts, Message, readyUserPosts, call } from '../../../utils';
import MapModal from '../../../componenets/ProfileScreen/MapModal';
const { width, height } = Dimensions.get('window');

const HEADER_HEIGHT = 175;
const PROFILE_IMAGE_HEIGHT = 80;

class ProfileScreen extends React.Component<any, any> {
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
      isEditModalVisible: false,
      isCheckMessaheVisible: false,
      isMessageVisible: false,
      isMapModalVisible: false,
      modalPost: null,
      rest: { islive: true },
      tab: 1
    };
  }

  selectePost = (post: any, word: any, lang: any, isRTL: any) => {
    this.props.navigation.push('ItemScreen', {
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
    this.setState({ isMenuModalVisible: false });
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
  showEditModal = () => {
    this.setState({ isEditModalVisible: true });
  };
  hideEditModal = () => {
    this.setState({ isEditModalVisible: false });
  };
  showCheckMessageModal = async () => {
    this.setState({ isCheckMessaheVisible: true });
  };
  hideCheckMessageModal = () => {
    this.setState({ isCheckMessaheVisible: false });
  };
  showMapModal = async () => {
    this.setState({ isMapModalVisible: true });
  };
  hideMapModal = () => {
    this.setState({ isMapModalVisible: false });
  };

  deletePost = async () => {
    await this.props.deletePost({
      variables: {
        postId: this.state.modalPost.id
      }
    });
    if (this.state.modalPost.isoffer) {
      await this.props.updateQty('offers', -1);
    } else {
      await this.props.updateQty('online', -1);
    }
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

  render() {
    const { lang, words, isRTL } = this.props;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [HEADER_HEIGHT, -1],
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
        -HEADER_HEIGHT / 2 - PROFILE_IMAGE_HEIGHT
      ],
      extrapolate: 'clamp'
    });

    const paramUser = this.props.navigation.getParam('user');
    const ismyaccount = this.props.isAuthenticated
      ? paramUser._id === this.props.user._id
      : null;
    const user = ismyaccount ? this.props.user : paramUser;
    const { tab } = this.state;
    const maincolor = user.color ? user.color : '#7678ED';
    const isshop = user.isstore;
    const postId = this.state.modalPost
      ? this.state.modalPost.id
        ? this.state.modalPost.id
        : this.state.modalPost._id
      : null;
    const callargs = { number: user.phone, prompt: false };
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
        {user.location && user.location.lat && user.location.lon && (
          <MapModal
            isMapModalVisible={this.state.isMapModalVisible}
            hideMapModal={this.hideMapModal}
            lat={user.location.lat}
            lon={user.location.lon}
            title={user.name}
            width={width}
            height={height}
          />
        )}

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
              marginTop: imageMarginTop,
              marginLeft: 20
            }}
          >
            <AvatarCircle user={user} size={PROFILE_IMAGE_HEIGHT} />
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
            {ismyaccount && (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('EditProfileScreen');
                }}
                style={{
                  marginTop: 5,
                  borderColor: '#ddd',
                  borderWidth: 1,
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around'
                }}
              >
                <Text
                  style={{
                    fontFamily: 'cairo-regular',
                    fontSize: 12,
                    paddingHorizontal: 10
                  }}
                >
                  تعديل الملف الشخصي
                </Text>
                <Ionicons
                  style={{ paddingRight: 10 }}
                  name="md-person"
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
            )}
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              width,
              top: topPaddingIcons,
              height: 40,
              zIndex: 100,
              backgroundColor: '#fff',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingHorizontal: 10
            }}
          >
            <TouchableOpacity
              onPress={() => call(callargs)}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                borderRadius: 5
              }}
            >
              <Ionicons name="ios-call" size={31} color={maincolor} />
            </TouchableOpacity>
            <View
              style={{
                height: 30,
                borderLeftColor: '#ddd',
                borderLeftWidth: 1
              }}
            />
            <TouchableOpacity
              onPress={() =>
                user.email ? Linking.openURL(`mailto: ${user.email}`) : null
              }
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                borderRadius: 5
              }}
            >
              <Ionicons name="ios-mail" size={31} color={maincolor} />
            </TouchableOpacity>
            <View
              style={{
                height: 30,
                borderLeftColor: '#ddd',
                borderLeftWidth: 1
              }}
            />
            <TouchableOpacity
              onPress={() =>
                user.website ? Linking.openURL(`http://${user.website}`) : null
              }
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                borderRadius: 5
              }}
            >
              <Ionicons name="ios-globe" size={31} color={maincolor} />
            </TouchableOpacity>
            <View
              style={{
                height: 30,
                borderLeftColor: '#ddd',
                borderLeftWidth: 1
              }}
            />
            <TouchableOpacity
              onPress={() => this.showMapModal()}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 10,
                borderRadius: 5
              }}
            >
              <Ionicons name="ios-map" size={31} color={maincolor} />
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
              backgroundColor: '#fff',
              borderColor: '#ddd',
              borderWidth: 1
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 2,
                backgroundColor: tab === 1 ? '#eee' : '#fff'
                // marginLeft: 9
              }}
              onPress={() => {
                this.setState({ rest: { islive: true }, tab: 1 });
              }}
            >
              <Text
                style={{
                  fontFamily: 'cairo-regular',
                  color: tab === 1 ? maincolor : '#000',
                  fontSize: 16
                }}
              >
                الاعلانات ({user.onlineqty})
              </Text>
            </TouchableOpacity>

            {isshop && (
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 2,
                  // marginRight: 9,
                  backgroundColor: tab === 2 ? '#eee' : '#fff'
                }}
                onPress={() => {
                  this.setState({
                    rest: { islive: true, isoffer: true },
                    tab: 2
                  });
                }}
              >
                <Text
                  style={{
                    fontFamily: 'cairo-regular',
                    color: tab === 2 ? maincolor : '#000',
                    fontSize: 16
                  }}
                >
                  العروض ({user.offersqty})
                </Text>
              </TouchableOpacity>
            )}
            {ismyaccount && (
              <TouchableOpacity
                style={{
                  flex: 1,
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 2,
                  // marginRight: 9,
                  backgroundColor: tab === 3 ? '#eee' : '#fff'
                }}
                onPress={() => {
                  this.setState({
                    rest: { islive: false },
                    tab: 3
                  });
                }}
              >
                <Text
                  style={{
                    fontFamily: 'cairo-regular',
                    color: tab === 3 ? maincolor : '#000',
                    fontSize: 16
                  }}
                >
                  غير منشور ({user.offlineqty})
                </Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        </Animated.View>

        <Query
          query={getUserPosts}
          variables={{ userId: user._id, ...this.state.rest }}
        >
          {({ loading, error, data, fetchMore, refetch }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              return <Noresult title="network error" />;
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
                  marginTop: HEADER_HEIGHT + 50,
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
  user: state.user.user,
  isRTL: state.glob.isRTL,
  lang: state.glob.languageName,
  words: state.glob.language.words
});

export default connect(
  mapStateToProps,
  { updateQty }
)(
  graphql(favoritePost, {
    name: 'favoritePost',
    options: { refetchQueries: ['getMyFavoritePosts'] }
  })(
    graphql(deletePost, {
      name: 'deletePost',
      options: { refetchQueries: ['getTimeLine', 'getMyPosts'] }
    })(
      graphql(editClassifieds, {
        name: 'editClassifieds',
        options: { refetchQueries: ['getTimeLine', 'getMyPosts'] }
      })(ProfileScreen)
    )
  )
);

import MasonryList from '@appandflow/masonry-list';
import { Ionicons } from '@expo/vector-icons';
import { debounce } from 'lodash';
import * as React from 'react';
import { graphql, Query } from 'react-apollo';
import {
  Animated,
  Dimensions,
  Linking,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { AvatarCircle, Loading, Noresult } from '../../../componenets';
import ItemViewSmall from '../../../componenets/ItemViewSmall';
import { Edit, Menu, Report } from '../../../componenets/Menu';
import MapModal from '../../../componenets/ProfileScreen/MapModal';
import deletePost from '../../../graphql/mutation/deletePost';
import editClassifieds from '../../../graphql/mutation/editClassifieds';
import favoritePost from '../../../graphql/mutation/favoritePost';
import getUserPosts from '../../../graphql/query/getUserPosts';
import {
  call,
  getNextPosts,
  isTablet,
  Message,
  readyPosts,
  rtlos,
  handleOnMenuModal
} from '../../../utils';
import MessageAlert from '../../../utils/message/MessageAlert';
import updateMyQty from '../../../graphql/mutation/updateMyQty';
import { updateUser } from '../../../store/actions/userAtions';
import { code } from '../../../store/getStore';
import getUser from '../../../graphql/query/getUser';
const { width, height } = Dimensions.get('window');

const HEADER_HEIGHT = 240;
const PROFILE_IMAGE_HEIGHT = 80;

class ProfileScreen extends React.Component<any, any> {
  flatListRef: any;
  getNextPosts: any;
  timer: any;

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

  componentWillUnmount() {
    clearTimeout(this.timer);
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
  onCheckMessageModalHide = () => {
    this.showMessageModal({ message: this.props.words.addeleted });
  };
  showMapModal = () => {
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
    this.showMessageModal({ message });
    this.timer = setTimeout(async () => {
      const res = await this.props.updateMyQty({});
      if (res.data.updateMyQty.ok) {
        const { data } = res.data.updateMyQty;
        await this.props.updateUser(data);
      }
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

  renderQuery = ({ variables, isRTL, words, lang }: any) => {
    return (
      <Query
        query={getUserPosts}
        variables={variables}
        fetchPolicy="network-only"
      >
        {({ loading, error, data, fetchMore, refetch }: any) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <Noresult title="error" top={HEADER_HEIGHT + 20} />;
          }

          const postsQuery =
            data.getUserPosts && data.getUserPosts.posts
              ? data.getUserPosts.posts
              : [];

          const rPosts =
            postsQuery.length > 0
              ? readyPosts(postsQuery, isTablet() ? 400 : 200, 79, lang)
              : postsQuery;
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
                marginTop: HEADER_HEIGHT,
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
              ListHeaderComponent={() => {
                if (!data.getUserPosts || !data.getUserPosts.posts) {
                  setTimeout(() => {
                    refetch();
                  }, 1000);
                  return (
                    <View
                      style={{
                        flex: 1,
                        height: height - 100,
                        width,
                        bottom: 0
                      }}
                    >
                      <Loading />
                    </View>
                  );
                } else if (rPosts.length === 0) {
                  return <Noresult top={20} title={words.noresults} />;
                } else {
                  return <View />;
                }
              }}
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
    );
  };

  renderHeader = ({ user, callargs, maincolor }: any) => {
    return (
      <View style={{ height: HEADER_HEIGHT - 50 }}>
        <View
          style={{
            padding: 10,
            flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
            height: HEADER_HEIGHT - 100
          }}
        >
          <AvatarCircle user={user} size={PROFILE_IMAGE_HEIGHT} />
          <View
            style={{
              marginHorizontal: 10,
              zIndex: 10,
              alignItems: rtlos() === 3 ? 'flex-end' : 'flex-start'
            }}
          >
            {!user.name && (
              <Text
                style={{
                  fontSize: 16
                }}
              >
                {user.uniquename}
              </Text>
            )}
            {user.name && (
              <Text
                style={{
                  fontSize: 18
                }}
              >
                {user.name}
              </Text>
            )}
            <Text
              style={{
                fontSize: 14,
                color: '#777'
              }}
            >
              {user.about ? user.about.substring(0, 50) : ''}
            </Text>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              {user.showcontact !== false && (
                <View>
                  {user.phone && (
                    <Text
                      style={{
                        fontSize: 14
                      }}
                    >
                      + {user.phone}
                    </Text>
                  )}
                  {user.email && (
                    <Text
                      style={{
                        fontSize: 14
                      }}
                    >
                      {user.email}
                    </Text>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            // position: 'absolute',
            width,
            // top: topPaddingIcons,
            height: 50,
            zIndex: 100,
            // backgroundColor: 'red',
            flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 10
          }}
        >
          <TouchableOpacity
            onPress={() => {
              call(callargs);
            }}
            disabled={!user.phone && !user.mob}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              paddingVertical: 5
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
            disabled={!user.email}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,

              paddingVertical: 5
            }}
          >
            <Ionicons
              name="ios-mail"
              size={31}
              color={!user.email ? '#aaa' : maincolor}
            />
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
            disabled={!user.website}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,

              paddingVertical: 5
            }}
          >
            <Ionicons
              name="ios-globe"
              size={31}
              color={!user.website ? '#aaa' : maincolor}
            />
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
            disabled={!user.branches || user.branches.length === 0}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,

              paddingVertical: 5
            }}
          >
            <Ionicons
              name="ios-map"
              size={31}
              color={
                !user.branches || user.branches.length === 0
                  ? '#aaa'
                  : maincolor
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderTabs = ({ tab, maincolor, words, user, isshop }: any) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: width,
          height: 40,
          flexDirection: rtlos() === 2 ? 'row-reverse' : 'row',
          paddingHorizontal: 5,
          paddingTop: 5
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 5,
            backgroundColor: tab === 1 ? '#ddd' : '#fff',
            borderRadius: 10,
            borderColor: '#ddd',
            borderWidth: 1,
            paddingHorizontal: 5
          }}
          onPress={() => {
            this.setState({ rest: { islive: true }, tab: 1 });
          }}
        >
          <View
            style={{ flexDirection: rtlos() === 2 ? 'row-reverse' : 'row' }}
          >
            <Text
              style={{
                color: tab === 1 ? maincolor : '#000',
                fontSize: 16
              }}
            >
              {words.ads}
            </Text>
            <Text
              style={{
                color: '#00B77C',
                fontSize: 12,
                padding: 5,
                bottom: 10
              }}
            >
              {user.onlineqty}
            </Text>
          </View>
        </TouchableOpacity>

        {isshop && (
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 5,
              backgroundColor: tab === 2 ? '#eee' : '#fff',
              paddingHorizontal: 5,
              borderRadius: 10,
              borderColor: '#ddd',
              borderWidth: 1
            }}
            onPress={() => {
              this.setState({
                rest: { islive: true, isoffer: true },
                tab: 2
              });
            }}
          >
            <View
              style={{ flexDirection: rtlos() === 2 ? 'row-reverse' : 'row' }}
            >
              <Text
                style={{
                  color: tab === 2 ? maincolor : '#000',
                  fontSize: 16
                }}
              >
                {words.offers}
              </Text>
              <Text
                style={{
                  color: '#00B77C',
                  fontSize: 12,
                  padding: 5,
                  bottom: 10
                }}
              >
                {user.offersqty}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  render() {
    const { lang, words, isRTL } = this.props;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp'
    });

    const paramUser = this.props.navigation.getParam('user');
    const paramUserId = this.props.navigation.getParam('userId');

    const ismyaccount = this.props.isAuthenticated
      ? paramUserId
        ? paramUserId === this.props.user._id
        : paramUser._id === this.props.user._id
      : null;
    const user = ismyaccount ? this.props.user : paramUser;
    const { tab } = this.state;
    const maincolor = '#272727';

    const postId = this.state.modalPost
      ? this.state.modalPost.id
        ? this.state.modalPost.id
        : this.state.modalPost._id
      : null;

    if (paramUserId) {
      return (
        <Query query={getUser} variables={{ userId: paramUserId }}>
          {({ loading, error, data }: any) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              return <Text>{error}</Text>;
            }
            const userData = data.getUser;
            const isshop = userData.isstore;
            const phone = userData.phone
              ? userData.phone.replace(code(), '')
              : null;
            const callargs = {
              number: phone ? phone : userData.mob ? userData.mob : null,
              prompt: false
            };
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
                  hideReportModal={this.hideReportModal}
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

                {userData.branches && userData.branches.length > 0 && (
                  <MapModal
                    isMapModalVisible={this.state.isMapModalVisible}
                    hideMapModal={this.hideMapModal}
                    itemLocations={userData.branches}
                    width={width}
                    height={height}
                  />
                )}

                <Animated.View
                  style={{
                    position: 'absolute',
                    marginTop: headerHeight,
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#fff',
                    zIndex: 200
                  }}
                >
                  {this.renderHeader({
                    user: userData,
                    words,
                    callargs,
                    maincolor
                  })}
                  {this.renderTabs({
                    tab,
                    maincolor,
                    words,
                    user: userData,
                    isshop
                  })}
                </Animated.View>

                <View style={{ flex: 1, width, borderStartColor: 'blue' }}>
                  {this.renderQuery({
                    variables: { userId: userData._id, ...this.state.rest },
                    isRTL,
                    words,
                    lang
                  })}
                </View>
              </View>
            );
          }}
        </Query>
      );
    } else {
      const isshop = user.isstore;
      const phone = user.phone ? user.phone.replace(code(), '') : null;
      const callargs = { number: phone, prompt: false };
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
            hideReportModal={this.hideReportModal}
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
          {user.branches && user.branches.length > 0 && (
            <MapModal
              isMapModalVisible={this.state.isMapModalVisible}
              hideMapModal={this.hideMapModal}
              itemLocations={user.branches}
              width={width}
              height={height}
            />
          )}
          <Animated.View
            style={{
              position: 'absolute',
              marginTop: headerHeight,
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: '#fff',
              zIndex: 200
            }}
          >
            {this.renderHeader({
              user,
              words,
              callargs,
              maincolor
            })}
            {this.renderTabs({
              tab,
              maincolor,
              words,
              user,
              isshop
            })}
          </Animated.View>

          <View style={{ flex: 1, width, borderStartColor: 'blue' }}>
            {this.renderQuery({
              variables: { userId: user._id, ...this.state.rest },
              isRTL,
              words,
              lang
            })}
          </View>
        </View>
      );
    }
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
  { updateUser }
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
        graphql(updateMyQty, {
          name: 'updateMyQty',
          options: { refetchQueries: ['getUserPosts'] }
        })(
          graphql(getUser, {
            name: 'getUser'
          })(ProfileScreen)
        )
      )
    )
  )
);

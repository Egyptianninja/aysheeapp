import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import * as React from 'react';
import { Query } from 'react-apollo';
import {
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import {
  BodyView,
  FullTimeView,
  getJobProperties,
  getproperties,
  InputBar,
  ItemComment,
  Loading,
  PhotoSlider,
  PriceView,
  Properties
} from '..';
import secrets from '../../constants/secrets';
import getPostComments from '../../graphql/query/getPostComments';
import getUser from '../../graphql/query/getUser';
import commentAdded from '../../graphql/subscription/commentAdded';
import { LoadingView } from '../../lib';
import {
  getDate,
  ImageViewer,
  ItemLocation,
  Message,
  onShare,
  rtlos,
  StyleSheet
} from '../../utils';
import Link from '../../utils/location/link';
import { Edit, Menu, Report } from '../Menu';
import { renderUser } from '../User';
import { MenuIconHeader } from './MenuIconHeader';
import MessageAlert from '../../utils/message/MessageAlert';
import { code } from '../../store/getStore';

const { width, height } = Dimensions.get('window');

class ItemView extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
  ardroid = Platform.OS === 'android' && this.props.isRTL;

  keyboardWillShowListener: any;
  keyboardWillHideListener: any;

  keyboardDidShowListener: any;
  keyboardDidHideListener: any;
  scrollView: any;
  scrollOffset: any;
  scrollViewHeight: any;

  childRef: any = React.createRef();
  state = {
    isImageViewVisible: true,
    isMenuModalVisible: false,
    isReportModalVisible: false,
    isEditModalVisible: false,
    isMessageVisible: false,
    isCheckMessaheVisible: false,
    isScrollEnable: true,
    isModelVisible: false,
    message: null,
    id: null,
    name: null,
    body: null,
    imageIndex: 0,
    scrollY: new Animated.Value(0),
    keyboardHeight: new Animated.Value(0),
    inputBarText: '',
    cursor: 0,
    opacity: 1,
    bottomPadding: 0,
    scrollEnabled: true,
    hideMenuData: {
      menuId: null,
      postId: null,
      post: null
    }
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide.bind(this)
    );
    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow.bind(this)
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide.bind(this)
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  showMenuModal = () => {
    this.setState({ isMenuModalVisible: true });
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
    await this.setState({ message, screen });
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

  deletePost = async () => {
    await this.props.deletePost({
      variables: {
        postId: this.props.post.id
      }
    });
    this.hideCheckMessageModal();
  };
  canceldeletePost = async () => {
    this.hideCheckMessageModal();
  };

  handleOnMenuModalHide = async () => {
    if (!this.state.hideMenuData || !this.state.hideMenuData.menuId) {
      return;
    }
    const { menuId } = this.state.hideMenuData;
    const { post, postId, word } = this.props;
    if (menuId === 1) {
      if (!this.props.isAuthenticated) {
        this.showMessageModal({ message: 'you have to login!' });
      } else {
        await this.props.favoritePost({
          variables: { postId }
        });
        this.showMessageModal({
          message: word.successadded
        });
      }
    } else if (menuId === 2) {
      await this.props.unFavoritePost({
        variables: { postId }
      });
      this.showMessageModal({
        message: word.removeedtovafavorites
      });
    } else if (menuId === 3) {
      const message = `
      ${post.title}

      ${post.body}

      ${post.price}`;
      onShare(message, this.hideMenuModal);
    } else if (menuId === 4) {
      if (!this.props.isAuthenticated) {
        this.showMessageModal({ message: 'you have to login!' });
      } else {
        this.showReportModal();
      }
    } else if (menuId === 5) {
      if (post.updates) {
        this.props.editClassifieds({
          variables: {
            postId: post.id,
            updates: post.updates + 1
          }
        });
      } else {
        this.props.editClassifieds({
          variables: {
            postId,
            updates: 1
          }
        });
      }

      this.showMessageModal({
        message: word.adrefreshed
      });
    } else if (menuId === 6) {
      this.props.editClassifieds({
        variables: {
          postId,
          islive: true
        }
      });
      if (post.isoffer) {
        this.props.updateQty('offers', 1);
      } else {
        this.props.updateQty('online', 1);
      }
      this.props.updateQty('offline', -1);
      this.showMessageModal({
        message: word.adpublished
      });
    } else if (menuId === 7) {
      this.props.editClassifieds({
        variables: {
          postId,
          islive: false
        }
      });
      if (post.isoffer) {
        this.props.updateQty('offers', -1);
      } else {
        this.props.updateQty('online', -1);
      }
      this.props.updateQty('offline', 1);
      this.showMessageModal({
        message: word.adunpupished
      });
    } else if (menuId === 8) {
      this.showEditModal();
    } else if (menuId === 9) {
      this.showCheckMessageModal();
    } else if (menuId === 10) {
      this.props.editClassifieds({
        variables: {
          postId,
          isfront: true
        }
      });
      this.props.updateQty('front', 1);
    } else if (menuId === 11) {
      this.props.editClassifieds({
        variables: {
          postId,
          isfront: false
        }
      });
      this.props.updateQty('front', -1);
    }
  };

  keyboardWillShow(e: any) {
    const duration = Platform.OS === 'android' ? 100 : e.duration;
    Animated.timing(this.state.keyboardHeight, {
      duration: duration + 100,
      toValue: e.endCoordinates.height
    }).start();
  }
  keyboardWillHide(e: any) {
    const duration = Platform.OS === 'android' ? 100 : e.duration;
    Animated.timing(this.state.keyboardHeight, {
      duration: duration + 100,
      toValue: 0
    }).start();
  }

  keyboardDidShow(e: any) {
    this.scrollView.scrollToEnd();
  }

  keyboardDidHide(e: any) {
    this.scrollView.scrollToEnd();
  }

  getimageurls = (post: any) => {
    return post.photos.map((photo: any) => {
      return {
        url: `http://res.cloudinary.com/${
          secrets.upload.CLOUD_NAME
        }/image/upload/w_1080/${photo.substring(0, 20)}`
      };
    });
  };

  closeReplay = () => {
    this.setState({
      inputBarText: '',
      id: null,
      name: null,
      body: null
    });
    this.scrollView.scrollToEnd({ animated: true });
  };

  async sendMessage({ postId, ownerId, postTitle, userName }: any) {
    if (this.state.inputBarText === '') {
      return null;
    }
    const replayto =
      this.state.name && this.state.body
        ? {
            id: this.state.id,
            name: this.state.name,
            body: this.state.body
          }
        : undefined;
    await this.props.createComment({
      variables: {
        postId,
        body: this.state.inputBarText,
        replayto,
        ownerId,
        postTitle,
        userName,
        avatar: this.props.user.avatar,
        uniquename: this.props.user.uniquename,
        color: this.props.user.color
      }
    });
    this.setState({
      inputBarText: '',
      id: null,
      name: null,
      body: null
    });
    this.scrollView.scrollToEnd({ animated: true });
  }

  onChangeInputBarText(text: string) {
    this.setState({
      inputBarText: text
    });
  }
  updateCursor = (value: number) => {
    this.setState({ cursor: value });
  };

  handleBack = () => {
    this.props.navigation.goBack();
  };
  getScrollLength = (w: any, h: any) => {
    this.scrollViewHeight = h;
  };
  EnableScroll = () => {
    this.setState({ scrollEnabled: true, opacity: 1 });
  };
  DisableScroll = () => {
    this.setState({ scrollEnabled: false, opacity: 0 });
  };

  hideModal = () => {
    this.setState({ isModelVisible: false });
  };
  showModal = (i: number) => {
    this.setState({ isModelVisible: true, imageIndex: i });
  };

  replayComment = ({ id, name, body }: any) => {
    this.setState({ id, name, body });
    this.childRef.current.getFocus();
  };

  getTags = (data: any) => {
    const newObject = data.filter((a: any) => a.name === 'isnew')[0];
    const saleObject = data.filter((a: any) => a.name === 'issale')[0];
    const furntObject = data.filter((a: any) => a.name === 'isfurnishered')[0];
    const fulltimeObject = data.filter((a: any) => a.name === 'isfullTime')[0];
    const warrantyObject = data.filter((a: any) => a.name === 'iswarranty')[0];
    return {
      newObject,
      saleObject,
      furntObject,
      fulltimeObject,
      warrantyObject
    };
  };

  render() {
    const {
      post,
      myItem,
      fav,
      live,
      word,
      isRTL,
      postId,
      isAuthenticated
    } = this.props;
    const photos = this.getimageurls(post);
    const pdata = getproperties(post);
    const jdata = getJobProperties(post);
    const {
      newObject,
      saleObject,
      furntObject,
      fulltimeObject,
      warrantyObject
    } = this.getTags(pdata);
    const phone = post.phone.replace(code(), '');
    const callargs = { number: phone, prompt: false };
    const opacityStyle = this.state.scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, 1]
    });

    return (
      <View style={styles.container}>
        <Menu
          postId={postId}
          post={post}
          myItem={myItem}
          live={live}
          fav={fav}
          word={word}
          isRTL={isRTL}
          favoritePost={this.props.favoritePost}
          unFavoritePost={this.props.unFavoritePost}
          editClassifieds={this.props.editClassifieds}
          isMenuModalVisible={this.state.isMenuModalVisible}
          hideMenuModal={this.hideMenuModal}
          showEditModal={this.showEditModal}
          showReportModal={this.showReportModal}
          showMessageModal={this.showMessageModal}
          showCheckMessageModal={this.showCheckMessageModal}
          handleOnMenuModalHide={this.handleOnMenuModalHide}
          isAuthenticated={isAuthenticated}
          user={this.props.user}
        />
        <Report
          isReportModalVisible={this.state.isReportModalVisible}
          hideReportModal={this.hideReportModal}
          word={word}
          isRTL={isRTL}
        />
        {this.state.isEditModalVisible && (
          <Edit
            isEditModalVisible={this.state.isEditModalVisible}
            editClassifieds={this.props.editClassifieds}
            hideEditModal={this.hideEditModal}
            showMessageModal={this.showMessageModal}
            showEditModal={this.showEditModal}
            showCheckMessageModal={this.showCheckMessageModal}
            word={word}
            isRTL={isRTL}
            post={post}
          />
        )}
        <MessageAlert
          isMessageVisible={this.state.isMessageVisible}
          hideMessageModal={this.hideMessageModal}
          message={this.state.message}
          icon="ios-checkmark-circle"
          isRTL={isRTL}
          height={120}
        />
        <Message
          isVisible={this.state.isCheckMessaheVisible}
          onCheckMessageModalHide={this.onCheckMessageModalHide}
          body={word.deleteareyousure}
          icon="ios-information-circle"
          width={width}
          okbtnTitle={word.yes}
          cancelbtnTitle={word.cancel}
          okAction={this.deletePost}
          cancelAction={this.canceldeletePost}
          isRTL={isRTL}
          iconColor="#E85255"
          height={200}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{
            position: 'absolute',
            top:
              Platform.OS === 'android'
                ? Constants.statusBarHeight + 6
                : Constants.statusBarHeight + 3,
            left: this.ardroid ? undefined : 10,
            right: this.ardroid ? 10 : undefined,
            zIndex: 860,
            width: 60,
            height: 50,
            borderRadius: 16,
            justifyContent: 'flex-start',
            alignItems: rtlos() === 3 ? 'flex-end' : 'flex-start'
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.3)'
            }}
          >
            <Ionicons
              name="ios-arrow-back"
              size={30}
              style={styles.icon}
              color="rgba(0, 0, 0, 0.6)"
            />
          </View>
        </TouchableOpacity>
        {/* header */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              flexDirection: this.ardroid ? 'row-reverse' : 'row',
              paddingTop: Constants.statusBarHeight,
              height: Constants.statusBarHeight + 40,
              justifyContent: 'space-between',
              // paddingHorizontal: 10,
              alignItems: 'center',
              zIndex: 850,
              shadowOffset: { width: 3, height: 3 },
              shadowColor: '#555',
              shadowOpacity: 0.2,
              backgroundColor: '#f3f3f3',
              opacity: opacityStyle
            }
          ]}
        >
          <View
            style={{
              flex: 5,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                fontFamily: 'cairo-regular',
                fontSize: 20,
                color: '#636363'
              }}
            >
              {post.title.substring(0, 20)}
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              top: 23,
              right: 2
            }}
          >
            <MenuIconHeader showMenuModal={this.showMenuModal} />
          </View>
        </Animated.View>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={this.getScrollLength}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            scrollEnabled={this.state.scrollEnabled}
            contentContainerStyle={{
              backgroundColor: '#fff',
              paddingBottom: 30
            }}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y: this.state.scrollY }
                }
              }
            ])}
            ref={ref => {
              this.scrollView = ref;
            }}
            style={{
              backgroundColor: '#eee',
              marginTop:
                Platform.OS === 'android'
                  ? Constants.statusBarHeight
                  : undefined
            }}
          >
            {photos.length > 0 && (
              <View>
                <PhotoSlider
                  photos={photos}
                  ratio={post.ratio}
                  showModal={this.showModal}
                />
                <Modal
                  isVisible={this.state.isModelVisible}
                  onBackdropPress={() => this.hideModal()}
                  onBackButtonPress={() => this.hideModal()}
                  useNativeDriver={true}
                  hideModalContentWhileAnimating={true}
                  style={{ margin: 0 }}
                >
                  <ImageViewer
                    imageUrls={photos}
                    index={this.state.imageIndex}
                    loadingRender={() => (
                      <LoadingView width={width} height={height} />
                    )}
                    enableSwipeDown={true}
                    swipeDownThreshold={100}
                    flipThreshold={60}
                    doubleClickInterval={240}
                    pageAnimateTime={180}
                    saveToLocalByLongPress={false}
                    onSwipeDown={() => this.hideModal()}
                    renderIndicator={() => <View />}
                  />
                  <TouchableOpacity
                    onPress={() => this.hideModal()}
                    style={{
                      position: 'absolute',
                      right: 20,
                      top: Constants.statusBarHeight + 6,
                      paddingHorizontal: 20
                    }}
                  >
                    <Ionicons name="ios-close" size={40} color="#fff" />
                  </TouchableOpacity>
                </Modal>
              </View>
            )}

            {photos.length === 0 && (
              <View
                style={{
                  width,
                  height: width,
                  backgroundColor: '#A7A9F3',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 40,
                    fontWeight: 'bold'
                  }}
                >
                  {post.title}
                </Text>
              </View>
            )}
            <View style={{ paddingHorizontal: 10 }}>
              {(post.isfullTime === true || post.isfullTime === false) && (
                <FullTimeView
                  ardroid={this.ardroid}
                  words={word}
                  fulltimeObject={fulltimeObject}
                />
              )}
              {(post.price || post.price === 0) && (
                <PriceView
                  ardroid={this.ardroid}
                  words={word}
                  price={post.price}
                  currency={post.currency}
                  newObject={newObject}
                  saleObject={saleObject}
                  furntObject={furntObject}
                  warrantyObject={warrantyObject}
                />
              )}
              {post.start && (
                <Text
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: 0,
                    textAlign: 'left',
                    color: '#7678ED',
                    fontSize: 12,
                    marginTop: 6
                  }}
                  numberOfLines={2}
                >
                  {getDate(post.start)} - {getDate(post.end)}
                </Text>
              )}
              <BodyView
                ardroid={this.ardroid}
                title={post.title}
                body={post.body}
                isrtl={post.isrtl}
                time={post.time}
                word={word}
              />
              <Properties
                android={Platform.OS === 'android'}
                isRTL={isRTL}
                words={word}
                data={pdata}
              />
              <View style={{ height: 20 }} />
              {myItem &&
                renderUser({
                  user: this.props.user,
                  callargs,
                  word,
                  isAuthenticated: this.props.isAuthenticated,
                  userId: this.props.user._id,
                  navigation: this.props.navigation,
                  ardroid: this.ardroid
                })}
              {!myItem && (
                <Query query={getUser} variables={{ userId: post.userId }}>
                  {({ loading, error, data }) => {
                    if (loading) {
                      return <Loading />;
                    }
                    if (error) {
                      return <Text>{error}</Text>;
                    }
                    const user = data.getUser;
                    return renderUser({
                      user,
                      callargs,
                      word,
                      isAuthenticated: this.props.isAuthenticated,
                      userId: this.props.isAuthenticated
                        ? this.props.user._id
                        : undefined,
                      navigation: this.props.navigation,
                      ardroid: this.ardroid
                    });
                  }}
                </Query>
              )}
            </View>
            <View style={{ height: 20 }} />

            {(post.categoryId === 5 || post.categoryId === 6) && (
              <Properties
                android={Platform.OS === 'android'}
                isRTL={isRTL}
                words={word}
                data={jdata}
              />
            )}
            {post.trueLocation && (
              <ItemLocation
                latitude={post.trueLocation.lat}
                longitude={post.trueLocation.lon}
                title={post.title}
              />
            )}
            {post.trueLocation && (
              <Link
                latitude={post.trueLocation.lat}
                longitude={post.trueLocation.lon}
                title={post.title}
              />
            )}
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                marginBottom: 5,
                alignItems:
                  isRTL && Platform.OS !== 'android'
                    ? 'flex-end'
                    : 'flex-start',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: '#aaa'
                }}
              >
                {word.comments}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#fff',
                paddingHorizontal: 5,
                marginHorizontal: 10,
                borderRadius: 10,
                marginBottom: 10
              }}
            >
              <Query
                query={getPostComments}
                variables={{ postId }}
                fetchPolicy="network-only"
              >
                {({ subscribeToMore, fetchMore, ...result }) => (
                  <ItemComment
                    {...result}
                    updateCursor={this.updateCursor}
                    navigation={this.props.navigation}
                    isAuthenticated={this.props.isAuthenticated}
                    lang={this.props.lang}
                    isRTL={this.props.isRTL}
                    words={word}
                    width={width}
                    user={this.props.user}
                    replayComment={this.replayComment}
                    word={word}
                    subscribeToNewComments={() =>
                      subscribeToMore({
                        document: commentAdded,
                        variables: { postId },
                        updateQuery: (prev, { subscriptionData }) => {
                          if (!subscriptionData.data) {
                            return prev;
                          }
                          const newFeedItem =
                            subscriptionData.data.commentAdded;
                          return {
                            ...prev,
                            getPostComments: [
                              ...prev.getPostComments,
                              newFeedItem
                            ]
                          };
                        }
                      })
                    }
                    fetchMoreComments={() =>
                      fetchMore({
                        variables: {
                          postId,
                          cursor: this.state.cursor
                        },
                        updateQuery: (
                          previousResult: any,
                          { fetchMoreResult }: any
                        ) => {
                          if (
                            !fetchMoreResult ||
                            fetchMoreResult.getPostComments.length === 0
                          ) {
                            return previousResult;
                          }
                          const newComments = fetchMoreResult.getPostComments.reverse();
                          return {
                            ...previousResult,
                            getPostComments: [
                              ...previousResult.getPostComments,
                              ...newComments
                            ]
                          };
                        }
                      })
                    }
                  />
                )}
              </Query>
            </View>
            {this.props.isAuthenticated && (
              <InputBar
                onSendPressed={(postID: any) => {
                  this.sendMessage({
                    postId: postID,
                    ownerId: post.userId,
                    postTitle: post.title,
                    userName: this.props.user.name
                      ? this.props.user.name
                      : this.props.user.uniquename
                  });
                }}
                replay={{
                  id: this.state.id,
                  name: this.state.name,
                  body: this.state.body
                }}
                ref={this.childRef}
                closeReplay={this.closeReplay}
                onChangeText={(text: string) => this.onChangeInputBarText(text)}
                text={this.state.inputBarText}
                autoFocus={true}
                postId={postId}
                placeholder={word.writecomment}
                isRTL={isRTL}
              />
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  item: {
    padding: 10
  }
});

export default ItemView;

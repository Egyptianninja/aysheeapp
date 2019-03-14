import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import * as React from 'react';
import { Query } from 'react-apollo';
import {
  Animated,
  Dimensions,
  Keyboard,
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
import { KeyboardSpacer, LoadingView } from '../../lib';
import {
  getDate,
  ImageViewer,
  ItemLocation,
  Message,
  StyleSheet
} from '../../utils';
import Link from '../../utils/location/link';
import { Edit, Menu, Report } from '../Menu';
import { renderUser } from '../User';
import { MenuIconHeader } from './MenuIconHeader';

const { width, height } = Dimensions.get('window');

class ItemView extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
  ardroid = Platform.OS === 'android' && this.props.isRTL;
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

    inputBarText: '',
    cursor: 0,
    opacity: 1
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
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  showMenuModal = () => {
    this.setState({ isMenuModalVisible: true });
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

  deletePost = async () => {
    await this.props.deletePost({
      variables: {
        postId: this.props.post.id
      }
    });
    this.hideCheckMessageModal();
    setTimeout(() => {
      this.showMessageModal({
        seconds: 1,
        message: this.props.word.addeleted
      });
    }, 1000);
  };
  canceldeletePost = async () => {
    this.hideCheckMessageModal();
  };

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
    const callargs = { number: post.phone, prompt: false };
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
        <Message
          isVisible={this.state.isMessageVisible}
          title={this.state.message}
          word={word}
          icon="ios-checkmark-circle"
          isRTL={isRTL}
          width={width}
          height={120}
        />
        <Message
          isVisible={this.state.isCheckMessaheVisible}
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
            top: Constants.statusBarHeight + 3,
            left: this.ardroid ? undefined : 8,
            right: this.ardroid ? 10 : undefined,
            zIndex: 860,
            width: 32,
            height: 32,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
          }}
        >
          <Ionicons
            name="ios-arrow-back"
            size={30}
            style={styles.icon}
            color="#fff"
          />
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
              backgroundColor: '#7678ED',
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
                color: '#fff'
              }}
            >
              {post.title.substring(0, 20)}
            </Text>
          </View>
          <MenuIconHeader showMenuModal={this.showMenuModal} />
        </Animated.View>
        <ScrollView
          onContentSizeChange={this.getScrollLength}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ backgroundColor: '#fff' }}
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
          style={{ backgroundColor: '#eee' }}
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
          <Properties
            android={Platform.OS === 'android'}
            isRTL={isRTL}
            words={word}
            data={pdata}
          />
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
                isRTL && Platform.OS !== 'android' ? 'flex-end' : 'flex-start',
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#999'
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
                        const newFeedItem = subscriptionData.data.commentAdded;
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
        </ScrollView>
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

        <KeyboardSpacer />
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

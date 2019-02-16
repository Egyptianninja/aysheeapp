import * as React from 'react';
import {
  View,
  Dimensions,
  Text,
  Animated,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image
} from 'react-native';
import { Query } from 'react-apollo';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import { KeyboardSpacer } from '../../../lib';
import secrets from '../../../constants/secrets';
import {
  StyleSheet,
  ItemLocation,
  call,
  ImageViewer,
  Message
} from '../../../utils';
import getPostComments from '../../../graphql/query/getPostComments';
import getUser from '../../../graphql/query/getUser';
import commentAdded from '../../../graphql/subscription/commentAdded';
import { MenuIcon, Menu } from '../../../componenets/ItemScreen';
import Edit from '../../../componenets/MyPostsScreen/Edit';
import {
  Avatar,
  Properties,
  PriceView,
  BodyView,
  InputBar,
  ItemComment,
  PhotoSlider,
  Loading,
  getproperties,
  getJobProperties,
  FullTimeView
} from '../../../componenets';
import Link from '../../../utils/location/link';
import { Report } from '../../../componenets/HomeScreen';

const { width } = Dimensions.get('window');

class ItemScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
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
        }/image/upload/w_960/${photo.substring(0, 20)}`
      };
    });
  };

  async sendMessage(postId: any, ownerId: any, postTitle: any, userName: any) {
    if (this.state.inputBarText === '') {
      return null;
    }
    await this.props.createComment({
      variables: {
        postId,
        body: this.state.inputBarText,
        ownerId,
        postTitle,
        userName
      }
    });
    this.setState({
      inputBarText: ''
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

  replayComment = (uname: any) => {
    this.setState({ inputBarText: `@${uname} ` });
    this.childRef.current.getFocus();
  };

  renderUser = (user: any, callargs: any, word: any) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderBottomLeftRadius: 35,
        borderTopLeftRadius: 35
      }}
    >
      <View style={{ flex: 2, flexDirection: 'row' }}>
        {user.avatar && (
          <TouchableOpacity
            onPress={() => {
              if (this.props.isAuthenticated) {
                const screen =
                  user._id === this.props.user._id
                    ? 'MyPostsScreen'
                    : 'UserProfileScreen';
                this.props.navigation.navigate(screen, { user });
              } else {
                this.props.navigation.navigate('UserProfileScreen', { user });
              }
            }}
          >
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 25
              }}
              source={{
                uri: `http://res.cloudinary.com/arflon/image/upload/w_${100}/${
                  user.avatar
                }`
              }}
            />
          </TouchableOpacity>
        )}
        {!user.avatar && (
          <TouchableOpacity
            onPress={() => {
              if (this.props.isAuthenticated) {
                const screen =
                  user._id === this.props.user._id
                    ? 'MyPostsScreen'
                    : 'UserProfileScreen';
                this.props.navigation.navigate(screen, { user });
              } else {
                this.props.navigation.navigate('UserProfileScreen', { user });
              }
            }}
          >
            <Avatar name={user.name ? user.name : user.uniquename} size={50} />
          </TouchableOpacity>
        )}
        <View style={{ paddingLeft: 10 }}>
          <TouchableOpacity
            onPress={() => {
              if (this.props.isAuthenticated) {
                const screen =
                  user._id === this.props.user._id
                    ? 'MyPostsScreen'
                    : 'UserProfileScreen';
                this.props.navigation.navigate(screen, { user });
              } else {
                this.props.navigation.navigate('UserProfileScreen', { user });
              }
            }}
          >
            {user.name && (
              <Text style={{ fontWeight: 'bold' }}>{user.name}</Text>
            )}
            {user.uniquename && (
              <Text style={{ fontSize: 12, color: '#888' }}>
                {user.uniquename}
              </Text>
            )}
          </TouchableOpacity>
          {user.postsQty > 0 && (
            <Text
              style={{
                fontSize: 12,
                color: '#7678ED',
                paddingTop: 5
              }}
            >
              {user.postsQty} {word.moreads}
            </Text>
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={() => call(callargs)}
        style={{
          width: 85,
          height: 36,
          borderRadius: 18,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#7678ED',
          flexDirection: 'row'
        }}
      >
        <Ionicons
          name="ios-call"
          size={26}
          style={{ paddingRight: 10 }}
          color="#fff"
        />

        <Text
          style={{
            fontSize: 14,
            color: '#fff'
          }}
        >
          {word.calladvertiser}
        </Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    const post = this.props.post
      ? this.props.post
      : this.props.navigation.getParam('post');
    const postId = post.id ? post.id : post._id;
    const word = this.props.word
      ? this.props.word
      : this.props.navigation.getParam('word');
    const lang = this.props.lang
      ? this.props.lang
      : this.props.navigation.getParam('lang');
    const photos = this.getimageurls(post);
    const pdata = getproperties(post);
    const jdata = getJobProperties(post);
    const newObject = pdata.filter((a: any) => a.name === 'isnew')[0];
    const saleObject = pdata.filter((a: any) => a.name === 'issale')[0];
    const furntObject = pdata.filter((a: any) => a.name === 'isfurnishered')[0];
    const fulltimeObject = pdata.filter((a: any) => a.name === 'isfullTime')[0];
    const warrantyObject = pdata.filter((a: any) => a.name === 'iswarranty')[0];
    const callargs = {
      number: post.phone, // Use commas to add time between digits.
      prompt: false
    };
    const { fav, myItem, live } = this.props;
    const opacityStyle = this.state.scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, 1]
    });

    return (
      <View style={styles.container}>
        <Menu
          postId={postId}
          post={post}
          live={live}
          word={word}
          lang={lang}
          fav={fav}
          myItem={myItem}
          favoritePost={this.props.favoritePost}
          unFavoritePost={this.props.unFavoritePost}
          editClassifieds={this.props.editClassifieds}
          isMenuModalVisible={this.state.isMenuModalVisible}
          hideMenuModal={this.hideMenuModal}
          showEditModal={this.showEditModal}
          showReportModal={this.showReportModal}
          showMessageModal={this.showMessageModal}
          showCheckMessageModal={this.showCheckMessageModal}
        />
        <Report
          isReportModalVisible={this.state.isReportModalVisible}
          hideReportModal={this.hideReportModal}
          word={word}
          lang={lang}
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
            lang={lang}
            post={post}
          />
        )}
        <Message
          isVisible={this.state.isMessageVisible}
          title={this.state.message}
          word={word}
          // title={
          //   this.props.fav ? word.removeedtovafavorites : word.successadded
          // }
          icon="ios-checkmark-circle"
          lang={lang}
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
          lang={lang}
          iconColor="#E85255"
          height={200}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{
            position: 'absolute',
            top: Constants.statusBarHeight + 6,
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
          <Ionicons
            name="ios-arrow-back"
            size={30}
            style={styles.icon}
            color="#9C949A"
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
              flexDirection: 'row',
              paddingTop: Constants.statusBarHeight,
              height: Constants.statusBarHeight + 45,
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              alignItems: 'center',
              zIndex: 850,
              shadowOffset: { width: 3, height: 3 },
              shadowColor: '#555',
              shadowOpacity: 0.2,
              backgroundColor: '#fff',
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
                color: '#373737'
              }}
            >
              {post.title.substring(0, 20)}
            </Text>
          </View>
          <MenuIcon
            post={post}
            favoritePost={this.props.favoritePost}
            showMenuModal={this.showMenuModal}
            word={word}
            lang={lang}
          />
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
                finalRatio={post.finalRatio}
                ratio={post.ratio}
                EnableScroll={this.EnableScroll}
                DisableScroll={this.DisableScroll}
                showModal={this.showModal}
              />
              <Modal
                visible={this.state.isModelVisible}
                onRequestClose={() => this.hideModal()}
                transparent={true}
              >
                <ImageViewer
                  imageUrls={photos}
                  index={this.state.imageIndex}
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
              <FullTimeView words={word} fulltimeObject={fulltimeObject} />
            )}
            {(post.price || post.price === 0) && (
              <PriceView
                words={word}
                price={post.price}
                currency={post.currency}
                newObject={newObject}
                saleObject={saleObject}
                furntObject={furntObject}
                warrantyObject={warrantyObject}
              />
            )}
            <BodyView
              title={post.title}
              body={post.body}
              isrtl={post.isrtl}
              time={post.time}
              word={word}
            />
            <View style={{ height: 20 }} />
            {myItem && this.renderUser(this.props.user, callargs, word)}
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
                  return this.renderUser(user, callargs, word);
                }}
              </Query>
            )}
          </View>
          <View style={{ height: 20 }} />
          <Properties lang={lang} words={word} data={pdata} />
          {(post.categoryId === 5 || post.categoryId === 6) && (
            <Properties lang={lang} words={word} data={jdata} />
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
              alignItems: lang === 'ar' ? 'flex-end' : 'flex-start',
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
              this.sendMessage(
                postID,
                post.userId,
                post.title,
                this.props.user.name
                  ? this.props.user.name
                  : this.props.user.uniquename
              );
            }}
            ref={this.childRef}
            onChangeText={(text: string) => this.onChangeInputBarText(text)}
            text={this.state.inputBarText}
            autoFocus={true}
            postId={postId}
            placeholder={word.writecomment}
            lang={lang}
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

export default ItemScreen;
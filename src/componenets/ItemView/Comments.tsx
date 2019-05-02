import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import * as React from 'react';
import { Query } from 'react-apollo';
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Modal from 'react-native-modal';

// import InputBar from '../ItemScreen/comment/InputBarOld';
import { ItemComment, InputBar } from '../ItemScreen';
import getPostComments from '../../graphql/query/getPostComments';
import commentAdded from '../../graphql/subscription/commentAdded';
import { rtlos, StyleSheet, isIphoneX } from '../../utils';
import KeyboardSpacer from '../../lib/elements/KeyboardSpacer';

const { width } = Dimensions.get('window');

class Comments extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.isCommentsModalVisible !== prevState.isCommentsModalVisible) {
      return { isCommentsModalVisible: nextProps.isCommentsModalVisible };
    } else {
      return { ...prevState };
    }
  }

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
    isMessageVisible: false,
    isCommentsModalVisible: false,
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
    scrollEnabled: true
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

  hideModal = () => {
    this.setState({ isModelVisible: false });
  };
  showModal = (i: number) => {
    this.setState({ isModelVisible: true, imageIndex: i });
  };

  replayComment = ({ id, name, body }: any) => {
    this.setState({ id, name, body });
    this.childRef.current.getFocus();
    this.scrollView.scrollToEnd({ animated: true });
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

  render() {
    const { post, word, isRTL, postId } = this.props;

    return (
      <Modal
        isVisible={this.state.isCommentsModalVisible}
        onBackdropPress={() => this.props.hideCommentsModal()}
        onBackButtonPress={() => this.props.hideCommentsModal()}
        backdropOpacity={0.5}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        onModalShow={() => {
          if (this.props.isAuthenticated) {
            this.scrollView.scrollToEnd({ animated: true });
            this.childRef.current.getFocus();
          }
        }}
        style={{ margin: 0 }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => this.props.hideCommentsModal()}
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
                alignItems: 'center',
                zIndex: 850,
                shadowOffset: { width: 3, height: 3 },
                shadowColor: '#555',
                shadowOpacity: 0.2,
                backgroundColor: '#f3f3f3',
                opacity: 1
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
                top: isIphoneX() ? 43 : 23,
                right: 2
              }}
            />
          </Animated.View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={this.getScrollLength}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            scrollEnabled={this.state.scrollEnabled}
            contentContainerStyle={{
              backgroundColor: '#fff',
              paddingTop: 90,
              width
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
              backgroundColor: '#fff',
              marginTop:
                Platform.OS === 'android'
                  ? Constants.statusBarHeight
                  : undefined
            }}
          >
            <View style={{ padding: 10 }}>
              <Text style={{ textAlign: post.isrtl ? 'right' : 'left' }}>
                {post.body}
              </Text>
            </View>
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
                {({ subscribeToMore, fetchMore, ...result }: any) => (
                  <ItemComment
                    {...result}
                    updateCursor={this.updateCursor}
                    hideCommentsModal={this.props.hideCommentsModal}
                    navigation={this.props.navigation}
                    isAuthenticated={this.props.isAuthenticated}
                    lang={this.props.lang}
                    isRTL={this.props.isRTL}
                    words={word}
                    width={width}
                    user={this.props.user}
                    replayComment={this.replayComment}
                    deleteComment={this.props.deleteComment}
                    word={word}
                    subscribeToNewComments={() =>
                      subscribeToMore({
                        document: commentAdded,
                        variables: { postId },
                        updateQuery: (prev: any, { subscriptionData }: any) => {
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
      </Modal>
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

export default Comments;

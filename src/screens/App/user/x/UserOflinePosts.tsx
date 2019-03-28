import MasonryList from '@appandflow/masonry-list';
import { debounce } from 'lodash';
import * as React from 'react';
import { graphql, Query } from 'react-apollo';
import { Animated, Dimensions, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Loading, Noresult } from '../../../../componenets';
import ItemViewSmall from '../../../../componenets/ItemViewSmall';
import { Edit, Menu, Report } from '../../../../componenets/Menu';
import deletePost from '../../../../graphql/mutation/deletePost';
import editClassifieds from '../../../../graphql/mutation/editClassifieds';
import favoritePost from '../../../../graphql/mutation/favoritePost';
import getUserPosts from '../../../../graphql/query/getUserPosts';
import { updateQty } from '../../../../store/actions/userAtions';
import {
  getNextPosts,
  Message,
  readyUserPosts,
  isTablet
} from '../../../../utils';
import MapModal from '../../../../componenets/ProfileScreen/MapModal';
const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = 240;

class UserOflinePosts extends React.Component<any, any> {
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
      modalPost: null
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

  renderQuery = ({ variables, isRTL, words, lang }: any) => {
    return (
      <Query query={getUserPosts} variables={variables}>
        {({ loading, error, data, fetchMore, refetch }) => {
          if (loading) {
            return <Loading />;
          }
          if (error || !data.getUserPosts.posts) {
            return <Noresult title="error" top={HEADER_HEIGHT} />;
          }
          const postsQuery = data.getUserPosts.posts;
          if (postsQuery && postsQuery.length === 0) {
            return (
              <Noresult
                isRTL={isRTL}
                title={words.noresults}
                top={HEADER_HEIGHT}
              />
            );
          }
          const rPosts = readyUserPosts(
            postsQuery,
            isTablet() ? 400 : 200,
            79,
            lang
          );
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
                paddingBottom: 30
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
    );
  };

  render() {
    const { lang, words, isRTL } = this.props;
    const user = this.props.user;
    const postId = this.state.modalPost
      ? this.state.modalPost.id
        ? this.state.modalPost.id
        : this.state.modalPost._id
      : null;
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
        {this.renderQuery({
          variables: { userId: user._id, islive: false },
          isRTL,
          words,
          lang
        })}
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
      })(UserOflinePosts)
    )
  )
);

import MasonryList from '@appandflow/masonry-list';
import { debounce } from 'lodash';
import * as React from 'react';
import { graphql, Query } from 'react-apollo';
import { Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import { Loading, Noresult } from '../../../componenets';
import ItemViewSmall from '../../../componenets/ItemViewSmall';
import { Menu, Report } from '../../../componenets/Menu';
import unFavoritePost from '../../../graphql/mutation/unFavoritePost';
import getMyFavoritePosts from '../../../graphql/query/getMyFavoritePosts';
import {
  getDBNextPosts,
  isTablet,
  Message,
  onShare,
  readyUserPosts
} from '../../../utils';
import MessageAlert from '../../../utils/message/MessageAlert';

const { width } = Dimensions.get('window');

class MyFavScreen extends React.Component<any, any> {
  flatListRef: any;
  getDBNextPosts: any;

  constructor(p: any) {
    super(p);
    this.getDBNextPosts = debounce(getDBNextPosts, 100);
    this.state = {
      refreshing: false,
      isMenuModalVisible: false,
      isReportModalVisible: false,
      isMessageVisible: false,
      modalPost: null,
      message: null
    };
  }

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
  showMessageModal = async ({ screen, message }: any) => {
    await this.setState({ message, screen });
    this.setState({ isMessageVisible: true });
  };
  hideMessageModal = () => {
    this.setState({ isMessageVisible: false, message: null, screen: null });
  };

  selectePost = (post: any, word: any, lang: any, isRTL: any) => {
    this.props.navigation.push('ItemScreen', {
      post,
      word,
      lang,
      fav: true,
      isRTL
    });
  };

  handleOnMenuModalHide = async () => {
    if (!this.state.hideMenuData || !this.state.hideMenuData.menuId) {
      return;
    }
    const { menuId, postId, post } = this.state.hideMenuData;
    if (menuId === 1) {
      if (!this.props.isAuthenticated) {
        this.showMessageModal({ message: 'you have to login!' });
      } else {
        await this.props.favoritePost({
          variables: { postId }
        });
        this.showMessageModal({
          message: this.props.words.successadded
        });
      }
    } else if (menuId === 2) {
      await this.props.unFavoritePost({
        variables: { postId }
      });
      this.showMessageModal({
        message: this.props.words.removeedtovafavorites
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
        message: this.props.words.adrefreshed
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
        message: this.props.words.adpublished
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
        message: this.props.words.adunpupished
      });
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

  render() {
    const { lang, words, isRTL } = this.props;
    const postId = this.state.modalPost
      ? this.state.modalPost.id
        ? this.state.modalPost.id
        : this.state.modalPost._id
      : null;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Menu
          post={this.state.modalPost}
          unFavoritePost={this.props.unFavoritePost}
          isMenuModalVisible={this.state.isMenuModalVisible}
          isAuthenticated={this.props.isAuthenticated}
          hideMenuModal={this.hideMenuModal}
          showReportModal={this.showReportModal}
          showMessageModal={this.showMessageModal}
          handleOnMenuModalHide={this.handleOnMenuModalHide}
          postId={postId}
          word={words}
          isRTL={isRTL}
          fav={true}
          user={this.props.user}
        />
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
        <Query
          query={getMyFavoritePosts}
          variables={{ cursor: 0 }}
          fetchPolicy="network-only"
        >
          {({ loading, error, data, fetchMore, refetch }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              return `Error!: ${error}`;
            }
            const posts = data.getMyFavoritePosts.data;

            if (posts && posts.length === 0) {
              return <Noresult />;
            }
            const rPosts = readyUserPosts(
              posts,
              isTablet() ? 400 : 200,
              79,
              lang
            );

            return (
              <MasonryList
                ref={(ref: any) => {
                  this.flatListRef = ref;
                }}
                onRefresh={() => refetch()}
                onEndReached={() =>
                  this.getDBNextPosts(
                    fetchMore,
                    'getMyFavoritePosts',
                    rPosts.length
                  )
                }
                refreshing={this.state.refreshing}
                data={rPosts}
                renderItem={({ item }: any) => (
                  <ItemViewSmall
                    post={item}
                    unFavoritePost={this.props.unFavoritePost}
                    navigation={this.props.navigation}
                    showMenuModal={this.showMenuModal}
                    selectePost={this.selectePost}
                    word={words}
                    lang={lang}
                    isRTL={isRTL}
                  />
                )}
                getHeightForItem={({ item }: any) => item.height}
                numColumns={2}
                keyExtractor={(item: any) => item._id}
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
  lang: state.glob.languageName,
  isRTL: state.glob.isRTL,
  words: state.glob.language.words,
  user: state.user.user
});

export default connect(mapStateToProps)(
  graphql(unFavoritePost, {
    name: 'unFavoritePost',
    options: { refetchQueries: ['getMyFavoritePosts'] }
  })(MyFavScreen)
);

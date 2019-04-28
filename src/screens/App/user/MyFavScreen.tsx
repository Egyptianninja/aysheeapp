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
  readyUserPosts,
  handleOnMenuModal
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
      updateItemsQty: () => null,
      showEditModal: () => null,
      showCheckMessageModal: () => null
    });
  };

  render() {
    const { lang, words, isRTL, isAuthenticated, favoorites } = this.props;
    const postId = this.state.modalPost
      ? this.state.modalPost.id
        ? this.state.modalPost.id
        : this.state.modalPost._id
      : null;

    if (!isAuthenticated) {
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
          <MasonryList
            onRefresh={() => null}
            refreshing={this.state.refreshing}
            data={favoorites}
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
            keyExtractor={(item: any) => item.id}
            removeClippedSubviews={true}
            windowSize={21}
            onEndReachedThreshold={5}
            maxToRenderPerBatch={20}
            disableVirtualization={false}
          />
        </View>
      );
    }
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
          {({ loading, error, data, fetchMore, refetch }: any) => {
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
  user: state.user.user,
  favoorites: state.glob.favoorites
});

export default connect(mapStateToProps)(
  graphql(unFavoritePost, {
    name: 'unFavoritePost',
    options: { refetchQueries: ['getMyFavoritePosts'] }
  })(MyFavScreen)
);

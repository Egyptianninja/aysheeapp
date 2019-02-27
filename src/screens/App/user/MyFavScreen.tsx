import * as React from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Query, graphql } from 'react-apollo';
import MasonryList from '@appandflow/masonry-list';
import { debounce } from 'lodash';
import getMyFavoritePosts from '../../../graphql/query/getMyFavoritePosts';
import { getDBNextPosts, readyUserPosts, Message } from '../../../utils';
import { Loading } from '../../../componenets';
import unFavoritePost from '../../../graphql/mutation/unFavoritePost';
import { Menu, Report } from '../../../componenets/Menu';
import ItemViewSmall from '../../../componenets/ItemViewSmall';

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
  hideMenuModal = () => {
    this.setState({ isMenuModalVisible: false, modalPost: null });
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

  selectePost = (post: any, word: any, lang: any, isRTL: any) => {
    this.props.navigation.navigate('ItemScreenUser', {
      post,
      word,
      lang,
      fav: true,
      isRTL
    });
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
          hideMenuModal={this.hideMenuModal}
          showReportModal={this.showReportModal}
          showMessageModal={this.showMessageModal}
          postId={postId}
          word={words}
          isRTL={isRTL}
          fav={true}
        />
        <Report
          isReportModalVisible={this.state.isReportModalVisible}
          hideReportModal={this.hideReportModal}
          word={words}
          isRTL={isRTL}
        />
        <Message
          isVisible={this.state.isMessageVisible}
          title={words.removeedtovafavorites}
          icon="ios-checkmark-circle"
          isRTL={isRTL}
          width={width}
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
            const rPosts = readyUserPosts(posts, 200, 79, lang);
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
  words: state.glob.language.words
});

export default connect(mapStateToProps)(
  graphql(unFavoritePost, {
    name: 'unFavoritePost'
  })(MyFavScreen)
);

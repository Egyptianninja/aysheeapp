import * as React from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Query, graphql } from 'react-apollo';
import MasonryList from '@appandflow/masonry-list';
import { debounce } from 'lodash';
import getMyFavoritePosts from '../../../graphql/query/getMyFavoritePosts';
import { getDBNextPosts, readyUserPosts, Message } from '../../../utils';
import { ItemFavView, Loading } from '../../../componenets';
import unFavoritePost from '../../../graphql/mutation/unFavoritePost';
import Menu from '../../../componenets/MyFavScreen/Menu';
import Report from '../../../componenets/MyFavScreen/Report';

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
      modalPost: null
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

  selectePost = (post: any, word: any, lang: any) => {
    this.props.navigation.navigate('ItemScreen', {
      post,
      word,
      lang,
      fav: true
    });
  };

  render() {
    const { lang, words } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Menu
          post={this.state.modalPost}
          unFavoritePost={this.props.unFavoritePost}
          isMenuModalVisible={this.state.isMenuModalVisible}
          hideMenuModal={this.hideMenuModal}
          showReportModal={this.showReportModal}
          showMessageModal={this.showMessageModal}
          word={words}
          lang={lang}
        />
        <Report
          isReportModalVisible={this.state.isReportModalVisible}
          hideReportModal={this.hideReportModal}
          word={words}
          lang={lang}
        />
        <Message
          isVisible={this.state.isMessageVisible}
          title={words.removeedtovafavorites}
          icon="ios-checkmark-circle"
          lang={lang}
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
                  <ItemFavView
                    post={item}
                    unFavoritePost={this.props.unFavoritePost}
                    navigation={this.props.navigation}
                    showMenuModal={this.showMenuModal}
                    selectePost={this.selectePost}
                    word={words}
                    lang={lang}
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
  words: state.glob.language.words
});

export default connect(mapStateToProps)(
  graphql(unFavoritePost, {
    name: 'unFavoritePost'
  })(MyFavScreen)
);

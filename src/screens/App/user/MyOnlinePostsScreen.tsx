import * as React from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Query, graphql } from 'react-apollo';
import MasonryList from '@appandflow/masonry-list';
import { debounce } from 'lodash';
import getMyPosts from '../../../graphql/query/getMyPosts';
import { getNextPosts, readyUserPosts, Message } from '../../../utils';
import { ItemOwnerView, Loading } from '../../../componenets';
import editClassifieds from '../../../graphql/mutation/editClassifieds';
import deletePost from '../../../graphql/mutation/deletePost';
import Menu from '../../../componenets/MyPostsScreen/Menu';
import Edit from '../../../componenets/MyPostsScreen/Edit';
const { width } = Dimensions.get('window');

class MyOnlinePostsScreen extends React.Component<any, any> {
  flatListRef: any;
  getNextPosts: any;
  constructor(p: any) {
    super(p);
    this.getNextPosts = debounce(getNextPosts, 100);
    this.state = {
      refreshing: false,
      isMenuModalVisible: false,
      isEditModalVisible: false,
      isMessageVisible: false
    };
  }

  selectePost = (post: any, word: any, lang: any) => {
    this.props.navigation.navigate('ItemScreen', {
      post,
      word,
      lang,
      myItem: true
    });
  };

  showMenuModal = (post: any) => {
    this.setState({ isMenuModalVisible: true, modalPost: post });
  };
  hideMenuModal = () => {
    this.setState({ isMenuModalVisible: false, modalPost: null });
  };
  showEditModal = () => {
    this.setState({ isEditModalVisible: true });
  };
  hideEditModal = () => {
    this.setState({ isEditModalVisible: false });
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

  render() {
    const { lang, words } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Menu
          post={this.state.modalPost}
          deletePost={this.props.deletePost}
          editClassifieds={this.props.editClassifieds}
          isMenuModalVisible={this.state.isMenuModalVisible}
          hideMenuModal={this.hideMenuModal}
          showEditModal={this.showEditModal}
          showMessageModal={this.showMessageModal}
          word={words}
          lang={lang}
        />
        <Edit
          isEditModalVisible={this.state.isEditModalVisible}
          editClassifieds={this.props.editClassifieds}
          hideEditModal={this.hideEditModal}
          word={words}
          lang={lang}
        />
        <Message
          isVisible={this.state.isMessageVisible}
          title={words.successadded}
          icon="ios-checkmark-circle"
          lang={lang}
          width={width}
          height={120}
        />
        <Query
          query={getMyPosts}
          variables={{ islive: true }}
          fetchPolicy="network-only"
        >
          {({ loading, error, data, fetchMore, refetch }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              console.log(`Error!: ${error}`);
            }
            const { posts } = data.getMyPosts;
            const rPosts = readyUserPosts(posts, 200, 79, lang);
            return (
              <MasonryList
                ref={(ref: any) => {
                  this.flatListRef = ref;
                }}
                onRefresh={() => refetch()}
                onEndReached={() =>
                  this.getNextPosts(data, fetchMore, 'getMyPosts', {
                    islive: true
                  })
                }
                refreshing={this.state.refreshing}
                data={rPosts}
                renderItem={({ item }: any) => (
                  <ItemOwnerView
                    offline={false}
                    post={item}
                    navigation={this.props.navigation}
                    editClassifieds={this.props.editClassifieds}
                    deletePost={this.props.deletePost}
                    selectePost={this.selectePost}
                    showMenuModal={this.showMenuModal}
                    word={words}
                    lang={lang}
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
  graphql(editClassifieds, {
    name: 'editClassifieds'
  })(
    graphql(deletePost, {
      name: 'deletePost'
    })(MyOnlinePostsScreen)
  )
);

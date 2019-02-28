import * as React from 'react';
import { View } from 'react-native';
import { Query, graphql } from 'react-apollo';
import getPost from '../../graphql/query/getPost';
import { Loading } from '../../componenets';
import { readyPost } from '../../utils';
import ItemView from '../../componenets/ItemScreen/ItemView';
import { connect } from 'react-redux';
import favoritePost from '../../graphql/mutation/favoritePost';
import unFavoritePost from '../../graphql/mutation/unFavoritePost';
import createComment from '../../graphql/mutation/createComment';
import editClassifieds from '../../graphql/mutation/editClassifieds';
import deletePost from '../../graphql/mutation/deletePost';
import ItemHeader from '../../componenets/ItemScreen/ItemHeader';
class ItemScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
  render() {
    const post = this.props.navigation.getParam('post');
    const postId = this.props.navigation.getParam('postId');
    const word = this.props.navigation.getParam('word');
    const lang = this.props.navigation.getParam('lang');
    const isRTL = this.props.navigation.getParam('isRTL');
    const fav = this.props.navigation.getParam('fav');
    const myItem = this.props.navigation.getParam('myItem');
    const live = this.props.navigation.getParam('live');
    if (post) {
      return (
        <ItemView
          post={post}
          postId={post.id ? post.id : post._id}
          word={word}
          lang={lang}
          isRTL={isRTL}
          fav={fav}
          myItem={myItem}
          live={live}
          navigation={this.props.navigation}
          createComment={this.props.createComment}
          editClassifieds={this.props.editClassifieds}
          deletePost={this.props.deletePost}
          favoritePost={this.props.favoritePost}
          unFavoritePost={this.props.unFavoritePost}
          user={this.props.user}
          isAuthenticated={this.props.isAuthenticated}
        />
      );
    } else {
      return (
        <Query query={getPost} variables={{ postId }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              console.log(error);
            }

            if (!data.getPost.data) {
              return (
                <ItemHeader
                  title="not found"
                  navigation={this.props.navigation}
                />
              );
            }
            const getedPost = readyPost(data.getPost.data, lang);
            return (
              <ItemView
                post={getedPost}
                postId={getedPost.id}
                word={word}
                lang={lang}
                isRTL={isRTL}
                fav={fav}
                myItem={myItem}
                live={live}
                editClassifieds={this.props.editClassifieds}
                deletePost={this.props.deletePost}
                navigation={this.props.navigation}
                createComment={this.props.createComment}
                favoritePost={this.props.favoritePost}
                unFavoritePost={this.props.unFavoritePost}
                user={this.props.user}
                isAuthenticated={this.props.isAuthenticated}
              />
            );
          }}
        </Query>
      );
    }
  }
}

const mapStateToProps = (state: any) => ({
  lang: state.glob.languageName,
  words: state.glob.language.words,
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(
  graphql(createComment, {
    name: 'createComment'
  })(
    graphql(favoritePost, {
      name: 'favoritePost',
      options: { refetchQueries: ['getMyFavoritePosts'] }
    })(
      graphql(unFavoritePost, {
        name: 'unFavoritePost',
        options: { refetchQueries: ['getMyFavoritePosts'] }
      })(
        graphql(editClassifieds, {
          name: 'editClassifieds',
          options: { refetchQueries: ['getTimeLine', 'getMyPosts'] }
        })(
          graphql(deletePost, {
            name: 'deletePost',
            options: { refetchQueries: ['getTimeLine', 'getMyPosts'] }
          })(ItemScreen)
        )
      )
    )
  )
);

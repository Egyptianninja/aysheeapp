import * as React from 'react';
import { Query, graphql } from 'react-apollo';
import getPost from '../../graphql/query/getPost';
import { Loading } from '../../componenets';
import { readyPost } from '../../utils';
import ItemScreenView from './ItemScreenView';
import { connect } from 'react-redux';
import favoritePost from '../../graphql/mutation/favoritePost';
import unFavoritePost from '../../graphql/mutation/unFavoritePost';
import createComment from '../../graphql/mutation/createComment';
class ItemScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
  render() {
    const post = this.props.navigation.getParam('post');
    const postId = this.props.navigation.getParam('postId');
    const word = this.props.navigation.getParam('word');
    const lang = this.props.navigation.getParam('lang');
    const fav = this.props.navigation.getParam('fav');
    if (post) {
      return (
        <ItemScreenView
          post={post}
          word={word}
          lang={lang}
          fav={fav}
          navigation={this.props.navigation}
          createComment={this.props.createComment}
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
            const getedPost = readyPost(data.getPost.data, lang);
            return (
              <ItemScreenView
                post={getedPost}
                word={word}
                lang={lang}
                fav={fav}
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
      name: 'favoritePost'
    })(
      graphql(unFavoritePost, {
        name: 'unFavoritePost'
      })(ItemScreen)
    )
  )
);

import * as React from 'react';
import { graphql, Query } from 'react-apollo';
import { connect } from 'react-redux';
import { Loading } from '../../componenets';
import ItemHeader from '../../componenets/ItemScreen/ItemHeader';
import ItemView from '../../componenets/ItemScreen/ItemView';
import createComment from '../../graphql/mutation/createComment';
import deletePost from '../../graphql/mutation/deletePost';
import editClassifieds from '../../graphql/mutation/editClassifieds';
import favoritePost from '../../graphql/mutation/favoritePost';
import unFavoritePost from '../../graphql/mutation/unFavoritePost';
import getPost from '../../graphql/query/getPost';
import { readyPost } from '../../utils';
import updateMyQty from '../../graphql/mutation/updateMyQty';
import { updateUser } from '../../store/actions/userAtions';
import dislikePost from '../../graphql/mutation/dislikePost';
import likePost from '../../graphql/mutation/likePost';
import { addFav, saveFav, addLike } from '../../store/actions/globActions';

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

    const myItem = post
      ? this.props.isAuthenticated
        ? this.props.user._id === post.userId
        : null
      : null;

    const fav = this.props.navigation.getParam('fav');
    const live = this.props.navigation.getParam('live');
    if (post) {
      return (
        <ItemView
          post={post}
          postId={post.id ? post.id : post._id}
          word={word}
          isRTL={isRTL}
          lang={lang}
          fav={fav}
          myItem={myItem}
          live={live}
          addLike={this.props.addLike}
          likes={this.props.likes}
          favs={this.props.favs}
          dislikePost={this.props.dislikePost}
          likePost={this.props.likePost}
          addFav={this.props.addFav}
          saveFav={this.props.saveFav}
          unFavoritePost={this.props.unFavoritePost}
          favoritePost={this.props.favoritePost}
          navigation={this.props.navigation}
          createComment={this.props.createComment}
          editClassifieds={this.props.editClassifieds}
          deletePost={this.props.deletePost}
          user={this.props.user}
          isAuthenticated={this.props.isAuthenticated}
          updateUser={this.props.updateUser}
          updateMyQty={this.props.updateMyQty}
        />
      );
    } else {
      return (
        <Query query={getPost} variables={{ postId }}>
          {({ loading, error, data }: any) => {
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
            const ismyItem = getedPost
              ? this.props.isAuthenticated
                ? this.props.user._id === getedPost.userId
                : null
              : null;
            return (
              <ItemView
                post={getedPost}
                postId={getedPost.id}
                word={word}
                lang={lang}
                isRTL={isRTL}
                fav={fav}
                myItem={ismyItem}
                live={live}
                addLike={this.props.addLike}
                likes={this.props.likes}
                favs={this.props.favs}
                dislikePost={this.props.dislikePost}
                likePost={this.props.likePost}
                addFav={this.props.addFav}
                saveFav={this.props.saveFav}
                unFavoritePost={this.props.unFavoritePost}
                favoritePost={this.props.favoritePost}
                editClassifieds={this.props.editClassifieds}
                deletePost={this.props.deletePost}
                navigation={this.props.navigation}
                createComment={this.props.createComment}
                user={this.props.user}
                isAuthenticated={this.props.isAuthenticated}
                updateUser={this.props.updateUser}
                updateMyQty={this.props.updateMyQty}
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
  isRTL: state.glob.isRTL,
  words: state.glob.language.words,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
  likes: state.glob.likes,
  favs: state.glob.favs,
  favoorites: state.glob.favoorites,
  categoryIds: state.glob.categoryIds
});

export default connect(
  mapStateToProps,
  { updateUser, addLike, addFav, saveFav }
)(
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
          name: 'editClassifieds'
        })(
          graphql(deletePost, {
            name: 'deletePost'
          })(
            graphql(updateMyQty, {
              name: 'updateMyQty',
              options: { refetchQueries: ['getUserPosts'] }
            })(
              graphql(dislikePost, {
                name: 'dislikePost'
              })(
                graphql(likePost, {
                  name: 'likePost'
                })(ItemScreen)
              )
            )
          )
        )
      )
    )
  )
);

import gql from "graphql-tag";

export default gql`
  mutation unFavoritePost($postId: String!) {
    unFavoritePost(postId: $postId) {
      ok
      message
      error
    }
  }
`;

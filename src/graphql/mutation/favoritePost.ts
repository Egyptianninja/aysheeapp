import gql from "graphql-tag";

export default gql`
  mutation favoritePost($postId: String!) {
    favoritePost(postId: $postId) {
      ok
      message
      error
    }
  }
`;

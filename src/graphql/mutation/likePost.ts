import gql from 'graphql-tag';

export default gql`
  mutation likePost($postId: String!) {
    likePost(postId: $postId) {
      ok
      message
      error
    }
  }
`;

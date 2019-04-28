import gql from 'graphql-tag';

export default gql`
  mutation dislikePost($postId: String!) {
    dislikePost(postId: $postId) {
      ok
      message
      error
    }
  }
`;

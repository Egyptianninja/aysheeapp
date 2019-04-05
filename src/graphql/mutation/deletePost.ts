import gql from 'graphql-tag';

export default gql`
  mutation deletePost($postId: String!) {
    deletePost(postId: $postId) {
      ok
      message
      error
    }
  }
`;

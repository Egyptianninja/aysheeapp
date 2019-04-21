import gql from 'graphql-tag';

export default gql`
  mutation publishControlPost($postId: String!) {
    publishControlPost(postId: $postId) {
      ok
      message
      error
    }
  }
`;

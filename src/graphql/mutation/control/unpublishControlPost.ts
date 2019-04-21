import gql from 'graphql-tag';

export default gql`
  mutation unpublishControlPost($postId: String!) {
    unpublishControlPost(postId: $postId) {
      ok
      message
      error
    }
  }
`;

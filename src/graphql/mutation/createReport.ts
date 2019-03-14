import gql from 'graphql-tag';

export default gql`
  mutation createReport($postId: String!, $postOwnerId: String, $body: String) {
    createReport(postId: $postId, postOwnerId: $postOwnerId, body: $body) {
      ok
      message
      error
    }
  }
`;

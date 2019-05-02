import gql from 'graphql-tag';

export default gql`
  mutation deleteComment($commentId: String!) {
    deleteComment(commentId: $commentId) {
      ok
      message
      error
    }
  }
`;

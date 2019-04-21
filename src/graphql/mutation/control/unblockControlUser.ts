import gql from 'graphql-tag';

export default gql`
  mutation unblockControlUser($userId: String!) {
    unblockControlUser(userId: $userId) {
      ok
      message
      error
    }
  }
`;

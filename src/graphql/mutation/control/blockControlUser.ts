import gql from 'graphql-tag';

export default gql`
  mutation blockControlUser($userId: String!) {
    blockControlUser(userId: $userId) {
      ok
      message
      error
    }
  }
`;

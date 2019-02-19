import gql from 'graphql-tag';

export default gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      _id
      name
      uniquename
      avatar
      offersLimit
      onlineLimit
      offlineLimit
      location {
        lat
        lon
      }
      postsQty
    }
  }
`;

import gql from 'graphql-tag';

export default gql`
  query getMyNotifications($cursor: Int) {
    getMyNotifications(cursor: $cursor) {
      ok
      data {
        _id
        title
        body
        data
        createdAt
      }
      error
    }
  }
`;

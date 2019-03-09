import gql from 'graphql-tag';

export default gql`
  query getPostComments($postId: String!, $cursor: Int) {
    getPostComments(postId: $postId, cursor: $cursor) {
      _id
      body
      replayto {
        id
        name
        body
      }
      updatedAt
      user {
        _id
        name
        uniquename
        phone
        email
        avatar
        about
        color
        addressCountry
        addressCity
        website
        isstore
        offersqty
        onlineqty
        company
        tel
        fax
        mob
      }
    }
  }
`;

import gql from 'graphql-tag';

export default gql`
  subscription commentAdded($postId: String!) {
    commentAdded(postId: $postId) {
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

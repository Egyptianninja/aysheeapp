import gql from 'graphql-tag';

export default gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      _id
      name
      uniquename
      showcontact
      phone
      email
      avatar
      about
      color
      addressCountry
      addressCity
      website
      isstore
      branches {
        name
        location {
          lat
          lon
        }
      }
      offersqty
      onlineqty
      company
      tel
      fax
      mob
      location {
        lat
        lon
      }
    }
  }
`;

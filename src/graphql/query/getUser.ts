import gql from 'graphql-tag';

export default gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      _id
      name
      uniquename
      phone
      email
      avatar
      about
      headerPhoto
      color
      country
      city
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

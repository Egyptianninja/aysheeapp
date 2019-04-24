import gql from 'graphql-tag';

export default gql`
  query getShopsWithOffers {
    getShopsWithOffers {
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
      offersqty
      onlineqty
      company
      tel
      fax
      mob
      branches {
        name
        location {
          lat
          lon
        }
      }
      location {
        lat
        lon
      }
    }
  }
`;

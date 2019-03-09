import gql from 'graphql-tag';

export default gql`
  query getShopsWithOffers {
    getShopsWithOffers {
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
      location {
        lat
        lon
      }
    }
  }
`;

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
      headerPhoto
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
      offers {
        _id
        title
        phone
        body
        photos
        start
        end
        isrtl
        trueLocation {
          lat
          lon
        }
        userId
      }
    }
  }
`;

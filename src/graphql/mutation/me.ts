import gql from 'graphql-tag';

export default gql`
  mutation me {
    me {
      ok
      data {
        _id
        uniquename
        phone
        email
        name
        about
        isstore
        offersqty
        onlineqty
        offlineqty
        lastoffer
        offersLimit
        onlineLimit
        offlineLimit
        avatar
        color
        lang
        country
        city
        addressCountry
        addressCity
        website
        verified
        tel
        fax
        mob
        location {
          lon
          lat
        }
      }
    }
  }
`;
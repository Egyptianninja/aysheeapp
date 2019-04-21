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
        passcode
        showcontact
        addressEmail
        name
        about
        isstore
        offersqty
        onlineqty
        offlineqty
        lastoffer
        frontqty
        offersLimit
        onlineLimit
        offlineLimit
        frontLimit
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

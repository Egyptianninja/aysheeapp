import gql from 'graphql-tag';

export default gql`
  mutation smsLoginWithPhone($phone: String!) {
    smsLoginWithPhone(phone: $phone) {
      ok
      token
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
        headerPhoto
        color
        lang
        country
        city
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
      error
    }
  }
`;

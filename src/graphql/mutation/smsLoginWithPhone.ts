import gql from 'graphql-tag';

export default gql`
  mutation smsLoginWithPhone($phone: String, $email: String) {
    smsLoginWithPhone(phone: $phone, email: $email) {
      ok
      token
      data {
        _id
        uniquename
        phone
        email
        addressEmail
        name
        about
        isstore
        offersqty
        onlineqty
        offlineqty
        frontqty
        lastoffer
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
      error
    }
  }
`;

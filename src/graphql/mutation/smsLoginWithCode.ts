import gql from 'graphql-tag';

export default gql`
  mutation smsLoginWithCode(
    $phone: String
    $email: String
    $code: Int!
    $name: String
  ) {
    smsLoginWithCode(phone: $phone, email: $email, code: $code, name: $name) {
      ok
      token
      data {
        _id
        uniquename
        isadmin
        passcode
        showcontact
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

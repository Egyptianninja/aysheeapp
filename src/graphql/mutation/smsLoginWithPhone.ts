import gql from 'graphql-tag';

export default gql`
  mutation smsLoginWithPhone($phone: String, $email: String, $passcode: Int) {
    smsLoginWithPhone(phone: $phone, email: $email, passcode: $passcode) {
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
        branches {
          name
          location {
            lat
            lon
          }
        }
        location {
          lon
          lat
        }
      }
      error
    }
  }
`;

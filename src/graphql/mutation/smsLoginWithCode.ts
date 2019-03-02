import gql from 'graphql-tag';

export default gql`
  mutation smsLoginWithCode($phone: String!, $code: Int!, $name: String) {
    smsLoginWithCode(phone: $phone, code: $code, name: $name) {
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
        avatar
        headerPhoto
        color
        lang
        country
        city
        website
        verified
      }
      error
    }
  }
`;

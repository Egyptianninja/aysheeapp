import gql from "graphql-tag";

export default gql`
  mutation fastLoginConfirm($email: String!, $code: Int!) {
    fastLoginConfirm(email: $email, code: $code) {
      ok
      token
      data {
        _id
        email
        name
        about
        isstore
        avatar
        headerPhoto
        country
        city
        phone
        company
        website
        verified
      }
      error
    }
  }
`;

import gql from 'graphql-tag';

export default gql`
  mutation smsRequestCode($phone: String, $email: String) {
    smsRequestCode(phone: $phone, email: $email) {
      ok
      message
      error
    }
  }
`;

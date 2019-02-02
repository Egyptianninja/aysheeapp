import gql from "graphql-tag";

export default gql`
  mutation smsRequestCode($phone: String!) {
    smsRequestCode(phone: $phone) {
      ok
      message
      error
    }
  }
`;

import gql from "graphql-tag";

export default gql`
  mutation fastLoginCode($email: String!) {
    fastLoginCode(email: $email) {
      ok
      message
      error
    }
  }
`;

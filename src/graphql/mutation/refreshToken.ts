import gql from "graphql-tag";

export default gql`
  mutation refreshToken {
    refreshToken {
      ok
      token
    }
  }
`;

import gql from "graphql-tag";

export default gql`
  mutation logoutFromAll {
    logoutFromAll {
      ok
      message
      error
    }
  }
`;

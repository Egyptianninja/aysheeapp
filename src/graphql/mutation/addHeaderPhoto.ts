import gql from "graphql-tag";

export default gql`
  mutation addHeaderPhoto($headerPhoto: String!) {
    addHeaderPhoto(headerPhoto: $headerPhoto) {
      ok
      message
      error
    }
  }
`;

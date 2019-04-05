import gql from 'graphql-tag';

export default gql`
  mutation addUniqueName($uniquename: String!) {
    addUniqueName(uniquename: $uniquename) {
      ok
      message
      error
    }
  }
`;

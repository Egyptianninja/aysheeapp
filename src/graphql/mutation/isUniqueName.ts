import gql from "graphql-tag";

export default gql`
  mutation isUniqueName($name: String!) {
    isUniqueName(name: $name)
  }
`;

import gql from 'graphql-tag';

export default gql`
  mutation addAvatar($avatar: String!) {
    addAvatar(avatar: $avatar) {
      ok
      message
      error
    }
  }
`;

import gql from 'graphql-tag';

export default gql`
  mutation showMyContact($showcontact: Boolean) {
    showMyContact(showcontact: $showcontact) {
      ok
      message
      error
    }
  }
`;

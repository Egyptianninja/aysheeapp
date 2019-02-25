import gql from 'graphql-tag';

export default gql`
  mutation getMyCountry {
    getMyCountry {
      country
      city
    }
  }
`;

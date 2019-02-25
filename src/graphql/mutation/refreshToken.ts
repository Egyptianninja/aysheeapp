import gql from 'graphql-tag';

export default gql`
  mutation refreshToken($country: String, $city: String) {
    refreshToken(country: $country, city: $city) {
      ok
      token
    }
  }
`;

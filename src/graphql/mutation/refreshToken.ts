import gql from 'graphql-tag';

export default gql`
  mutation refreshToken($country: String, $city: String, $lang: String) {
    refreshToken(country: $country, city: $city, lang: $lang) {
      ok
      token
    }
  }
`;

import gql from 'graphql-tag';

export default gql`
  mutation updateProfile(
    $name: String
    $about: String
    $avatar: String
    $headerPhoto: String
    $color: String
    $lang: String
    $country: String
    $city: String
    $email: String
    $website: String
  ) {
    updateProfile(
      name: $name
      about: $about
      avatar: $avatar
      headerPhoto: $headerPhoto
      color: $color
      lang: $lang
      country: $country
      city: $city
      email: $email
      website: $website
    ) {
      ok
      message
      error
    }
  }
`;

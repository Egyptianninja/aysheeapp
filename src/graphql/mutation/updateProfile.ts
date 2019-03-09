import gql from 'graphql-tag';

export default gql`
  mutation updateProfile(
    $name: String
    $about: String
    $avatar: String
    $color: String
    $email: String
    $website: String
    $addressCountry: String
    $addressCity: String
    $tel: String
    $fax: String
    $mob: String
    $location: LocationInput
  ) {
    updateProfile(
      name: $name
      about: $about
      avatar: $avatar
      color: $color
      email: $email
      website: $website
      addressCountry: $addressCountry
      addressCity: $addressCity
      tel: $tel
      fax: $fax
      mob: $mob
      location: $location
    ) {
      ok
      message
      data {
        _id
        uniquename
        phone
        email
        name
        about
        isstore
        offersqty
        onlineqty
        offlineqty
        lastoffer
        offersLimit
        onlineLimit
        offlineLimit
        avatar
        color
        lang
        country
        city
        addressCountry
        addressCity
        website
        verified
        tel
        fax
        mob
        location {
          lon
          lat
        }
      }
      error
    }
  }
`;

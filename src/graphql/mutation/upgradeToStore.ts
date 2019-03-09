import gql from 'graphql-tag';

export default gql`
  mutation upgradeToStore(
    $name: String
    $email: String
    $website: String
    $about: String
    $avatar: String
    $headerPhoto: String
    $color: String
    $tel: String
    $fax: String
    $mob: String
    $location: LocationInput
  ) {
    upgradeToStore(
      name: $name
      email: $email
      website: $website
      about: $about
      avatar: $avatar
      headerPhoto: $headerPhoto
      color: $color
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
        headerPhoto
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

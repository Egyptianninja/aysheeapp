import gql from 'graphql-tag';

export default gql`
  mutation upgradeToStore(
    $name: String
    $about: String
    $avatar: String
    $color: String
    $addressEmail: String
    $website: String
    $addressCountry: String
    $addressCity: String
    $tel: String
    $fax: String
    $mob: String
    $location: LocationInput
  ) {
    upgradeToStore(
      name: $name
      about: $about
      avatar: $avatar
      color: $color
      addressEmail: $addressEmail
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
        isadmin
        passcode
        showcontact
        phone
        email
        addressEmail
        name
        about
        isstore
        offersqty
        onlineqty
        offlineqty
        frontqty
        lastoffer
        offersLimit
        onlineLimit
        offlineLimit
        frontLimit
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

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
    $branches: [BranchInput]
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
      branches: $branches
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
        branches {
          name
          location {
            lat
            lon
          }
        }
        location {
          lon
          lat
        }
      }
      error
    }
  }
`;

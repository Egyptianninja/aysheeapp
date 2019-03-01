import gql from 'graphql-tag';

export default gql`
  mutation updatePost(
    $postId: String!
    $title: String
    $body: String
    $updates: Int
    $islive: Boolean
    $isoffer: Boolean
    $isnew: Boolean
    $issale: Boolean
    $kind: NameInput
    $photos: [String]
    $price: Float
    $currency: String
    $phone: String
    $addressCity: String
    $addressArea: String
    $iswarranty: Boolean
    $trueLocation: LocationInput
    $isforman: Boolean
    $isjobreq: Boolean
    $isservicereq: Boolean
    $areaunit: String
    $realestate: NameInput
    $space: Int
    $rooms: Int
    $bathrooms: Int
    $isfurnishered: Boolean
    $eBrand: NameInput
    $brand: NameInput
    $subBrand: NameInput
    $year: Int
    $km: Int
    $color: String
    $jobTitle: String
    $jobIndustry: String
    $isfullTime: Boolean
    $education: String
    $experience: String
    $salary: Int
    $service: NameInput
  ) {
    updatePost(
      postId: $postId
      title: $title
      body: $body
      updates: $updates
      islive: $islive
      isoffer: $isoffer
      isnew: $isnew
      issale: $issale
      kind: $kind
      photos: $photos
      price: $price
      currency: $currency
      phone: $phone
      addressCity: $addressCity
      addressArea: $addressArea
      iswarranty: $iswarranty
      trueLocation: $trueLocation
      isforman: $isforman
      isjobreq: $isjobreq
      isservicereq: $isservicereq
      areaunit: $areaunit
      realestate: $realestate
      space: $space
      rooms: $rooms
      bathrooms: $bathrooms
      isfurnishered: $isfurnishered
      eBrand: $eBrand
      brand: $brand
      subBrand: $subBrand
      year: $year
      km: $km
      color: $color
      jobTitle: $jobTitle
      jobIndustry: $jobIndustry
      isfullTime: $isfullTime
      education: $education
      experience: $experience
      salary: $salary
      service: $service
    ) {
      ok
      message
      error
    }
  }
`;

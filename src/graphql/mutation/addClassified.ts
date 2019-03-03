import gql from 'graphql-tag';

export default gql`
  mutation createPost(
    $title: String!
    $body: String
    $category: NameInput
    $isoffer: Boolean
    $kind: NameInput
    $isrtl: Boolean
    $photos: [String]
    $price: Float
    $currency: String
    $phone: String
    $isnew: Boolean
    $issale: Boolean
    $iswarranty: Boolean
    $addressCity: String
    $addressArea: String
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
    createPost(
      title: $title
      body: $body
      category: $category
      isoffer: $isoffer
      kind: $kind
      isrtl: $isrtl
      photos: $photos
      price: $price
      currency: $currency
      phone: $phone
      isnew: $isnew
      issale: $issale
      iswarranty: $iswarranty
      addressCity: $addressCity
      addressArea: $addressArea
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

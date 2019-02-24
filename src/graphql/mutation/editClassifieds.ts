import gql from 'graphql-tag';

export default gql`
  mutation updatePost(
    $postId: String!
    $isoffer: Boolean
    $price: Float
    $currency: String
    $phone: String
    $islive: Boolean
    $trueLocation: [LocationInput]
    $updates: Int
    $isnew: Boolean
    $issale: Boolean
    $iswarranty: Boolean
    $isforman: Boolean
    $areaunit: String
    $space: Int
    $rooms: Int
    $bathrooms: Int
    $isfurnishered: Boolean
    $year: Int
    $km: Int
    $color: String
    $jobTitle: String
    $jobIndustry: String
    $isfullTime: Boolean
    $education: String
    $experience: String
    $salary: Int
  ) {
    updatePost(
      postId: $postId
      isoffer: $isoffer
      price: $price
      currency: $currency
      phone: $phone
      islive: $islive
      trueLocation: $trueLocation
      updates: $updates
      isnew: $isnew
      issale: $issale
      iswarranty: $iswarranty
      isforman: $isforman
      areaunit: $areaunit
      space: $space
      rooms: $rooms
      bathrooms: $bathrooms
      isfurnishered: $isfurnishered
      year: $year
      km: $km
      color: $color
      jobTitle: $jobTitle
      jobIndustry: $jobIndustry
      isfullTime: $isfullTime
      education: $education
      experience: $experience
      salary: $salary
    ) {
      ok
      message
      error
    }
  }
`;

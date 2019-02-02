import gql from "graphql-tag";

export default gql`
  mutation updatePost(
    $postId: String!
    $isoffer: Boolean
    $price: Float
    $currency: String
    $phone: String
    $islive: Boolean
    $trueLocation: LocationInput
    $updates: Int
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
    ) {
      ok
      message
      error
    }
  }
`;

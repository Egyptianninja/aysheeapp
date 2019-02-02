import gql from "graphql-tag";

export default gql`
  mutation createComment(
    $postId: String!
    $body: String!
    $ownerId: String!
    $postTitle: String
    $userName: String
  ) {
    createComment(
      postId: $postId
      body: $body
      ownerId: $ownerId
      postTitle: $postTitle
      userName: $userName
    ) {
      _id
      body
      updatedAt
    }
  }
`;

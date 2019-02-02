import gql from "graphql-tag";

export default gql`
  mutation createNotification(
    $userId: String!
    $title: String!
    $body: String!
    $postId: String
    $senderId: String
  ) {
    createNotification(
      userId: $userId
      title: $title
      body: $body
      postId: $postId
      senderId: $senderId
    ) {
      ok
      message
      error
    }
  }
`;

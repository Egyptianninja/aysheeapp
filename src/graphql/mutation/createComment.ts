import gql from 'graphql-tag';

export default gql`
  mutation createComment(
    $postId: String!
    $body: String!
    $ownerId: String!
    $replayto: CommentRepalyInput
    $postTitle: String
    $userName: String
    $avatar: String
    $uniquename: String
    $color: String
  ) {
    createComment(
      postId: $postId
      body: $body
      ownerId: $ownerId
      replayto: $replayto
      postTitle: $postTitle
      userName: $userName
      avatar: $avatar
      uniquename: $uniquename
      color: $color
    ) {
      _id
      body
      updatedAt
    }
  }
`;

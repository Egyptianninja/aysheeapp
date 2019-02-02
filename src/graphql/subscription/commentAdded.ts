import gql from "graphql-tag";

export default gql`
  subscription commentAdded($postId: String!) {
    commentAdded(postId: $postId) {
      _id
      body
      updatedAt
      user {
        _id
        name
        avatar
        phone
      }
    }
  }
`;

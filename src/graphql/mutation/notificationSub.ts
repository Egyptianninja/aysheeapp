import gql from "graphql-tag";

export default gql`
  mutation notificationSub($userId: String!, $pushToken: String!) {
    notificationSub(userId: $userId, pushToken: $pushToken) {
      ok
      message
      error
    }
  }
`;

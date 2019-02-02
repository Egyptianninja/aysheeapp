import * as React from "react";
import { View } from "react-native";
import { Query } from "react-apollo";
import getPostComments from "../../../graphql/query/getPostComments";
import commentAdded from "../../../graphql/subscription/commentAdded";
import ItemComment from "./ItemComment";

class ListComments extends React.Component<any, any> {
  render() {
    const { postId } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 5 }}>
        <Query query={getPostComments} variables={{ postId }}>
          {({ subscribeToMore, ...result }) => (
            <ItemComment
              {...result}
              lang={this.props.lang}
              subscribeToNewComments={() =>
                subscribeToMore({
                  document: commentAdded,
                  variables: { postId },
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) {
                      return prev;
                    }
                    const newFeedItem = subscriptionData.data.commentAdded;
                    return {
                      ...prev,
                      getPostComments: [newFeedItem, ...prev.getPostComments]
                    };
                  }
                })
              }
            />
          )}
        </Query>
      </View>
    );
  }
}

export default ListComments;

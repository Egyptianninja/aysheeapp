import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MessageBubble from './MessageBubble';

class ItemComment extends React.PureComponent<any, any> {
  unsubscribe: any;
  componentDidMount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.unsubscribe = this.props.subscribeToNewComments();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (!this.props.data.getPostComments) {
      return <View />;
    }

    const messages: any = [];
    const comments = this.props.data.getPostComments.sort((a: any, b: any) => {
      const keyA = new Date(a.updatedAt);
      const keyB = new Date(b.updatedAt);
      if (keyA < keyB) {
        return -1;
      }
      if (keyA > keyB) {
        return 1;
      }
      return 0;
    });
    comments.forEach((message: any) => {
      messages.push(
        <MessageBubble
          navigation={this.props.navigation}
          hideCommentsModal={this.props.hideCommentsModal}
          deleteComment={this.props.deleteComment}
          isAuthenticated={this.props.isAuthenticated}
          user={this.props.user}
          words={this.props.words}
          lang={this.props.lang}
          isRTL={this.props.isRTL}
          message={message}
          key={message._id}
          replayComment={this.props.replayComment}
          width={this.props.width}
        />
      );
    });

    return (
      <View
        style={{ paddingBottom: 4, borderTopColor: '#eee', borderTopWidth: 1 }}
      >
        <TouchableOpacity
          onPress={async () => {
            await this.props.updateCursor(comments.length);
            this.props.fetchMoreComments();
          }}
          style={{
            padding: 5,
            borderRadius: 10,
            margin: 5,
            width: 150,
            backgroundColor: '#fff',
            alignItems: 'center',
            alignSelf: 'center'
          }}
        >
          {messages.lenght > 0 && (
            <Text style={{ color: '#7678ED' }}>
              {this.props.word.morecomments}
            </Text>
          )}
        </TouchableOpacity>
        {messages}
      </View>
    );
  }
}

export default ItemComment;

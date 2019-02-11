import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
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
          words={this.props.words}
          lang={this.props.lang}
          message={message}
          key={message._id}
          replayComment={this.props.replayComment}
          width={this.props.width}
        />
      );
    });

    return (
      <View
        style={{ paddingBottom: 4, borderTopColor: '#ddd', borderTopWidth: 1 }}
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
          <Text style={{ color: '#6FA7D5' }}>
            {this.props.word.morecomments}
          </Text>
        </TouchableOpacity>
        {messages}
      </View>
    );
  }
}

export default ItemComment;

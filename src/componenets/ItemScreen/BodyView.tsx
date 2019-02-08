import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Menu from './Menu';

export default class BodyView extends React.Component<any, any> {
  state = {
    fav: false
  };
  render() {
    const {
      title,
      body,
      time,
      isrtl,
      favoritePost,
      postId,
      post,
      word,
      lang
    } = this.props;
    return (
      <View
        style={{
          paddingVertical: 15,
          justifyContent: 'space-between'
        }}
      >
        <View
          style={{
            flexDirection: isrtl ? 'row-reverse' : 'row',
            justifyContent: 'space-between'
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#272727',
              writingDirection: isrtl ? 'rtl' : 'ltr'
            }}
          >
            {title}
          </Text>
          <Menu
            post={post}
            favoritePost={favoritePost}
            word={word}
            lang={lang}
          />
        </View>
        <View
          style={{
            padding: 5,
            marginBottom: 10
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: '#ababab',
              alignSelf: isrtl ? 'flex-end' : 'flex-start'
            }}
          >
            {time}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              color: '#272727',
              writingDirection: isrtl ? 'rtl' : 'ltr'
            }}
          >
            {body.trim()}
          </Text>
        </View>
      </View>
    );
  }
}

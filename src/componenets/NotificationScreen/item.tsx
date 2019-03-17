import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { since, rtlos } from '../../utils';
import { AvatarCircle } from '../Avatar';

const Item = (props: any) => {
  const { item, lang, navigation, isRTL } = props;
  const time = since(item.createdAt, lang);
  const { postId, user } = JSON.parse(item.data);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems:
          rtlos() === 3 ? 'flex-start' : isRTL ? 'flex-end' : 'flex-start',

        padding: 5,
        marginHorizontal: 16,
        marginVertical: 5,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10
      }}
    >
      {user && <AvatarCircle user={user} size={40} />}

      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('ItemScreen', {
            postId,
            word: props.words,
            lang,
            isRTL
          })
        }
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems:
              rtlos() === 3 ? 'flex-start' : isRTL ? 'flex-end' : 'flex-start'
          }}
        >
          <Text
            style={{
              padding: 5,
              paddingTop: 10,
              fontWeight: 'bold'
            }}
          >
            {item.title}
          </Text>
          <View style={{ padding: 10 }}>
            <Text>{item.body}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View
        style={{
          position: 'absolute',
          top: 5,
          right: 0
        }}
      >
        <Text
          style={{
            color: '#999',
            fontSize: 12,
            paddingHorizontal: 15
          }}
        >
          {time}
        </Text>
      </View>
    </View>
  );
};

export default Item;

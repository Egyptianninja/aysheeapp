import * as React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, since } from '../../utils';

const Item = (props: any) => {
  const { item, lang, navigation } = props;
  const time = since(item.createdAt, lang);
  const postId = JSON.parse(item.data).postId;
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('ItemScreenById', {
          postId,
          word: props.words,
          lang
        })
      }
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: lang === 'ar' ? 'flex-end' : 'flex-start',
          padding: 10,
          marginHorizontal: 16,
          marginVertical: 8,
          borderColor: '#ddd',
          backgroundColor: '#f7f7f7',
          borderWidth: 1,
          borderRadius: 5
        }}
      >
        <View>
          <Text
            style={{
              paddingHorizontal: 10,
              fontWeight: 'bold'
            }}
          >
            {item.title}
          </Text>
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
        <View style={{ padding: 10, marginTop: 10 }}>
          <Text>{item.body}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  interContainer: {
    flex: 1,
    marginVertical: 5,
    paddingBottom: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#e5e5e5'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Item;

import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { StyleSheet, rtlos } from '../../utils';
import { PostImage } from './PostImage';

const ItemViewSearch = (props: any) => {
  const {
    post,
    post: {
      imageWidth,
      imageHeight,
      subTitle,
      body,
      time,
      isrtl: isPostRTL,
      uri,
      price,
      currency
    },
    lang,
    isRTL,
    word,
    selectePost
  } = props;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          selectePost(post, word, lang, isRTL);
        }}
        style={{ flexDirection: 'row' }}
      >
        <View style={styles.interContainer}>
          <View
            style={{
              paddingHorizontal: 10
            }}
          >
            {uri && (
              <View>
                <PostImage width={100} height={100} uri={uri} />
              </View>
            )}

            {!uri && (
              <View
                style={[
                  {
                    width: imageWidth - 2,
                    height: imageHeight,
                    backgroundColor: '#eee'
                  }
                ]}
              >
                <Text style={{ fontSize: 16 }}>{subTitle}</Text>
              </View>
            )}
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
              justifyContent: 'space-around'
            }}
          >
            <View>
              <Text style={{ color: '#555', fontSize: 16, fontWeight: 'bold' }}>
                {subTitle}
              </Text>
              <Text style={{ fontSize: 14 }}>{body.substring(0, 55)}</Text>
            </View>
            <View>
              {(price || price === 0) && (
                <View
                  style={{
                    flexDirection: rtlos() === 3 ? 'row-reverse' : 'row'
                  }}
                >
                  <Text
                    style={{
                      color: '#26A65B',
                      fontWeight: 'bold',
                      opacity: 0.9,
                      fontSize: 14
                    }}
                  >
                    {price.toLocaleString('en')}
                  </Text>
                  <Text
                    style={{
                      color: '#777',
                      paddingTop: 5,
                      fontSize: 10,
                      fontWeight: '200'
                    }}
                  >
                    {' '}
                    {currency}
                  </Text>
                </View>
              )}
              {!price && price !== 0 && (
                <View style={{ height: 16, width: 100 }} />
              )}
              <Text
                style={{
                  fontSize: 10,
                  color: '#ababab'
                }}
              >
                {time}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  interContainer: {
    flex: 1,
    marginVertical: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',

    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ItemViewSearch;

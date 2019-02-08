import * as React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import { StyleSheet } from '../../utils';
import { PostImage } from './PostImage';
import Menu from './Menu';

const ItemOwnerView = (props: any) => {
  const {
    offline,
    color,
    post,
    post: {
      imageWidth,
      imageHeight,
      subTitle,
      time,
      isrtl,
      uri,
      price,
      currency
    },
    selectePost,
    editClassifieds,
    word,
    lang,
    deletePost
  } = props;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 1
      }}
    >
      <View style={{ width: imageWidth }}>
        <TouchableWithoutFeedback
          onPress={() => {
            selectePost(post, word, lang);
          }}
        >
          <View style={styles.interContainer}>
            {uri && (
              <View style={styles.center}>
                <PostImage width={imageWidth} height={imageHeight} uri={uri} />
              </View>
            )}

            {!uri && (
              <View
                style={[
                  styles.center,
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

            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  height: 50,
                  padding: 5,
                  paddingTop: 5
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  {(price || price === 0) && (
                    <Text
                      style={{
                        color: '#26A65B',
                        fontWeight: 'bold',
                        opacity: 0.9,
                        fontSize: 14
                      }}
                    >
                      {currency} {price.toLocaleString('en')}
                    </Text>
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
                <View
                  style={{
                    flex: 1,
                    flexDirection: isrtl ? 'row-reverse' : 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text
                    style={{
                      color: '#555',
                      writingDirection: isrtl ? 'rtl' : 'ltr',
                      paddingTop: 5,
                      paddingHorizontal: 5
                    }}
                  >
                    {subTitle}
                  </Text>
                  <Menu
                    offline={offline}
                    post={post}
                    isrtl={isrtl}
                    editClassifieds={editClassifieds}
                    deletePost={deletePost}
                    word={word}
                    lang={lang}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
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

export default ItemOwnerView;

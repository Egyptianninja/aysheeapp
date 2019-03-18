import * as React from 'react';
import { Platform, Text, TouchableWithoutFeedback, View } from 'react-native';
import { StyleSheet, rtlos } from '../../utils';
import { MenuIcon } from './MenuIcon';
import { PostImage } from './PostImage';

const ItemViewSmall = (props: any) => {
  const {
    post,
    post: {
      imageWidth,
      imageHeight,
      subTitle,
      time,
      isrtl: isPostRTL,
      uri,
      price,
      currency
    },
    lang,
    isRTL,
    word,
    showMenuModal,
    selectePost
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
            selectePost(post, word, lang, isRTL);
          }}
          onLongPress={() => showMenuModal(post)}
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
                  height: 55,
                  padding: 5,
                  paddingTop: 5
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
                    justifyContent: 'space-between'
                  }}
                >
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
                <View
                  style={{
                    flex: 1,

                    alignSelf:
                      isPostRTL && Platform.OS !== 'android'
                        ? 'flex-end'
                        : 'auto'
                  }}
                >
                  <Text style={{ color: '#555', fontSize: 16 }}>
                    {subTitle}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <MenuIcon post={post} showMenuModal={showMenuModal} />
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
    borderColor: '#e5e5e5',
    backgroundColor: '#fff'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ItemViewSmall;

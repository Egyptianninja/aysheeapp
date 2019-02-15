import * as React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from '../../../utils';
import { PostImage } from './PostImage';
import { MenuIcon } from './MenuIcon';

const ItemView = (props: any) => {
  const {
    showMenuModal,
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
    word,
    lang
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
      {/* {post.trueLocation && (
        <View
          style={{
            position: 'absolute',
            left: 10,
            width: 20,
            hieght: 20,
            top: 10,
            zIndex: 120,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.2)'
          }}
        >
          <Ionicons name={'md-globe'} size={18} color="rgba(0, 0, 0, 0.6)" />
        </View>
      )} */}
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
                    backgroundColor: '#f1f1f1'
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
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  {(price || price === 0) && (
                    <View style={{ flexDirection: 'row' }}>
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
                    flexDirection: isrtl ? 'row-reverse' : 'row'
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
        <MenuIcon
          showMenuModal={showMenuModal}
          post={post}
          imageWidth={post.imageWidth}
          isrtl={lang === 'ar' ? true : false}
        />
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

export default ItemView;

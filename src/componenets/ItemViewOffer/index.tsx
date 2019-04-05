import * as React from 'react';
import { Platform, Text, TouchableWithoutFeedback, View } from 'react-native';
import { StyleSheet } from '../../utils';
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
    // handleonPressIn,
    // handleonPressOut,
    // pressed
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
          // onPressIn={() => handleonPressIn(post.id)}
          // onPressOut={() => handleonPressOut(post.id)}
          onPress={() => {
            // selectePost(post, word, lang, isRTL);
          }}
          onLongPress={() => showMenuModal(post)}
        >
          <View style={styles.interContainer}>
            {uri && (
              <View
                style={[
                  styles.center
                  // {
                  //   borderColor: pressed === post.id ? 'red' : undefined,
                  //   borderWidth: pressed === post.id ? 2 : undefined
                  // }
                ]}
              >
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
                  height: 20,
                  paddingTop: 5,
                  paddingHorizontal: 10
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection:
                      Platform.OS === 'android' ? 'row-reverse' : 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      flexDirection:
                        Platform.OS === 'android' ? 'row-reverse' : 'row'
                    }}
                  >
                    <Text
                      style={{
                        color: '#555',
                        fontSize: 10,
                        fontWeight: '200'
                      }}
                    >
                      {time}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#555'
                    }}
                  >
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
    backgroundColor: '#f1f1f1'
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
    // elevation: 5
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ItemViewSmall;

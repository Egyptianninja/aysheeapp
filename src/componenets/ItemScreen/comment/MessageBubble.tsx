import * as React from 'react';
import { Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, isArabic, since } from '../../../utils';
import { Avatar } from '../../Avatar';
export default class MessageBubble extends React.Component<any, any> {
  render() {
    const { message, lang, isRTL, width, words, isAuthenticated } = this.props;
    const uri = `http://res.cloudinary.com/arflon/image/upload/w_${100}/${
      message.user.avatar
    }`;

    const rtl = isArabic(message.body);
    const time = since(message.updatedAt, lang);

    return (
      <View>
        <View
          style={{
            flexDirection:
              isRTL && Platform.OS !== 'android' ? 'row-reverse' : 'row',
            padding: 10,
            borderRadius: 10
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (isAuthenticated) {
                const screen =
                  message.user._id === this.props.user._id
                    ? 'MyPostsScreen'
                    : 'UserProfileScreen';
                this.props.navigation.navigate(screen, { user: message.user });
              } else {
                this.props.navigation.navigate('UserProfileScreen', {
                  user: message.user
                });
              }
            }}
          >
            <View
              style={{
                width: 65,
                alignItems: 'center'
              }}
            >
              {!message.user.avatar && (
                <Avatar
                  name={
                    message.user.name
                      ? message.user.name
                      : message.user.uniquename
                  }
                  size={40}
                />
              )}
              {message.user.avatar && (
                <Image
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20
                  }}
                  source={{ uri }}
                />
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.messageBubble}>
            <TouchableOpacity
              onPress={() => {
                if (isAuthenticated) {
                  const screen =
                    message.user._id === this.props.user._id
                      ? 'MyPostsScreen'
                      : 'UserProfileScreen';
                  this.props.navigation.navigate(screen, {
                    user: message.user
                  });
                } else {
                  this.props.navigation.navigate('UserProfileScreen', {
                    user: message.user
                  });
                }
              }}
            >
              <View
                style={{
                  alignItems:
                    isRTL && Platform.OS !== 'android'
                      ? 'flex-end'
                      : 'flex-start'
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#000',
                    textAlign:
                      isRTL && Platform.OS !== 'android' ? 'right' : 'left'
                  }}
                >
                  {message.user.name}
                </Text>
                {/* <Text
                  style={{
                    fontSize: 12,
                    color: '#777',
                    textAlign:
                      isRTL && Platform.OS !== 'android'
                        ? 'right'
                        : 'left',
                    paddingBottom: 5
                  }}
                >
                  {message.user.uniquename}
                </Text> */}
              </View>
            </TouchableOpacity>
            {message.replayto &&
              // message.replayto.id &&
              message.replayto.name &&
              message.replayto.body && (
                <View
                  style={{
                    borderLeftWidth: isRTL ? undefined : 3,
                    borderLeftColor: isRTL ? undefined : '#555',
                    borderRightWidth: isRTL ? 3 : undefined,
                    borderRightColor: isRTL ? '#555' : undefined,
                    marginHorizontal: 10,
                    padding: 5,
                    backgroundColor: '#ddd',
                    maxWidth: width - 160
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      textAlign:
                        isArabic(message.replayto.name) &&
                        Platform.OS !== 'android'
                          ? 'right'
                          : 'left'
                    }}
                  >
                    {message.replayto.name}
                  </Text>
                  <Text
                    style={{
                      textAlign:
                        isArabic(message.replayto.body) &&
                        Platform.OS !== 'android'
                          ? 'right'
                          : 'left'
                    }}
                  >
                    {message.replayto.body}
                  </Text>
                </View>
              )}
            <Text
              style={{
                color: '#272727',
                fontSize: 14,
                textAlign: rtl && Platform.OS !== 'android' ? 'right' : 'left',
                maxWidth: width - 140,
                flexWrap: 'wrap'
              }}
            >
              {message.body}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection:
              isRTL && Platform.OS !== 'android' ? 'row-reverse' : 'row',
            paddingHorizontal: 50
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: '#777',
              paddingHorizontal: 20
            }}
          >
            {time}
          </Text>
          {isAuthenticated && (
            <TouchableOpacity
              onPress={() =>
                this.props.replayComment({
                  id: message.user._id,
                  name: message.user.name
                    ? message.user.name
                    : message.user.uniquename,
                  body: message.body
                })
              }
              style={{
                flexDirection:
                  isRTL && Platform.OS !== 'android' ? 'row' : 'row-reverse'
              }}
            >
              <Ionicons
                name="ios-repeat"
                size={24}
                style={{ paddingHorizontal: 5 }}
                color="#7678ED"
              />
              <Text
                style={{
                  fontSize: 14,
                  paddingLeft: isRTL ? 5 : 10,
                  paddingRight: isRTL ? 10 : 5,
                  color: '#7678ED',
                  textAlign:
                    isRTL && Platform.OS !== 'android' ? 'right' : 'left'
                }}
              >
                {words.replay}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            flex: 1,
            padding: 5
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageBubble: {
    // flex: 1, // full width bubble
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#EEE'
  }
});

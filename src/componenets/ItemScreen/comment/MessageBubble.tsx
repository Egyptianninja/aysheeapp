import * as React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, isArabic, since } from '../../../utils';
import { Avatar } from '../../Avatar';
export default class MessageBubble extends React.Component<any, any> {
  render() {
    const { message, lang, width } = this.props;
    const uri = `http://res.cloudinary.com/arflon/image/upload/w_${100}/${
      message.user.avatar
    }`;

    const rtl = isArabic(message.body, 50);
    const time = since(message.updatedAt, lang);
    return (
      <View>
        <View
          style={{
            flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
            paddingVertical: 10,
            borderRadius: 10
          }}
        >
          <View
            style={{
              width: 65,
              alignItems: 'center',
              justifyContent: 'center'
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
            <Text
              style={{
                fontSize: 9,
                color: '#575757',
                fontWeight: 'bold',
                paddingVertical: 5
              }}
            >
              {time}
            </Text>
          </View>
          <View style={styles.messageBubble}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#000',
                  paddingBottom: 5,
                  textAlign: lang === 'ar' ? 'right' : 'left'
                }}
              >
                {message.user.name
                  ? message.user.name
                  : message.user.uniquename}
              </Text>
            </View>

            <Text
              style={{
                color: '#272727',
                fontSize: 14,
                textAlign: rtl ? 'right' : 'left',
                maxWidth: width - 130,
                flexWrap: 'wrap'
              }}
            >
              {message.body}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.props.replayComment(message.user.uniquename)}
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 12,
              paddingLeft: lang === 'ar' ? 5 : 10,
              paddingRight: lang === 'ar' ? 10 : 5,
              color: '#999',
              textAlign: lang === 'ar' ? 'right' : 'left'
            }}
          >
            رد على التعليق
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            padding: 10,
            borderBottomColor: '#eee',
            borderBottomWidth: 1
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageBubble: {
    // flex: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#F7F7F7'
  }
});

import * as React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { AutoInput } from '../../../lib';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, isArabic, rtlos } from '../../../utils';

export default class InputBar extends React.Component<any, any> {
  autogrowInput: any;

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.text === '') {
      this.autogrowInput.resetInputText();
    }
  }
  getFocus = () => {
    this.autogrowInput.focus();
  };

  render() {
    return (
      <View
        style={{
          width: '99%',
          backgroundColor: '#fff',
          paddingHorizontal: 5
        }}
      >
        {this.props.replay && this.props.replay.id && (
          <View
            style={{
              padding: 10,
              marginHorizontal: 5,

              borderLeftWidth: isArabic(this.props.replay.body) ? undefined : 3,
              borderLeftColor: isArabic(this.props.replay.body)
                ? undefined
                : '#555',
              borderRightWidth: isArabic(this.props.replay.body)
                ? 3
                : undefined,
              borderRightColor: isArabic(this.props.replay.body)
                ? '#555'
                : undefined
            }}
          >
            <Text
              style={{
                textAlign:
                  isArabic(this.props.replay.body) && Platform.OS !== 'android'
                    ? 'right'
                    : 'left',
                fontWeight: 'bold'
              }}
            >
              {this.props.replay.name}
            </Text>
            <Text
              style={{
                textAlign:
                  isArabic(this.props.replay.body) && Platform.OS !== 'android'
                    ? 'right'
                    : 'left'
              }}
            >
              {this.props.replay.body}
            </Text>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: isArabic(this.props.replay.body) ? 10 : undefined,
                right: isArabic(this.props.replay.body) ? undefined : 10,
                top: 10
              }}
              onPress={() => this.props.closeReplay()}
            >
              <Ionicons name="ios-close-circle" size={33} color="#7678ED" />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.inputBar}>
          <AutoInput
            style={[
              styles.textBox,
              { textAlign: this.props.isRTL ? 'right' : 'left' }
            ]}
            ref={(ref: any) => {
              this.autogrowInput = ref;
            }}
            multiline={true}
            placeholder={this.props.placeholder}
            defaultHeight={36}
            onChangeText={(text: string) => {
              this.props.onChangeText(text);
            }}
            value={this.props.text}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => this.props.onSendPressed(this.props.postId)}
          >
            <Ionicons
              name="ios-paper-plane"
              color="#7678ed"
              size={36}
              style={{
                width: 30,
                transform: this.props.isRTL
                  ? [{ rotateY: '180deg' }]
                  : undefined,
                top: this.props.isRTL ? 3 : undefined
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBar: {
    backgroundColor: '#fff',
    flexDirection: rtlos() ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    paddingLeft: 10
    // paddingVertical: 10
  },

  textBox: {
    writingDirection: 'auto',
    backgroundColor: '#f3f3f3',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    paddingHorizontal: 15
  },

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  }
});

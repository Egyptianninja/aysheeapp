import * as React from 'react';
import { Text, View } from 'react-native';

export default class BodyView extends React.Component<any, any> {
  state = {
    fav: false
  };
  render() {
    const { body, isrtl } = this.props;
    return (
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 15,
          justifyContent: 'space-between'
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 14,
              color: '#272727',
              writingDirection: isrtl ? 'rtl' : 'ltr'
            }}
          >
            {body.trim()}
          </Text>
        </View>
      </View>
    );
  }
}

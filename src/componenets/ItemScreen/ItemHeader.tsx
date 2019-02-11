import * as React from 'react';
import { View, Animated, Text } from 'react-native';
import { Constants } from 'expo';
import { StyleSheet } from '../../utils';

class ItemHeader extends React.Component<any, any> {
  render() {
    const title = this.props.title.substring(0, 20);
    return (
      <Animated.View
        style={[
          styles.container,
          {
            shadowOffset: { width: 3, height: 3 },
            shadowColor: '#555',
            shadowOpacity: 0.1,
            opacity: this.props.opacity
          }
        ]}
      >
        <View
          style={{
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: this.props.opacity
          }}
        >
          <Text
            style={{
              fontFamily: 'cairo-regular',
              fontSize: 20,
              color: '#373737'
            }}
          >
            {title}
          </Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    height: Constants.statusBarHeight + 45,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    zIndex: 2
  }
});

export default ItemHeader;

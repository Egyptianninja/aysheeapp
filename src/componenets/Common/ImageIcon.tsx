import * as React from 'react';
import { Image, Animated, View } from 'react-native';

export default class ImageIcon extends React.Component<any, any> {
  scaleStyle: any;
  scale = new Animated.Value(1);

  componentDidUpdate() {
    this.iconSpringUp();
  }

  componentWillMount() {
    this.iconSpringDown();
  }

  iconSpringUp = () => {
    this.scale.setValue(1);
    Animated.sequence([
      Animated.spring(this.scale, {
        toValue: 1.1,
        tension: 150,
        friction: 4,
        useNativeDriver: true
      })
    ]).start();
  };

  iconSpringDown = () => {
    this.scale.setValue(1.1);
    Animated.sequence([
      Animated.spring(this.scale, {
        toValue: 1,
        tension: 150,
        friction: 4,
        useNativeDriver: true
      })
    ]).start();
  };

  render() {
    const {
      icon,
      iconout,
      size,
      focused,
      tintColor,
      width,
      flip,
      notification
    }: any = this.props;
    this.scaleStyle = { transform: [{ scale: this.scale }] };

    return (
      <Animated.View
        style={[
          {
            padding: 2,
            width: width ? width : size,
            height: size
          },
          focused ? this.scaleStyle : null
        ]}
      >
        <Image
          style={[
            { flex: 1, width: '100%', height: '100%' },
            {
              tintColor: focused ? tintColor : iconout ? '#777' : tintColor,
              transform: flip ? [{ rotateY: '180deg' }] : undefined
            }
          ]}
          source={focused ? icon : iconout ? iconout : icon}
        />
        {notification && (
          <View
            style={{
              width: 15,
              height: 15,
              borderRadius: 7.5,
              backgroundColor: '#FBBC93',
              position: 'absolute',
              right: 0,
              top: 0
            }}
          />
        )}
      </Animated.View>
    );
  }
}

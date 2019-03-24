import * as React from 'react';
import { Image, Animated } from 'react-native';

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
    const { icon, iconout, size, focused, tintColor, width }: any = this.props;
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
              tintColor: focused ? tintColor : iconout ? '#777' : tintColor
            }
          ]}
          source={focused ? icon : iconout ? iconout : icon}
        />
      </Animated.View>
    );
  }
}

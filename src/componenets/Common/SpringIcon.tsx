import * as React from 'react';
import { Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class SpringIcon extends React.Component<any, any> {
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
    const { icon, iconout, size, focused, tintColor }: any = this.props;
    this.scaleStyle = { transform: [{ scale: this.scale }] };

    return (
      <Animated.View style={focused ? this.scaleStyle : null}>
        <FontAwesome
          name={focused ? icon : iconout}
          size={size}
          color={tintColor}
        />
      </Animated.View>
    );
  }
}

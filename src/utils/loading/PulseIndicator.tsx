import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Indicator from './Indicator';

export default class PulseIndicator extends PureComponent<any, any> {
  static defaultProps = {
    animationEasing: Easing.out(Easing.ease),

    color: 'rgb(0, 0, 0)',
    size: 40
  };

  static propTypes = {
    ...Indicator.propTypes,

    color: PropTypes.string,
    size: PropTypes.number
  };

  renderComponent = ({ index, count, progress }: any) => {
    const { size, color } = this.props;

    const pulseStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      backgroundColor: color,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 0.67, 1],
            outputRange: index ? [0.4, 0.6, 0.4] : [0.4, 0.6, 1.0]
          })
        }
      ],
      opacity: progress.interpolate({
        inputRange: [0, 0.67, 1],
        outputRange: index ? [1.0, 1.0, 1.0] : [0.5, 0.5, 0.0]
      })
    };

    return (
      <Animated.View style={styles.layer} {...{ key: index }}>
        <Animated.View style={pulseStyle} />
      </Animated.View>
    );
  };

  render() {
    const { style, size: width, size: height, ...props } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Indicator
          style={{ width, height }}
          renderComponent={this.renderComponent}
          {...props}
          count={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  layer: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'center',
    alignItems: 'center'
  }
});

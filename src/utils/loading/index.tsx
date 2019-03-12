import PropTypes from 'prop-types';
import * as React from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

import Indicator from './Indicator';

export default class DotIndicator extends React.PureComponent<any, any> {
  static defaultProps = {
    animationEasing: Easing.inOut(Easing.ease),

    color: '#7678ED',
    count: 4,
    size: 16
  };

  static propTypes = {
    ...Indicator.propTypes,

    color: PropTypes.string,
    size: PropTypes.number
  };

  constructor(props: any) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({ index, count, progress }: any) {
    const { size, color }: any = this.props;

    const style = {
      width: size,
      height: size,
      margin: size / 2,
      borderRadius: size / 2,
      backgroundColor: color,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [
              0.0,
              (index + 0.5) / (count + 1),
              (index + 1.0) / (count + 1),
              (index + 1.5) / (count + 1),
              1.0
            ],
            outputRange: [1.0, 1.36, 1.56, 1.06, 1.0]
          })
        }
      ]
    };

    return <Animated.View style={style} {...{ key: index }} />;
  }

  render() {
    const { style, ...props } = this.props;

    return (
      <Indicator
        style={[styles.container, style]}
        renderComponent={this.renderComponent}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

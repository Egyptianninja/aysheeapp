import PropTypes from 'prop-types';
import * as React from 'react';
import { Animated, Easing } from 'react-native';

export default class Indicator extends React.PureComponent<any, any> {
  static defaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1000,

    animating: true,
    interaction: true,

    count: 1
  };

  static propTypes = {
    animationEasing: PropTypes.func,
    animationDuration: PropTypes.number,

    animating: PropTypes.bool,
    interaction: PropTypes.bool,

    renderComponent: PropTypes.func,
    count: PropTypes.number
  };
  mounted: any;

  constructor(props: any) {
    super(props);
    this.state = {
      progress: new Animated.Value(0)
    };
    this.mounted = false;
  }

  startAnimation = ({ finished }: any = {}) => {
    const { progress }: any = this.state;
    const { interaction, animationEasing, animationDuration }: any = this.props;

    if (!this.mounted || false === finished) {
      return;
    }

    const animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1
    });

    Animated.loop(animation).start();

    this.setState({ animation });
  };

  stopAnimation = () => {
    const { animation }: any = this.state;

    if (null == animation) {
      return;
    }

    animation.stop();

    this.setState({ animation: null });
  };

  componentDidMount() {
    const { animating }: any = this.props;

    this.mounted = true;

    if (animating) {
      this.startAnimation();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps(props: any) {
    const { animating }: any = this.props;

    if (animating ^ props.animating) {
      if (animating) {
        this.stopAnimation();
      } else {
        this.startAnimation();
      }
    }
  }

  renderComponent = (undefined: any, index: any) => {
    const { progress }: any = this.state;
    const { renderComponent, count }: any = this.props;

    if ('function' === typeof renderComponent) {
      return renderComponent({ index, count, progress });
    } else {
      return null;
    }
  };

  render() {
    const { count, ...props } = this.props;

    return (
      <Animated.View {...props}>
        {Array.from(new Array(count), this.renderComponent)}
      </Animated.View>
    );
  }
}

import * as React from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';

// Fallback when RN version is < 0.44

export default class PinchZoomView extends React.Component<any, any> {
  static defaultProps = {
    scalable: true,
    minScale: 0.5,
    maxScale: 2
  };
  distant: any;
  gestureHandlers: any;

  constructor(props: any) {
    super(props);
    this.state = {
      scale: 1,
      lastScale: 1,
      offsetX: 0,
      offsetY: 0,
      lastX: 0,
      lastY: 0,
      lastMovePinch: false
    };
    this.distant = 150;
  }

  componentWillMount() {
    this.gestureHandlers = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminationRequest: evt => true,
      onShouldBlockNativeResponder: evt => false
    });
  }

  _handleStartShouldSetPanResponder = (e: any, gestureState: any) => {
    // don't respond to single touch to avoid shielding click on child components
    return false;
  };

  _handleMoveShouldSetPanResponder = (e: any, gestureState: any) => {
    return (
      this.props.scalable &&
      (Math.abs(gestureState.dx) > 2 ||
        Math.abs(gestureState.dy) > 2 ||
        gestureState.numberActiveTouches === 2)
    );
  };

  _handlePanResponderGrant = (e: any, gestureState: any) => {
    if (gestureState.numberActiveTouches === 2) {
      const dx = Math.abs(
        e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX
      );
      const dy = Math.abs(
        e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY
      );
      const distant = Math.sqrt(dx * dx + dy * dy);
      this.distant = distant;
    }
  };

  _handlePanResponderEnd = (e: any, gestureState: any) => {
    this.setState({
      lastX: this.state.offsetX,
      lastY: this.state.offsetY,
      lastScale: this.state.scale
    });
  };

  _handlePanResponderMove = (e: any, gestureState: any) => {
    // zoom
    if (gestureState.numberActiveTouches === 2) {
      const dx = Math.abs(
        e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX
      );
      const dy = Math.abs(
        e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY
      );
      const distant = Math.sqrt(dx * dx + dy * dy);
      const scale = (distant / this.distant) * this.state.lastScale;
      // check scale min to max hello
      if (scale < this.props.maxScale && scale > this.props.minScale) {
        this.setState({ scale, lastMovePinch: true });
      }
    }
    // translate
    else if (gestureState.numberActiveTouches === 1) {
      if (this.state.lastMovePinch) {
        gestureState.dx = 0;
        gestureState.dy = 0;
      }
      const offsetX = this.state.lastX + gestureState.dx / this.state.scale;
      const offsetY = this.state.lastY + gestureState.dy / this.state.scale;
      // if ( offsetX < 0  || offsetY <  0 )
      this.setState({ offsetX, offsetY, lastMovePinch: false });
    }
  };

  render() {
    return (
      <View
        {...this.gestureHandlers.panHandlers}
        style={[
          styles.container,
          this.props.style,
          {
            transform: [
              { scaleX: this.state.scale },
              { scaleY: this.state.scale },
              { translateX: this.state.offsetX },
              { translateY: this.state.offsetY }
            ]
          }
        ]}
      >
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

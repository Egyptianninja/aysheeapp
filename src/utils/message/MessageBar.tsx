import * as React from "react";
import { View, Animated, PanResponder, StyleSheet } from "react-native";
import Message from "./Message";
import messageManager from "./messageManager";

const MIN_SWIPE_DISTANCE = 20;
const MIN_SWIPE_VELOCITY = 0.15;

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  }
});

export default class MessageBar extends React.Component<any, any, any> {
  public static defaultProps = {
    messageComponent: Message,
    duration: 1000,
    slideAnimationOffset: 40,
    showAnimationDuration: 255,
    hideAnimationDuration: 255,
    closeOnSwipe: true
  };

  panResponder: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isVisibleAnimValue: new Animated.Value(0),
      isAnimatingHide: false,
      message: null,
      config: {}
    };
  }
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gesture) =>
        this.getConfig().closeOnSwipe &&
        gesture.dy < -MIN_SWIPE_DISTANCE &&
        gesture.vy < -MIN_SWIPE_VELOCITY,
      onPanResponderMove: (e, gesture) => {
        if (!this.state.isAnimatingHide) {
          this.hideMessage(this.state.message);
        }
      },
      onShouldBlockNativeResponder: () => true
    });
  }
  componentDidMount() {
    messageManager.registerMessageBar(this);
  }
  componentWillUnmount() {
    messageManager.unregisterMessageBar();
  }
  getConfig() {
    return { ...this.props, ...this.state.config };
  }
  pushMessage(message: any, config: any) {
    this.setState({ message, config }, () => this.showMessage(message));
  }
  showMessage(message: any) {
    const { duration, showAnimationDuration } = this.getConfig();
    this.state.isVisibleAnimValue.setValue(0);
    this.setState({ isAnimatingHide: false });
    Animated.timing(this.state.isVisibleAnimValue, {
      toValue: 1,
      duration: showAnimationDuration,
      useNativeDriver: true
    }).start(() => setTimeout(() => this.hideMessage(message), duration));
  }
  hideMessage(message: any) {
    if (message === this.state.message) {
      const { hideAnimationDuration } = this.getConfig();
      this.setState({ isAnimatingHide: true });
      Animated.timing(this.state.isVisibleAnimValue, {
        toValue: 0,
        duration: hideAnimationDuration,
        useNativeDriver: true
      }).start(() => {
        if (message === this.state.message) {
          this.setState({ message: null, config: {}, isAnimatingHide: false });
        }
      });
    }
  }
  render() {
    const {
      messageComponent: MessageComponent,
      slideAnimationOffset
    } = this.getConfig();
    const translateY = this.state.isVisibleAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-slideAnimationOffset, 0]
    });
    const opacity = this.state.isVisibleAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    return (
      <Animated.View
        style={[styles.root, { transform: [{ translateY }] }, { opacity }]}
      >
        <View {...this.panResponder.panHandlers}>
          {this.state.message && (
            <MessageComponent message={this.state.message.message} />
          )}
        </View>
      </Animated.View>
    );
  }
}

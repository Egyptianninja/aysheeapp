// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactNative, {
  Animated,
  Easing,
  PanResponder,
  StyleSheet,
  View,
  ViewPropTypes
} from 'react-native';

import getDistance from './helpers/getDistance';
import getScale from './helpers/getScale';

import type { Touch } from './types/Touch-type';

const RESTORE_ANIMATION_DURATION = 350;
const ZOOM = 2.5;

type Event = {
  nativeEvent: {
    touches: Array<Touch>
  }
};

type GestureState = {
  stateID: string,
  dx: number,
  dy: number
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export class ElementContainer extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
    ]).isRequired,

    style: ViewPropTypes.style
  };

  static defaultProps = {
    style: null
  };

  static contextTypes = {
    isDragging: PropTypes.bool,
    onGestureStart: PropTypes.func,
    onGestureRelease: PropTypes.func,

    gesturePosition: PropTypes.object,
    scaleValue: PropTypes.object
  };

  _parent: ?Object;
  _gestureHandler: Object;
  _gestureInProgress: ?string;
  _selectedMeasurement: Measurement;
  _initialTouches: Array<Object>;

  _opacity: Animated.Value;

  constructor() {
    super(...arguments);

    this._startGesture = this._startGesture.bind(this);
    this._measureSelected = this._measureSelected.bind(this);

    this._initialTouches = [];
    this._opacity = new Animated.Value(1);
    this.moveX = new Animated.Value(0);
    this.moveY = new Animated.Value(0);

    this._generatePanHandlers();

    this.state = {
      longPress: false
    };
  }

  componentWillMount() {
    this.setState({ longPress: this.props.longPress });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.longPress !== this.props.longPress) {
      this.setState({ longPress: nextProps.longPress });
    }
  }

  render() {
    const { children, style } = this.props;

    return (
      <Animated.View
        style={[
          styles.container,
          style,
          {
            opacity: this._opacity
          }
        ]}
        ref={node => (this._parent = node)}
        {...this._gestureHandler.panHandlers}
      >
        {children}
      </Animated.View>
    );
  }

  _generatePanHandlers = () => {
    this._gestureHandler = PanResponder.create({
      onStartShouldSetPanResponderCapture: (event: Event) => {
        if (
          (typeof this.context.isDragging !== 'undefined' &&
            event.nativeEvent.touches.length === 1 &&
            this.state.longPress) ||
          (typeof this.context.isDragging !== 'undefined' &&
            event.nativeEvent.touches.length === 2)
        ) {
          return true;
        }
        return false;
      },
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (event: Event) => {
        // if context to IstagramProvider exists AND two fingers are used for gesture
        if (
          (typeof this.context.isDragging !== 'undefined' &&
            event.nativeEvent.touches.length === 1 &&
            this.state.longPress) ||
          (typeof this.context.isDragging !== 'undefined' &&
            event.nativeEvent.touches.length === 2)
        ) {
          return true;
        }
        return false;
      },

      onPanResponderGrant: this._startGesture,
      onPanResponderMove: this._onGestureMove,
      onPanResponderRelease: this._onGestureRelease,
      onPanResponderTerminationRequest: () => {
        this.props.EnableScroll();
        return this._gestureInProgress == null;
      },
      onPanResponderTerminate: (event, gestureState) => {
        this.props.EnableScroll();

        return this._onGestureRelease(event, gestureState);
      }
    });
  };

  async _startGesture(event: Event, gestureState: GestureState) {
    this.props.DisableScroll();
    this._gestureInProgress = gestureState.stateID;
    let { gesturePosition, onGestureStart, scaleValue } = this.context;
    let { touches } = event.nativeEvent;
    this._initialTouches = touches;

    let selectedMeasurement = await this._measureSelected();
    this._selectedMeasurement = selectedMeasurement;
    const r = (this.props.width * this.props.finalRatio) / this.props.height;
    const offsetX = (this.props.width / 2 - gestureState.x0) * ZOOM;
    const offsetY = (this.props.height / 2 - gestureState.y0) * ZOOM * r;

    onGestureStart({
      element: this,
      measurement: selectedMeasurement
    });

    gesturePosition.setValue({
      x: 0,
      y: 0
    });

    gesturePosition.setOffset({
      x: 0,
      y: 0
    });

    Animated.timing(this._opacity, {
      toValue: 0,
      duration: 200
    }).start();

    Animated.timing(scaleValue, {
      toValue: ZOOM,
      duration: RESTORE_ANIMATION_DURATION,
      easing: Easing.ease,
      useNativeDriver: true
    }).start();

    Animated.parallel([
      Animated.timing(gesturePosition.x, {
        toValue: offsetX,
        duration: RESTORE_ANIMATION_DURATION,
        easing: Easing.ease,
        useNativeDriver: true
      }),
      Animated.timing(gesturePosition.y, {
        toValue: offsetY,
        duration: RESTORE_ANIMATION_DURATION,
        easing: Easing.ease,
        useNativeDriver: true
      })
    ]).start();
  }

  _onGestureMove = (event: Event, gestureState: GestureState) => {
    const r = (this.props.width * this.props.finalRatio) / this.props.height;
    const multiMoveX = -ZOOM;
    const multiMoveY = -ZOOM * r;
    let { touches } = event.nativeEvent;

    if (!this._gestureInProgress) {
      return;
    }
    // if (touches.length < 2) {
    if (touches.length < 1) {
      // Trigger a realease
      this._onGestureRelease(event, gestureState);
      return;
    }
    if (touches.length === 1) {
      this.props.DisableScroll();
      // for moving photo around
      let { gesturePosition } = this.context;
      let { dx, dy } = gestureState;

      gesturePosition.x.setValue(dx * multiMoveX);
      gesturePosition.y.setValue(dy * multiMoveY);
    }
  };

  _onGestureRelease = (event, gestureState: GestureState) => {
    if (this._gestureInProgress !== gestureState.stateID) {
      return;
    }

    this._gestureInProgress = null;
    this._initialTouches = [];

    let { gesturePosition, scaleValue, onGestureRelease } = this.context;

    // set to initial position and scale
    Animated.parallel([
      Animated.timing(gesturePosition.x, {
        toValue: 0,
        duration: RESTORE_ANIMATION_DURATION,
        easing: Easing.ease,
        useNativeDriver: true
      }),
      Animated.timing(gesturePosition.y, {
        toValue: 0,
        duration: RESTORE_ANIMATION_DURATION,
        easing: Easing.ease,
        useNativeDriver: true
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: RESTORE_ANIMATION_DURATION,
        easing: Easing.ease,
        useNativeDriver: true
      })
    ]).start(() => {
      gesturePosition.setOffset({
        x: 0,
        y: (this._selectedMeasurement && this._selectedMeasurement.y) || 0
        // y: 0
      });
      scaleValue.setValue(1);
      this._opacity.setValue(1);
      requestAnimationFrame(() => {
        onGestureRelease();
      });
    });

    this.props.EnableScroll();
  };

  async _measureSelected() {
    let parentMeasurement = await new Promise((resolve, reject) => {
      try {
        this._parent._component.measureInWindow(
          (winX, winY, winWidth, winHeight) => {
            resolve({
              x: winX,
              y: winY,
              w: winWidth,
              h: winHeight
            });
          }
        );
      } catch (e) {
        reject(e);
      }
    });

    return {
      x: parentMeasurement.x,
      y: parentMeasurement.y,
      w: parentMeasurement.w,
      h: parentMeasurement.h
    };
  }
}

export default ElementContainer;

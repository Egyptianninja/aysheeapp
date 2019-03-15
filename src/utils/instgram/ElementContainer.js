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

const RESTORE_ANIMATION_DURATION = 200;

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

    this._generatePanHandlers();
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
      onStartShouldSetResponderCapture: () => true,
      onStartShouldSetPanResponderCapture: (event: Event) => {
        // if context to IstagramProvider exists AND two fingers are used for gesture
        if (
          typeof this.context.isDragging !== 'undefined' &&
          event.nativeEvent.touches.length === 2
        ) {
          return true;
        }
        return false;
      },
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: (event: Event) => {
        // if context to IstagramProvider exists AND two fingers are used for gesture
        if (
          typeof this.context.isDragging !== 'undefined' &&
          event.nativeEvent.touches.length === 2
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
    // Sometimes gesture start happens two or more times rapidly.
    if (this._gestureInProgress) {
      return;
    }
    this.props.DisableScroll();

    this._gestureInProgress = gestureState.stateID;
    let { gesturePosition, onGestureStart } = this.context;
    let { touches } = event.nativeEvent;

    this._initialTouches = touches;

    let selectedMeasurement = await this._measureSelected();
    this._selectedMeasurement = selectedMeasurement;
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
      y: selectedMeasurement.y
    });

    Animated.timing(this._opacity, {
      toValue: 0,
      duration: 200
    }).start();
  }

  _onGestureMove = (event: Event, gestureState: GestureState) => {
    let { touches } = event.nativeEvent;
    if (!this._gestureInProgress) {
      return;
    }
    if (touches.length < 1) {
      // Trigger a realease
      this._onGestureRelease(event, gestureState);
      return;
    }
    if (touches.length === 1) {
      this.props.DisableScroll();
      // for moving photo around
      let { gesturePosition, scaleValue } = this.context;
      let { dx, dy } = gestureState;
      gesturePosition.x.setValue(dx * 1.5);
      gesturePosition.y.setValue(dy * 1.3);
    } else {
      this.props.DisableScroll();
      // for moving photo around
      let { gesturePosition, scaleValue } = this.context;
      let { dx, dy } = gestureState;

      gesturePosition.x.setValue(dx);
      gesturePosition.y.setValue(dy);

      // for scaling photo
      let currentDistance = getDistance(touches);
      let initialDistance = getDistance(this._initialTouches);
      let newScale = getScale(currentDistance, initialDistance);
      // gesturePosition.x.setOffset(dx);
      // gesturePosition.y.setOffset(dy);
      scaleValue.setValue(newScale);
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

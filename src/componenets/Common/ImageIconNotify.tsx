import * as React from 'react';
import { Animated, Image, View, Text } from 'react-native';
import { connect } from 'react-redux';

class ImageIconNotify extends React.Component<any, any> {
  scaleStyle: any;
  scale = new Animated.Value(1);

  componentDidUpdate() {
    if (this.props.notifications === 0) {
      console.log('me');
    }
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
      notifications
    }: any = this.props;
    this.scaleStyle = { transform: [{ scale: this.scale }] };
    return (
      <Animated.View
        style={[
          {
            padding: 2,
            marginLeft: this.props.left,
            marginRight: this.props.right,
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
        {notifications > 0 && (
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: '#E85255',
              position: 'absolute',
              left: 12,
              bottom: 12,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 12, color: '#fff' }}>
              {this.props.notifications}
            </Text>
          </View>
        )}
      </Animated.View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  notifications: state.glob.notifications
});

export default connect(mapStateToProps)(ImageIconNotify);

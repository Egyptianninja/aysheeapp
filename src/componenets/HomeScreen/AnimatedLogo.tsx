import * as React from 'react';
import { View, Modal, Image, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';

class AnimatedLogo extends React.Component<any, any> {
  static navigationOptions = { header: null };
  startAnim: any;
  animatedValue: any;

  constructor(props: any) {
    super(props);

    this.state = {
      modalVisible: false
    };
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.startAnim = setTimeout(() => {
      this.startAnimation();
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.startAnim);
  }

  startAnimation = () => {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 800
    }).start(() => this.setState({ modalVisible: false }));
  };

  render() {
    const animatedStyle = {
      opacity: this.animatedValue
    };

    if (this.state.modalVisible === true) {
      setTimeout(() => {
        return <View style={{ flex: 1, backgroundColor: '#171717' }} />;
      }, 800);
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingHorizontal: 5
        }}
      >
        <Modal
          onRequestClose={() => null}
          transparent={true}
          visible={this.state.modalVisible}
        >
          <Animated.View
            style={[
              {
                flex: 1,
                backgroundColor: '#171717',
                alignItems: 'center',
                justifyContent: 'center'
              },
              animatedStyle
            ]}
          >
            <Animatable.View
              animation="zoomIn"
              duration={800}
              iterationCount={1}
              useNativeDriver={true}
              style={{
                width: 175,
                height: 175
              }}
            >
              <Image
                style={{ width: '100%', height: '100%' }}
                source={require('../../../assets/logo.png')}
              />
            </Animatable.View>
          </Animated.View>
        </Modal>
      </View>
    );
  }
}

export default AnimatedLogo;

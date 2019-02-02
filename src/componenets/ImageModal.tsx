import * as React from "react";
import { View, Image, Dimensions, Animated, PanResponder } from "react-native";

const { width } = Dimensions.get("window");
const scale = 1.25;
class ImageModal extends React.Component<any, any> {
  static navigationOptions = { header: null };

  animation: any;
  PanResponder: any;
  scrollOffset: any;
  scrollViewHeight: any;
  multiMoveX: any;
  multiMoveY: any;
  state = {
    isImageViewVisible: true,
    modalVisible: false,
    isModelVisible: false,
    imageIndex: 0,
    imageWidth: 0,
    imageHeight: 0
  };
  componentWillMount() {
    this.scrollOffset = 0;
    this.animation = new Animated.ValueXY({ x: 0, y: 0 });
    this.PanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => {
        return true;
      },
      onPanResponderGrant: () => {
        this.animation.extractOffset();
      },
      onPanResponderMove: (e, gestureState) => {
        this.animation.setValue({
          x: gestureState.dx * this.multiMoveX * scale,
          y: gestureState.dy * this.multiMoveY * scale
        });
      },
      onPanResponderRelease: (e, gestureState) => {
        //
      }
    });
  }
  componentDidMount() {
    Image.getSize(
      "https://wallpaperbrowse.com/media/images/nasas-images-of-most-remarkable-events-you-cant-miss.jpg",
      (imageWidth: number, imageHeight: number) => {
        this.setState({ imageWidth, imageHeight });
      },
      err => {
        // Give up
      }
    );
  }

  render() {
    const animatedStyle = {
      transform: [
        { translateY: this.animation.y },
        { translateX: this.animation.x },
        { scale }
      ]
    };

    this.multiMoveX = this.state.imageWidth / (width / 2 - 20);
    this.multiMoveY = this.state.imageHeight / width;

    return (
      <Animated.View
        {...this.PanResponder.panHandlers}
        style={[
          animatedStyle,
          {
            height: this.state.imageHeight * scale,
            width: this.state.imageWidth * scale
          }
        ]}
      >
        <View
          style={{
            flex: 1,
            position: "absolute",
            height: this.state.imageHeight * scale,
            width: this.state.imageWidth * scale
          }}
        >
          <Image
            style={{
              flex: 1,
              width: "100%",
              height: "100%"
            }}
            source={{
              uri:
                "https://wallpaperbrowse.com/media/images/nasas-images-of-most-remarkable-events-you-cant-miss.jpg"
            }}
          />
        </View>
      </Animated.View>
    );
  }
}

export default ImageModal;

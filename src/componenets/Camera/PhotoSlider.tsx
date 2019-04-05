import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { Photo } from '../../lib';

export default class PhotoSlider extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (
      nextProps.selectedImage !== prevState.selectedImage ||
      nextProps.position !== prevState.position
    ) {
      return {
        selectedImage: nextProps.selectedImage,
        position: nextProps.position
      };
    } else {
      return { ...prevState };
    }
  }
  scrollView: any;
  constructor(props: any) {
    super(props);
    this.state = {
      animatedScroll: new Animated.Value(0),
      position: 0,
      selectedImage: null,
      loading: false
    };
  }

  componentDidMount() {
    this.scrollView.scrollTo({
      x: this.props.width * this.state.position,
      animated: false
    });
  }

  handlePageChange = (e: any) => {
    const offset = e.nativeEvent.contentOffset;
    if (offset.x === 0) {
      this.setState({ position: 0 });
      if (this.props.setPhotoPosition) {
        this.props.setPhotoPosition(0);
      }
    } else {
      const position = Math.round(offset.x / this.props.width);
      this.setState({ position });
      if (this.props.setPhotoPosition) {
        this.props.setPhotoPosition(position);
      }
    }
  };

  render() {
    const { photos } = this.props;
    const height = this.props.width * 1.3333;
    return (
      <View style={styles.container}>
        <ScrollView
          ref={(ref: any) => {
            this.scrollView = ref;
          }}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onMomentumScrollEnd={this.handlePageChange}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { x: this.state.animatedScroll } }
            }
          ])}
        >
          {photos.map((image: any, i: any) => {
            const uri = image.file ? image.file : image.uri;
            const main = uri === this.state.selectedImage;
            return (
              <View key={uri}>
                {main && (
                  <View
                    style={{
                      position: 'absolute',
                      left: 5,
                      width: 40,
                      height: 80,
                      zIndex: 270
                    }}
                  >
                    <Ionicons name="ios-bookmark" size={50} color="#00B77C" />
                  </View>
                )}
                <Photo
                  main={main}
                  uri={uri}
                  width={this.props.width}
                  height={height}
                  overflow="hidden"
                  resizeMode="contain"
                />
              </View>
            );
          })}
        </ScrollView>
        {photos.length > 1 && (
          <View style={[styles.layoutIndicator]}>
            {photos.map((image: any, index: any) => {
              return (
                <View
                  key={index}
                  style={[
                    [
                      styles.indicator,
                      {
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#fff',
                        opacity: 0.3
                      }
                    ],
                    this.state.position === index && [
                      styles.indicatorSelected,
                      { backgroundColor: '#fff' }
                    ]
                  ]}
                >
                  <View />
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(118, 120, 237, 0.3)',
    borderWidth: 5,
    borderColor: 'rgba(118, 120, 237, 0.3)'
  },
  layoutIndicator: {
    height: 15,
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    zIndex: 150
  },
  indicator: {
    margin: 3,
    opacity: 0.9
  },
  indicatorSelected: {
    opacity: 1
  }
});

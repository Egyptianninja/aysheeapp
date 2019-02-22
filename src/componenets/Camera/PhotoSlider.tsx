import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Animated,
  TouchableWithoutFeedback
} from 'react-native';
import { Photo } from '../../lib';

export default class PhotoSlider extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      animatedScroll: new Animated.Value(0),
      position: 0,
      loading: false
    };
  }

  handlePageChange = (e: any) => {
    const offset = e.nativeEvent.contentOffset;
    if (offset.x === 0) {
      this.setState({ position: 0 });
      this.props.getPhotoPosition(0);
    } else {
      const position = Math.round(offset.x / this.props.width);
      this.setState({ position });
      this.props.getPhotoPosition(position);
    }
  };

  render() {
    const { photos } = this.props;
    const height = this.props.width * 1.3333;
    return (
      <View style={styles.container}>
        <ScrollView
          pagingEnabled
          horizontal
          scrollEnabled={this.state.scrollEnabled}
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
            const uri = image.uri;
            return (
              <View key={image.uri}>
                <Photo
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
    backgroundColor: '#171717'
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

import * as React from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Photo } from '../../lib';
import { rtlos } from '../../utils';
const { width } = Dimensions.get('window');

export default class PhotoSliderHome extends React.Component<any, any> {
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
    } else {
      this.setState({ position: Math.round(offset.x / width) });
    }
  };

  near = ({ position, index, size = 2 }: any) => {
    return index >= position - size && index <= position + size;
  };

  render() {
    const { photos } = this.props;
    const { position } = this.state;
    const height = this.props.ratio ? width * this.props.ratio : width;
    return (
      <View style={styles.container}>
        {/* <ScrollView
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
            const uri = image.url;
            return (
              <TouchableWithoutFeedback
                onPress={() => this.props.showModal(i)}
                key={i}
              >
                <View>
                  <Photo
                    uri={uri}
                    width={width}
                    height={height}
                    overflow="hidden"
                    resizeMode="cover"
                  />
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView> */}
        <FlatList
          data={photos}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={this.handlePageChange}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { x: this.state.animatedScroll } }
            }
          ])}
          renderItem={({ item }: any) => (
            <TouchableWithoutFeedback
              style={{ flex: 1 }}
              onPress={() => {
                const updatedPhotos = photos.map((photo: any) => {
                  return {
                    url: photo.url.replace('w_600', 'w_1080')
                  };
                });
                const index = photos
                  .map((photo: any, i: any) => {
                    if (photo === item) {
                      return i;
                    }
                  })
                  .filter((x: any) => x)[0];
                this.props.showPhotoModal({
                  photos: updatedPhotos,
                  photo: index
                });
              }}
            >
              <View style={{ flex: 1 }}>
                <Photo
                  uri={item.url}
                  width={width}
                  height={height}
                  overflow="hidden"
                  resizeMode="cover"
                />
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={(item: any) => item.url}
          // Performance settings
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={1} // Reduce initial render amount
          maxToRenderPerBatch={2} // Reduce number in each render batch
          // maxToRenderPerBatch={100} // Increase time between renders
          windowSize={3} // Reduce the window size
        />
        {photos.length > 1 && (
          <View
            style={[
              styles.layoutIndicator,
              { flexDirection: rtlos() === 3 ? 'row-reverse' : 'row' }
            ]}
          >
            {photos.map((image: any, index: any) => {
              const near = this.near({ index, position, size: 2 });
              const range = this.near({ index, position, size: 3 });

              return (
                <View key={index}>
                  {range && (
                    <View
                      style={[
                        [
                          styles.indicator,
                          {
                            width: near ? 7 : 5,
                            height: near ? 7 : 5,
                            borderRadius: near ? 3.5 : 2.5,
                            backgroundColor: '#fff',
                            opacity: 0.5
                          }
                        ],
                        this.state.position === index && [
                          styles.indicatorSelected,
                          { backgroundColor: '#fff' }
                        ]
                      ]}
                    />
                  )}
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
    backgroundColor: '#fff'
  },
  layoutIndicator: {
    height: 15,
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 150
  },
  indicator: {
    margin: 1,
    opacity: 0.9
  },
  indicatorSelected: {
    opacity: 1
  }
});

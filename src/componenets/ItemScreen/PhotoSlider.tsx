import * as React from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Photo } from '../../lib';
import { rtlos } from '../../utils';
const { width } = Dimensions.get('window');

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
    } else {
      this.setState({ position: Math.round(offset.x / width) });
    }
  };

  render() {
    const { photos } = this.props;
    const height = this.props.ratio ? width * this.props.ratio : width;
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
                    resizeMode="contain"
                  />
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
        {photos.length > 1 && (
          <View
            style={[
              styles.layoutIndicator,
              { flexDirection: rtlos() === 3 ? 'row-reverse' : 'row' }
            ]}
          >
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

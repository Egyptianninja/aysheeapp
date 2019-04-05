import * as React from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import OfferPhoto from './OfferPhoto';
const { width } = Dimensions.get('window');

export default class OffersSlider extends React.Component<any, any> {
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
    const { words, lang, isRTL, offers, color } = this.props;
    const imageWidth = width - 30;
    const imageheight = (imageWidth * 3) / 2;

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
          {offers.map((offer: any, i: any) => {
            const uri = offer.uri;

            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.navigate('ItemScreen', {
                    post: offer,
                    word: words,
                    lang,
                    isRTL
                  });
                }}
                key={i}
              >
                <View style={{ paddingHorizontal: 15, backgroundColor: color }}>
                  <OfferPhoto
                    uri={uri}
                    offer={offer}
                    width={imageWidth}
                    height={imageheight}
                    radius={10}
                    overflow="hidden"
                    resizeMode="cover"
                  />
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
        {offers.length > 1 && (
          <View style={[styles.layoutIndicator]}>
            {offers.map((image: any, index: any) => {
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
                        opacity: 0.5
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
    flex: 1
  },
  layoutIndicator: {
    height: 15,
    position: 'absolute',
    top: -18,
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
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'black'
  },
  subtitle: {
    marginTop: 6,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontStyle: 'italic'
  }
});

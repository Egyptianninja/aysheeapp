import React, { Component } from 'react';
import { View } from 'react-native';
import Carousel from '../carousel';
import { sliderWidth, itemWidth } from './styles/SliderEntry';
import SliderEntry from './components/SliderEntry';
import styles from './styles/index';
import { ENTRIES } from './static/entries';

const SLIDER_1_FIRST_ITEM = 1;

export default class Swiper extends Component<any, any> {
  static navigationOptions = { header: null };
  constructor(props: any) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      slider1Ref: null
    };
  }

  _renderItemWithParallax({ item, index }: any, parallaxProps: any) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  get example() {
    return (
      <View style={[styles.exampleContainer, { backgroundColor: '#fff' }]}>
        <Carousel
          ref={(c: any) => {
            if (!this.state.slider1Ref) {
              this.setState({ slider1Ref: c });
            }
          }}
          data={ENTRIES}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.6}
          enableMomentum={false}
          containerCustomStyle={styles.slider}
          lockScrollTimeoutDuration={250}
          swipeThreshold={10}
          // loop={true}
          // loopClonesPerSide={2}
          // autoplay={true}
          // autoplayDelay={500}
          // autoplayInterval={3000}
          onSnapToItem={(index: any) =>
            this.setState({ slider1ActiveSlide: index })
          }
        />
      </View>
    );
  }

  render() {
    return <View style={styles.container}>{this.example}</View>;
  }
}

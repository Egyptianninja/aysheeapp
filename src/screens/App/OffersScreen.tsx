import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../../componenets/User/User';

import { Carousel } from '../../utils';
import {
  SliderEntry,
  ENTRIES1,
  ENTRIES2,
  ENTRIES3,
  sliderWidth,
  itemWidth,
  styles,
  colors
} from '../../componenets/OffersScreen';

const HEIGHT = Dimensions.get('window').height;
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

  _renderItem({ item, index }: any) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
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

  get example1() {
    const { slider1ActiveSlide, slider1Ref }: any = this.state;

    return (
      <View
        style={[
          styles.exampleContainer,
          { backgroundColor: colors.background1 }
        ]}
      >
        <User icon={5} />
        <Carousel
          ref={(c: any) => {
            if (!this.state.slider1Ref) {
              this.setState({ slider1Ref: c });
            }
          }}
          data={ENTRIES1}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          enableMomentum={false}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          // lockScrollTimeoutDuration={250}
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
        {/* <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={slider1Ref}
          tappableDots={!!slider1Ref}
        /> */}
      </View>
    );
  }
  get example2() {
    const { slider1ActiveSlide, slider1Ref }: any = this.state;

    return (
      <View
        style={[
          styles.exampleContainer,
          { backgroundColor: colors.background2 }
        ]}
      >
        <User icon={8} />
        <Carousel
          ref={(c: any) => {
            if (!this.state.slider1Ref) {
              this.setState({ slider1Ref: c });
            }
          }}
          data={ENTRIES2}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.7}
          enableMomentum={false}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          // lockScrollTimeoutDuration={250}
          swipeThreshold={10}
          onSnapToItem={(index: any) =>
            this.setState({ slider1ActiveSlide: index })
          }
        />
      </View>
    );
  }
  get example3() {
    const { slider1ActiveSlide, slider1Ref }: any = this.state;

    return (
      <View
        style={[
          styles.exampleContainer,
          {
            backgroundColor: colors.background3
          }
        ]}
      >
        <User icon={22} />
        <Carousel
          ref={(c: any) => {
            if (!this.state.slider1Ref) {
              this.setState({ slider1Ref: c });
            }
          }}
          data={ENTRIES3}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          enableMomentum={false}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          // lockScrollTimeoutDuration={250}
          swipeThreshold={10}
          // activeAnimationType="spring"
          onSnapToItem={(index: any) =>
            this.setState({ slider1ActiveSlide: index })
          }
        />
      </View>
    );
  }

  // get example2() {
  //   return (
  //     <View style={styles.exampleContainer}>
  //       <Text style={styles.title}>Example 2</Text>
  //       <Text style={styles.subtitle}>Momentum | Left-aligned</Text>
  //       <Carousel
  //         data={ENTRIES2}
  //         renderItem={this._renderItem}
  //         sliderWidth={sliderWidth}
  //         itemWidth={itemWidth}
  //         inactiveSlideScale={0.9}
  //         inactiveSlideOpacity={1}
  //         enableMomentum={true}
  //         activeSlideAlignment={'start'}
  //         containerCustomStyle={styles.slider}
  //         contentContainerCustomStyle={styles.sliderContentContainer}
  //         removeClippedSubviews={false}
  //       />
  //     </View>
  //   );
  // }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'rgba(0, 0, 0, 0.3)'}
          barStyle={'light-content'}
        />
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{
            position: 'absolute',
            top: 30,
            left: 15,
            zIndex: 100,
            width: 36,
            height: 36,
            borderRadius: 18,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Ionicons name="ios-arrow-back" size={33} color="#fff" />
        </TouchableOpacity>
        <ScrollView
          style={styles.scrollview}
          contentContainerStyle={styles.scrollviewContentContainer}
          indicatorStyle={'white'}
          scrollEventThrottle={16}
          decelerationRate={0}
          snapToInterval={HEIGHT - 110}
          snapToAlignment={'start'}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled={true}
        >
          {this.example1}
          {this.example2}
          {this.example3}
          {this.example1}
          {this.example2}
          {this.example3}
          {this.example1}
          {this.example2}
          {this.example3}
          {this.example1}
          {this.example2}
          {this.example3}
          {this.example1}
          {this.example2}
        </ScrollView>
      </View>
    );
  }
}

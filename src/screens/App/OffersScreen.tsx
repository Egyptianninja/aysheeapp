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
  sliderWidth,
  itemWidth,
  styles
} from '../../componenets/OffersScreen';
import { Query } from 'react-apollo';
import getShopsWithOffers from '../../graphql/query/getShopsWithOffers';
import { Loading } from '../../componenets';

const HEIGHT = Dimensions.get('window').height;
const FIRST_ITEM = 1;

export default class OffersScreen extends Component<any, any> {
  static navigationOptions = { header: null };
  constructor(props: any) {
    super(props);
    this.state = {
      slider1ActiveSlide: FIRST_ITEM,
      slider1Ref: null
    };
  }

  renderItemWithParallax = ({ item, index }: any, parallaxProps: any) => {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
        navigation={this.props.navigation}
      />
    );
  };

  renderShopOffers = (data: any) => {
    const { _id, name, avatar, color, offers, about } = data;
    return (
      <View
        key={_id}
        style={[styles.exampleContainer, { backgroundColor: color }]}
      >
        <User
          navigation={this.props.navigation}
          avatar={avatar}
          name={name}
          about={about}
          user={data}
        />
        <Carousel
          ref={(c: any) => {
            if (!this.state.slider1Ref) {
              this.setState({ slider1Ref: c });
            }
          }}
          data={offers}
          renderItem={this.renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={FIRST_ITEM}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.7}
          enableMomentum={false}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          swipeThreshold={10}
          onSnapToItem={(index: any) =>
            this.setState({ slider1ActiveSlide: index })
          }
        />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar
          translucent={true}
          backgroundColor={'rgba(0, 0, 0, 0.3)'}
          barStyle={'light-content'}
        /> */}
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{
            position: 'absolute',
            top: 30,
            left: 15,
            zIndex: 100,
            width: 60,
            height: 40,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Ionicons name="ios-arrow-back" size={33} color="#fff" />
        </TouchableOpacity>

        <Query
          query={getShopsWithOffers}
          variables={{}}
          fetchPolicy="network-only"
        >
          {({ loading, error, data, fetchMore, refetch }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              return <Text>{error}</Text>;
            }
            const shops = data.getShopsWithOffers;

            if (shops && shops.length === 0) {
              return <View />;
            }

            return (
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
                // onRefresh={() => refetch()}
                // refreshing={this.state.refreshing}
              >
                {shops.map((shop: any) => {
                  return this.renderShopOffers(shop);
                })}
              </ScrollView>
            );
          }}
        </Query>
      </View>
    );
  }
}

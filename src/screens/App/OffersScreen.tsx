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
        <User avatar={avatar} name={name} about={about} />
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

// const shops = [
//   {
//     _id: '5c7c1b4e4b557e001c46a999',
//     name: 'عروض ازياء سبلاش',
//     avatar: 'tyeteyfwpjzz7ogz5vmd',
//     color: '#7678ED',
//     offers: [
//       {
//         _id: '5c7f10915cc915001aa8e77c',
//         title: 'اشتري واسترجع النصف',
//         body: 'هذا العرض بجميع محلات سبلاش قطر ',
//         photos: ['vje67evix6bsgnlpycq3'],
//         start: '2019-03-06T00:00:00.000Z',
//         end: '2019-03-31T00:00:00.000Z',
//         trueLocation: {
//           lat: 25.274608692418138,
//           lon: 51.49217156344039
//         }
//       },
//       {
//         _id: '5c7f20585cc915001aa8e783',
//         title: 'عرض مدخر النقود',
//         body: 'مجمع قطر للتسوق يعلن عن عرض مدخر النقود',
//         photos: ['oemn9geq4fylhakoqtse'],
//         start: '2019-03-07T00:00:00.000Z',
//         end: '2019-03-15T00:00:00.000Z',
//         trueLocation: {
//           lat: 25.274588242744557,
//           lon: 51.49217199022465
//         }
//       }
//     ]
//   },
//   {
//     _id: '5c7f0eb9bf1b98001b9ede58',
//     name: 'العود للعطور',
//     avatar: null,
//     color: '#7678ED',
//     offers: [
//       {
//         _id: '5c7f0fb95cc915001aa8e77b',
//         title: 'عرض للعود',
//         body: 'عرض جديد للعود',
//         photos: ['lg3jp54zohmzucmzjncl'],
//         start: '2019-03-12T00:00:00.000Z',
//         end: '2019-03-28T00:00:00.000Z',
//         trueLocation: {
//           lat: 25.22549437106315,
//           lon: 51.43563692745055
//         }
//       },
//       {
//         _id: '5c7f10d45cc915001aa8e77d',
//         title: 'عروض الصيف',
//         body: 'عروض الصيف',
//         photos: ['p3dqff0o7hgeeae1ysyb'],
//         start: '2019-03-20T00:00:00.000Z',
//         end: '2019-03-23T00:00:00.000Z',
//         trueLocation: null
//       },
//       {
//         _id: '5c7f13c35cc915001aa8e780',
//         title: 'عرض جديد',
//         body: 'عرض جديد',
//         photos: ['pzycqzyt4nr1c3foratp'],
//         start: '2019-03-13T00:00:00.000Z',
//         end: '2019-03-21T00:00:00.000Z',
//         trueLocation: null
//       },
//       {
//         _id: '5c7f15705cc915001aa8e781',
//         title: 'عروض الربيع',
//         body: 'عروض الربيع',
//         photos: ['enc6cz5v5vmrbeosdkyx'],
//         start: '2019-03-19T00:00:00.000Z',
//         end: '2019-03-23T00:00:00.000Z',
//         trueLocation: {
//           lat: 25.225508811556914,
//           lon: 51.43560039983238
//         }
//       },
//       {
//         _id: '5c7f161d5cc915001aa8e782',
//         title: 'العرض الخامس',
//         body: 'العرض الخامس',
//         photos: ['xwbari6qdprrua7benjp'],
//         start: '2019-03-13T00:00:00.000Z',
//         end: '2019-03-21T00:00:00.000Z',
//         trueLocation: null
//       }
//     ]
//   }
// ];

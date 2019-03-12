import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Loading, Noresult } from '../../componenets';
import {
  itemWidth,
  SliderEntry,
  sliderWidth,
  styles
} from '../../componenets/OffersScreen';
import { User } from '../../componenets/User/User';
import getShopsWithOffers from '../../graphql/query/getShopsWithOffers';
import { Carousel, getLang, readyUserPosts } from '../../utils';

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
    const lang = getLang();
    const readyOffers = readyUserPosts(offers, 400, 79, lang);
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
          data={readyOffers}
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
          lockScrollTimeoutDuration={250}
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
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{
            position: 'absolute',
            top: 25,
            left: 0,
            zIndex: 100,
            width: 40,
            height: 40,
            paddingHorizontal: 15,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Ionicons name="ios-arrow-back" size={31} color="#ddd" />
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
              return <Noresult title="No Offers" />;
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

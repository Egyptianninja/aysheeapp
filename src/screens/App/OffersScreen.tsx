import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { Loading, Noresult } from '../../componenets';
import {
  SliderEntry,
  styles,
  OffersSlider
} from '../../componenets/OffersScreen';
import { User } from '../../componenets/User/User';
import getShopsWithOffers from '../../graphql/query/getShopsWithOffers';
import { getLang, readyUserPosts } from '../../utils';

const HEIGHT = Dimensions.get('window').height;

class OffersScreen extends Component<any, any> {
  static navigationOptions = { header: null };
  constructor(props: any) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  renderShopOffers = (data: any, lang: any) => {
    const { _id, name, avatar, color, offers, about } = data;
    const readyOffers = readyUserPosts(offers, 1080, 79, lang);
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
        <OffersSlider
          offers={readyOffers}
          words={this.props.words}
          lang={this.props.lang}
          isRTL={this.props.isRTL}
          navigation={this.props.navigation}
          color={color}
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
              <FlatList
                data={shops}
                style={styles.scrollview}
                contentContainerStyle={styles.scrollviewContentContainer}
                indicatorStyle={'white'}
                scrollEventThrottle={16}
                decelerationRate={0}
                snapToInterval={HEIGHT - 55}
                snapToAlignment={'start'}
                showsVerticalScrollIndicator={false}
                directionalLockEnabled={true}
                renderItem={({ item }: any) =>
                  this.renderShopOffers(item, this.props.lang)
                }
                keyExtractor={(item: any) => item._id}
                onRefresh={() => refetch()}
                refreshing={this.state.refreshing}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  lang: state.glob.languageName,
  isRTL: state.glob.isRTL,
  words: state.glob.language.words
});

export default connect(mapStateToProps)(OffersScreen);

import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Loading, Noresult } from '../../componenets';
import { OffersSlider } from '../../componenets/OffersScreen';
import { User } from '../../componenets/User/User';
import getShopsWithOffers from '../../graphql/query/getShopsWithOffers';
import { isIphoneX, readyUserPosts, rtlos } from '../../utils';

const HEIGHT = Dimensions.get('window').height;
const iphoneX = isIphoneX();
class OffersScreen extends Component<any, any> {
  static navigationOptions = { header: null, tabBarVisible: false };
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
        style={[
          styles.exampleContainer,
          { backgroundColor: color, paddingTop: iphoneX ? 30 : 0 }
        ]}
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
            top: iphoneX ? 55 : 30,
            left: rtlos() === 3 ? undefined : 5,
            right: rtlos() === 3 ? 5 : undefined,
            zIndex: 100,
            width: 40,
            height: 40,
            paddingHorizontal: 15,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.2)'
            }}
          >
            <Ionicons
              name="ios-arrow-back"
              size={30}
              color="rgba(255, 255, 255, 0.7)"
            />
          </View>
        </TouchableOpacity>

        <Query
          query={getShopsWithOffers}
          variables={{}}
          fetchPolicy="network-only"
        >
          {({ loading, error, data, fetchMore, refetch }: any) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              return <Noresult title="No Offers" top={100} />;
            }
            const shops = data.getShopsWithOffers;

            if (shops && shops.length === 0) {
              return <Noresult title="No Offers" top={100} />;
            }

            return (
              <FlatList
                data={shops}
                style={styles.scrollview}
                contentContainerStyle={styles.scrollviewContentContainer}
                indicatorStyle={'white'}
                scrollEventThrottle={16}
                decelerationRate={0.96}
                // snapToInterval={HEIGHT - 55}
                snapToInterval={iphoneX ? HEIGHT - 155 : HEIGHT - 55}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  scrollview: {
    flex: 1
  },
  scrollviewContentContainer: {
    paddingBottom: iphoneX ? 155 : 55
  },
  exampleContainer: {
    height: iphoneX ? HEIGHT - 155 : HEIGHT - 55
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center'
  }
});

const mapStateToProps = (state: any) => ({
  lang: state.glob.languageName,
  isRTL: state.glob.isRTL,
  words: state.glob.language.words
});

export default connect(mapStateToProps)(OffersScreen);

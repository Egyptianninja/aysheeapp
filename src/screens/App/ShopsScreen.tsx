import { debounce } from 'lodash';
import * as React from 'react';
import { Query } from 'react-apollo';
import { Dimensions, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { Loading, Noresult } from '../../componenets';
import ShopItem from '../../componenets/ShopsScreen';
import getShopsWithOffers from '../../graphql/query/getShops';
import { getDBNextPosts } from '../../utils';
const { width } = Dimensions.get('window');
class ShopsScreen extends React.Component<any, any> {
  flatListRef: any;
  getDBNextPosts: any;
  constructor(p: any) {
    super(p);
    this.getDBNextPosts = debounce(getDBNextPosts, 100);
    this.state = {
      refreshing: false
    };
  }

  render() {
    const { lang, words, isRTL } = this.props;
    return (
      <View style={{ flex: 1 }}>
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
              return <Noresult />;
            }
            const shops = data.getShopsWithOffers;
            if (shops && shops.length === 0) {
              return <Noresult />;
            }

            return (
              <View style={{ flex: 1, paddingTop: 5, backgroundColor: '#eee' }}>
                <FlatList
                  ref={(ref: any) => {
                    this.flatListRef = ref;
                  }}
                  onRefresh={() => refetch()}
                  // onEndReached={() =>
                  //   this.getDBNextPosts(
                  //     fetchMore,
                  //     'getMyNotifications',
                  //     shops.length
                  //   )
                  // }
                  refreshing={this.state.refreshing}
                  data={shops}
                  renderItem={({ item }: any) => (
                    <ShopItem
                      user={item}
                      navigation={this.props.navigation}
                      width={width}
                      words={words}
                    />
                  )}
                  numColumns={1}
                  keyExtractor={(item: any) => item._id}
                  removeClippedSubviews={true}
                  disableVirtualization={false}
                  onEndReachedThreshold={0.5}
                />
              </View>
            );
          }}
        </Query>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isRTL: state.glob.isRTL,
  lang: state.glob.languageName,
  words: state.glob.language.words,
  user: state.user.user
});

export default connect(mapStateToProps)(ShopsScreen);

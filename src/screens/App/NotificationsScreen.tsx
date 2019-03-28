import { debounce } from 'lodash';
import * as React from 'react';
import { Query } from 'react-apollo';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Loading, Noresult, NotificationItem } from '../../componenets';
import getMyNotifications from '../../graphql/query/getMyNotifications';
import { getDBNextPosts } from '../../utils';

class NotificationsScreen extends React.Component<any, any> {
  flatListRef: any;
  getDBNextPosts: any;
  constructor(p: any) {
    super(p);
    this.getDBNextPosts = debounce(getDBNextPosts, 100);
    this.state = {
      refreshing: false
    };
  }

  renderAuthRequire = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('PhoneScreen')}
          style={{
            width: 150,
            height: 40,
            backgroundColor: '#7678ED',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { lang, words, isRTL } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {!this.props.isAuthenticated && this.renderAuthRequire()}
        {this.props.isAuthenticated && (
          <Query
            query={getMyNotifications}
            variables={{ cursor: 0 }}
            fetchPolicy="network-only"
          >
            {({ loading, error, data, fetchMore, refetch }) => {
              if (loading) {
                return <Loading />;
              }
              if (error) {
                return <Noresult />;
              }
              const notis = data.getMyNotifications.data;
              if (notis && notis.length === 0) {
                return <Noresult />;
              }
              return (
                <View
                  style={{ flex: 1, paddingTop: 5, backgroundColor: '#eee' }}
                >
                  <FlatList
                    ref={(ref: any) => {
                      this.flatListRef = ref;
                    }}
                    onRefresh={() => refetch()}
                    onEndReached={() =>
                      this.getDBNextPosts(
                        fetchMore,
                        'getMyNotifications',
                        notis.length
                      )
                    }
                    refreshing={this.state.refreshing}
                    data={notis}
                    renderItem={({ item }: any) => (
                      <NotificationItem
                        navigation={this.props.navigation}
                        item={item}
                        lang={lang}
                        isRTL={isRTL}
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
        )}
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isRTL: state.glob.isRTL,
  lang: state.glob.languageName,
  words: state.glob.language.words,
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(NotificationsScreen);

import { debounce } from 'lodash';
import * as React from 'react';
import { Query } from 'react-apollo';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Loading, Noresult, NotificationItem } from '../../componenets';
import { AuthRequire } from '../../componenets/User/AuthRequire';
import getMyNotifications from '../../graphql/query/getMyNotifications';
import { initNotifications } from '../../store/actions/globActions';
import { getDBNextPosts } from '../../utils';

class NotificationsScreen extends React.Component<any, any> {
  flatListRef: any;
  getDBNextPosts: any;
  subs: any;
  constructor(p: any) {
    super(p);
    this.getDBNextPosts = debounce(getDBNextPosts, 100);
    this.state = {
      refreshing: false
    };
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('didFocus', () => {
        this.props.initNotifications();
      }),
      this.props.navigation.addListener('willBlur', () => {
        //
      })
    ];
  }

  componentWillUnmount() {
    this.subs.forEach((sub: any) => sub.remove());
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
          onPress={() =>
            this.props.navigation.navigate('PhoneScreen', {
              origin: 'notification'
            })
          }
          style={{
            width: 150,
            height: 40,
            backgroundColor: '#ddd',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.27,
            shadowRadius: 3.65,

            elevation: 5
          }}
        >
          <Text style={{ color: '#7678ED', fontSize: 16, fontWeight: 'bold' }}>
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
        {!this.props.isAuthenticated && (
          <AuthRequire
            navigation={this.props.navigation}
            origin="notification"
          />
        )}
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
                return <Noresult title={words.noresults} />;
              }
              const notis = data.getMyNotifications.data;
              if (notis && notis.length === 0) {
                return <Noresult title={words.noresults} />;
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

export default connect(
  mapStateToProps,
  { initNotifications }
)(NotificationsScreen);

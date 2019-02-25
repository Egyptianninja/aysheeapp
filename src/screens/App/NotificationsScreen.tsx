import * as React from 'react';
import { View, FlatList } from 'react-native';
import { Query } from 'react-apollo';
import { debounce } from 'lodash';
import getMyNotifications from '../../graphql/query/getMyNotifications';
import { getDBNextPosts } from '../../utils';
import { NotificationItem, Loading } from '../../componenets';
import { connect } from 'react-redux';

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

  render() {
    const { lang, words } = this.props;
    return (
      <View style={{ flex: 1 }}>
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
              return <View />;
            }
            const notis = data.getMyNotifications.data;
            return (
              <View style={{ flex: 1, marginTop: 8 }}>
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
  lang: state.glob.languageName,
  words: state.glob.language.words
});

export default connect(mapStateToProps)(NotificationsScreen);

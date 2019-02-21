import * as React from 'react';
import { View, Text } from 'react-native';
import { debounce } from 'lodash';
import { Notifications } from 'expo';
import { connect } from 'react-redux';
import { Query, graphql } from 'react-apollo';
import HomeView from './HomeView';
import getTimeLine from '../../graphql/query/getTimeLine';
import refreshToken from '../../graphql/mutation/refreshToken';
import favoritePost from '../../graphql/mutation/favoritePost';
import notificationSub from '../../graphql/mutation/notificationSub';
import * as store from '../../store/getStore';
import { setBuckets } from '../../store/actions/postActions';
import {
  getNextPosts,
  getNewPosts,
  readyPosts,
  getTimeLineBuckets,
  Message,
  registerForPushNotificationsAsync
} from '../../utils';
import { Loading, Noresult } from '../../componenets';

class Home extends React.Component<any, any> {
  static navigationOptions = { header: null };

  getNextPosts: any;
  constructor(props: any) {
    super(props);
    this.getNextPosts = debounce(getNextPosts, 100);

    this.state = {
      notification: null,
      query: null,
      loading: false,
      rest: {},
      pushToken: null
    };
  }

  async componentDidMount() {
    if (this.props.isAuthenticated) {
      const pushToken = await registerForPushNotificationsAsync();
      await this.setState({ pushToken });
    }
    if (this.state.pushToken) {
      await this.props.notificationSub({
        variables: {
          userId: this.props.user._id,
          pushToken: this.state.pushToken
        }
      });
    }
    Notifications.addListener(this.handleNotification);
  }

  handleNotification = (notification: any) => {
    const postId = notification.data.postId;
    this.props.navigation.navigate('ItemScreen', {
      postId,
      word: this.props.words,
      lang: this.props.lang
    });
  };
  addFilter = (itemKind: any, value: any) => {
    this.setState({ rest: { ...this.state.rest, [itemKind]: value } });
  };
  removeFilter = (itemKind: any) => {
    const filters = this.state.rest;
    delete filters[itemKind];
    this.setState({
      rest: filters
    });
  };
  removeAllFilters = () => {
    this.setState({
      rest: {}
    });
  };

  render() {
    const { rest } = this.state;
    const { lang, words, query } = this.props;
    return (
      <View style={{ flex: 1, paddingHorizontal: 5 }}>
        <Query
          query={getTimeLine}
          variables={{ ...rest, query }}
          fetchPolicy="network-only"
        >
          {({ loading, error, data, fetchMore, refetch }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              return <Text>{error}</Text>;
            }
            const postsQuery = data.getTimeLine.posts;

            if (postsQuery && postsQuery.length === 0) {
              return <Noresult lang={lang} title={words.noresults} />;
            }

            const posts = readyPosts(postsQuery, 200, 79, lang);
            const buckets = getTimeLineBuckets(rest.categoryId, store, data);
            // this.props.setBuckets(buckets);

            return (
              <HomeView
                addFilter={this.addFilter}
                removeFilter={this.removeFilter}
                removeAllFilters={this.removeAllFilters}
                data={data}
                fetchMore={fetchMore}
                refetch={refetch}
                posts={posts}
                buckets={buckets}
                lang={this.props.lang}
                categories={this.props.categories}
                words={this.props.words}
                isAuthenticated={this.props.isAuthenticated}
                user={this.props.user}
                query={this.props.query}
                favoritePost={this.props.favoritePost}
                rest={this.props.rest}
                setBuckets={this.props.setBuckets}
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
  categories: state.glob.language.category,
  words: state.glob.language.words,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
  query: state.post.query
});

export default connect(
  mapStateToProps,
  { setBuckets }
)(
  graphql(refreshToken, {
    name: 'refreshToken'
  })(
    graphql(favoritePost, {
      name: 'favoritePost'
    })(
      graphql(notificationSub, {
        name: 'notificationSub'
      })(Home)
    )
  )
);

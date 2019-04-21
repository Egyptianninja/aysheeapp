import MasonryList from '@appandflow/masonry-list';
import { debounce } from 'lodash';
import * as React from 'react';
import { Query, graphql } from 'react-apollo';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { HomeLoading, Noresult } from '../../componenets';
import ItemView from './ItemViewSmall';

import unpublishControlPost from '../../graphql/mutation/control/unpublishControlPost';
import publishControlPost from '../../graphql/mutation/control/publishControlPost';
import blockControlUser from '../../graphql/mutation/control/blockControlUser';
import unblockControlUser from '../../graphql/mutation/control/unblockControlUser';

import getControlPosts from '../../graphql/query/getControlPosts';
import { setControlBuckets } from '../../store/actions/postActions';
import * as store from '../../store/getStore';
import {
  getNextPosts,
  isTablet,
  readyPosts,
  getControlBuckets
} from '../../utils';
import ControlFilterScroll from './ControlFilterScroll';
import Menu from './menu/Menu';

class ControlScreen extends React.Component<any, any> {
  static navigationOptions = { header: null };
  flatListRef: any;
  getNextPosts: any;
  constructor(props: any) {
    super(props);
    this.getNextPosts = debounce(getNextPosts, 100);

    this.state = {
      isMenuModalVisible: false,
      refreshing: false,
      modalPost: null,
      rest: {}
    };
  }

  showMenuModal = (post: any) => {
    this.setState({ isMenuModalVisible: true, modalPost: post });
  };
  hideMenuModal = (payload?: any) => {
    if (payload) {
      const { menuId, postId, post } = payload;
      this.setState({
        isMenuModalVisible: false,
        hideMenuData: { menuId, postId, post }
      });
    } else {
      this.setState({
        isMenuModalVisible: false,
        hideMenuData: null
      });
    }
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
    this.props.delQuery();
  };
  removeAllCategoryFilters = () => {
    const newrest = { categoryId: this.state.rest.categoryId };
    this.setState({
      rest: newrest
    });
  };
  selectePost = (post: any, word: any, lang: any, isRTL: any) => {
    this.props.navigation.navigate('ItemScreen', { post, word, lang, isRTL });
  };

  render() {
    const { rest } = this.state;
    const { lang, words, isRTL } = this.props;
    const postId = this.state.modalPost ? this.state.modalPost.id : null;

    return (
      <View style={{ flex: 1, paddingHorizontal: 5 }}>
        <Menu
          post={this.state.modalPost}
          isMenuModalVisible={this.state.isMenuModalVisible}
          hideMenuModal={this.hideMenuModal}
          postId={postId}
          word={words}
          isRTL={isRTL}
          isAuthenticated={this.props.isAuthenticated}
          user={this.props.user}
          unpublishControlPost={this.props.unpublishControlPost}
          publishControlPost={this.props.publishControlPost}
          blockControlUser={this.props.blockControlUser}
          unblockControlUser={this.props.unblockControlUser}
        />
        <ControlFilterScroll
          lang={this.props.lang}
          addFilter={this.addFilter}
          removeFilter={this.removeFilter}
          removeAllFilters={this.removeAllFilters}
          {...this.state}
        />
        <Query
          query={getControlPosts}
          variables={{ ...rest }}
          onCompleted={data => {
            const buckets = getControlBuckets(
              store,
              data,
              'getControlPosts'
            ).filter((x: any) => x);
            this.props.setControlBuckets(buckets);
          }}
        >
          {({ loading, error, data, fetchMore, refetch }) => {
            if (loading) {
              return <HomeLoading categoryId={rest.categoryId} />;
            }
            if (error) {
              return <Noresult title="error" top={100} />;
            }

            const postsQuery = data.getControlPosts.posts;
            const posts =
              postsQuery.length > 0
                ? readyPosts(postsQuery, isTablet() ? 400 : 200, 79, lang)
                : postsQuery;

            return (
              <React.Fragment>
                <MasonryList
                  data={posts}
                  ref={(ref: any) => {
                    this.flatListRef = ref;
                  }}
                  scrollEventThrottle={16}
                  contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 60
                  }}
                  onRefresh={() => refetch()}
                  refreshing={this.state.refreshing}
                  onEndReached={async () => {
                    this.getNextPosts(data, fetchMore, 'getControlPosts');
                  }}
                  renderItem={({ item }: any) => (
                    <ItemView
                      post={item}
                      pressed={this.state.pressed}
                      navigation={this.props.navigation}
                      showMenuModal={this.showMenuModal}
                      selectePost={this.selectePost}
                      word={this.props.words}
                      isRTL={isRTL}
                      lang={lang}
                    />
                  )}
                  getHeightForItem={({ item }: any) => item.height}
                  ListHeaderComponent={() => {
                    if (posts.length === 0) {
                      return <Noresult title={words.noresults} />;
                    } else {
                      return null;
                    }
                  }}
                  numColumns={2}
                  keyExtractor={(item: any) => item.id}
                  onEndReachedThreshold={0.5}
                  removeClippedSubviews={true}
                  disableVirtualization={false}
                />
              </React.Fragment>
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
  categories: state.glob.language.category,
  words: state.glob.language.words,
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  {
    setControlBuckets
  }
)(
  graphql(unpublishControlPost, {
    name: 'unpublishControlPost'
  })(
    graphql(publishControlPost, {
      name: 'publishControlPost'
    })(
      graphql(blockControlUser, {
        name: 'blockControlUser'
      })(
        graphql(unblockControlUser, {
          name: 'unblockControlUser'
        })(ControlScreen)
      )
    )
  )
);

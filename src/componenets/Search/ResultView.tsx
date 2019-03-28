import * as React from 'react';
import { Query } from 'react-apollo';
import { debounce } from 'lodash';
import { connect } from 'react-redux';
import { HomeLoading, Noresult } from '../../componenets';
import ItemViewSmall from '../../componenets/ItemViewSmall';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import search from '../../graphql/query/search';
import { delQuery } from '../../store/actions/postActions';
import { readyPosts, isTablet, getNextPosts } from '../../utils';
import ItemViewSearch from './ItemViewSearch';

class ResultView extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.category !== prevState.category) {
      return { category: nextProps.category };
    } else {
      return { ...prevState };
    }
  }
  getNextPosts: any;
  constructor(props: any) {
    super(props);
    this.getNextPosts = debounce(getNextPosts, 100);

    this.state = {
      refreshing: false,
      query: null,
      category: null
    };
  }

  rendderSearchIn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.hideSearch();
          this.props.removecategory();
          this.props.delQuery();
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 25,
          zIndex: 100,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 50,
          borderBottomLeftRadius: 12.5,
          borderBottomRightRadius: 12.5
        }}
      >
        <Text
          style={{
            color: '#888'
          }}
        >
          Search in{' '}
          {this.state.category ? this.state.category.name : 'all categories'}
        </Text>
        <Text
          style={{
            position: 'absolute',
            right: 15,
            color: '#888'
          }}
        >
          X
        </Text>
      </TouchableOpacity>
    );
  };
  selectePost = (post: any, word: any, lang: any, isRTL: any) => {
    this.props.navigation.navigate('ItemScreen', { post, word, lang, isRTL });
  };

  renderQuery = ({ query, isRTL, words, lang }: any) => {
    if (!query || query === '') {
      return (
        <ScrollView style={{}} contentContainerStyle={{ height: '100%' }} />
      );
    }
    return (
      <Query
        query={search}
        variables={{
          query,
          categoryId: this.state.category ? this.state.category.id : undefined
        }}
      >
        {({ loading, error, data, fetchMore, refetch }) => {
          if (loading) {
            return <HomeLoading />;
          }
          if (error || !data.search.posts) {
            return <Noresult title="error" />;
          }
          const postsQuery = data.search.posts;

          if (postsQuery && postsQuery.length === 0) {
            return <Noresult isRTL={isRTL} title={words.noresults} />;
          }
          const posts = readyPosts(
            postsQuery,
            isTablet() ? 400 : 200,
            79,
            lang
          );
          return (
            <FlatList
              data={posts}
              scrollEventThrottle={16}
              contentContainerStyle={{
                paddingTop: 30,
                paddingBottom: 35
              }}
              showsVerticalScrollIndicator={false}
              onRefresh={() => refetch()}
              refreshing={this.state.refreshing}
              onEndReached={async () => {
                this.getNextPosts(data, fetchMore, 'search');
              }}
              renderItem={({ item }: any) => (
                <ItemViewSearch
                  post={item}
                  navigation={this.props.navigation}
                  selectePost={this.selectePost}
                  word={this.props.words}
                  isRTL={isRTL}
                  lang={lang}
                />
              )}
              numColumns={1}
              keyExtractor={(item: any) => item.id}
              onEndReachedThreshold={0.5}
              removeClippedSubviews={true}
              disableVirtualization={false}
            />
          );
        }}
      </Query>
    );
  };

  render() {
    const { lang, words, query, isRTL } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#eee'
        }}
      >
        {this.rendderSearchIn()}
        {this.renderQuery({ query, isRTL, words, lang })}
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  lang: state.glob.languageName,
  isRTL: state.glob.isRTL,
  words: state.glob.language.words,
  query: state.post.query
});

export default connect(
  mapStateToProps,
  { delQuery }
)(ResultView);

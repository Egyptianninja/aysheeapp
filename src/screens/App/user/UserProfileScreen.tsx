import * as React from 'react';
import { View, Dimensions, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Query, graphql } from 'react-apollo';
import MasonryList from '@appandflow/masonry-list';
import { debounce } from 'lodash';
import getUserPosts from '../../../graphql/query/getUserPosts';
import { getNextPosts, readyUserPosts } from '../../../utils';
import { ItemOwnerView, Avatar, Loading, ItemView } from '../../../componenets';
import favoritePost from '../../../graphql/mutation/favoritePost';

const { width } = Dimensions.get('window');

class UserProfileScreen extends React.Component<any, any> {
  flatListRef: any;
  getNextPosts: any;
  constructor(p: any) {
    super(p);
    this.getNextPosts = debounce(getNextPosts, 100);
    this.state = {
      refreshing: false
    };
  }

  selectePost = (post: any, word: any, lang: any) => {
    this.props.navigation.navigate('UserItemScreen', { post, word, lang });
  };

  render() {
    const { lang, words } = this.props;
    const user = this.props.navigation.getParam('user');
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <View
          style={{
            position: 'absolute',
            left: 20,
            top: 175 / 2 - 40,
            zIndex: 200
          }}
        >
          {!user.avatar && (
            <View>
              <Avatar name={user.uniquename} />
            </View>
          )}
          {user.avatar && (
            <Image
              style={{
                height: 80,
                width: 80,
                borderRadius: 40
              }}
              source={{
                uri: `http://res.cloudinary.com/arflon/image/upload/w_${100}/${
                  user.avatar
                }`
              }}
            />
          )}
        </View>
        <View>
          {!user.headerPhoto && (
            <View style={{ width, height: 175, backgroundColor: '#6FA7D5' }} />
          )}
          {user.headerPhoto && (
            <Image
              source={{
                uri: `http://res.cloudinary.com/arflon/image/upload/w_${100}/${
                  user.avatar
                }`
              }}
              style={{
                flex: 1,
                width,
                height: 175,
                resizeMode: 'cover'
              }}
            />
          )}
          <View
            style={{
              position: 'absolute',
              left: 120,
              top: 175 / 2 - 20
            }}
          >
            {!user.name && (
              <Text
                style={{
                  fontFamily: 'cairo-regular',
                  color: '#fff',
                  fontSize: 22
                }}
              >
                @{user.uniquename}
              </Text>
            )}
            {user.name && (
              <Text
                style={{
                  fontFamily: 'cairo-regular',
                  color: '#fff',
                  fontSize: 22
                }}
              >
                {user.name}
              </Text>
            )}
          </View>
        </View>
        <Query
          query={getUserPosts}
          variables={{ userId: user._id }}
          // fetchPolicy="network-only"
        >
          {({ loading, error, data, fetchMore, refetch }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              console.log(`Error!: ${error}`);
            }
            const { posts } = data.getUserPosts;
            const rPosts = readyUserPosts(posts, 200, 79, lang);
            return (
              <MasonryList
                ref={(ref: any) => {
                  this.flatListRef = ref;
                }}
                onRefresh={() => refetch()}
                onEndReached={() =>
                  this.getNextPosts(data, fetchMore, 'getUserPosts')
                }
                refreshing={this.state.refreshing}
                data={rPosts}
                renderItem={({ item }: any) => (
                  <ItemView
                    post={item}
                    navigation={this.props.navigation}
                    selectePost={this.selectePost}
                    favoritePost={this.props.favoritePost}
                    word={words}
                    lang={lang}
                  />
                )}
                getHeightForItem={({ item }: any) => item.height}
                numColumns={2}
                keyExtractor={(item: any) => item.id}
                removeClippedSubviews={true}
                windowSize={21}
                disableVirtualization={false}
                onEndReachedThreshold={0.5}
              />
            );
          }}
        </Query>
      </View>
    );
  }
}
const mapStateToProps = (state: any) => ({
  categories: state.glob.language.category,
  isAuthenticated: state.user.isAuthenticated,
  lang: state.glob.languageName,
  words: state.glob.language.words
});

export default connect(mapStateToProps)(
  graphql(favoritePost, {
    name: 'favoritePost'
  })(UserProfileScreen)
);

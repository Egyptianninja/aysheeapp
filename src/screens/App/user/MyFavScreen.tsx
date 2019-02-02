import * as React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Query, graphql } from "react-apollo";
import MasonryList from "@appandflow/masonry-list";
import { debounce } from "lodash";
import getMyFavoritePosts from "../../../graphql/query/getMyFavoritePosts";
import { getDBNextPosts, readyUserPosts } from "../../../utils";
import Loading from "../../../componenets/UserFavScreen/Loading";
import Item from "../../../componenets/UserFavScreen/ItemFavView";
import unFavoritePost from "../../../graphql/mutation/unFavoritePost";

class UserFavScreen extends React.Component<any, any> {
  flatListRef: any;
  getDBNextPosts: any;

  constructor(p: any) {
    super(p);
    this.getDBNextPosts = debounce(getDBNextPosts, 100);
    this.state = {
      refreshing: false
    };
  }

  selectePost = (post: any, word: any, lang: any) => {
    this.props.navigation.navigate("ItemScreen", { post, word, lang });
  };

  render() {
    const { theme, lang, words } = this.props;
    const itemColors = theme.color.item;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Query
          query={getMyFavoritePosts}
          variables={{ cursor: 0 }}
          fetchPolicy="network-only"
        >
          {({ loading, error, data, fetchMore, refetch }) => {
            if (loading) {
              return <Loading />;
            }
            if (error) {
              return `Error!: ${error}`;
            }
            const posts = data.getMyFavoritePosts.data;
            const rPosts = readyUserPosts(posts, 200, 79, lang);
            return (
              <MasonryList
                ref={(ref: any) => {
                  this.flatListRef = ref;
                }}
                onRefresh={() => refetch()}
                onEndReached={() =>
                  this.getDBNextPosts(
                    fetchMore,
                    "getMyFavoritePosts",
                    rPosts.length
                  )
                }
                refreshing={this.state.refreshing}
                data={rPosts}
                renderItem={({ item }: any) => (
                  <Item
                    color={itemColors}
                    post={item}
                    unFavoritePost={this.props.unFavoritePost}
                    navigation={this.props.navigation}
                    selectePost={this.selectePost}
                    word={words}
                    lang={lang}
                  />
                )}
                getHeightForItem={({ item }: any) => item.height}
                numColumns={2}
                keyExtractor={(item: any) => item._id}
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
  theme: state.glob.theme,
  isAuthenticated: state.user.isAuthenticated,
  lang: state.glob.languageName,
  words: state.glob.language.words
});

export default connect(mapStateToProps)(
  graphql(unFavoritePost, {
    name: "unFavoritePost"
  })(UserFavScreen)
);

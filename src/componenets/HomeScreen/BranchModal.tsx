import { debounce } from 'lodash';
import { Ionicons } from '@expo/vector-icons';

import * as React from 'react';
import { Query } from 'react-apollo';
import { FlatList, View, TouchableOpacity, Text, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { HomeLoading, Noresult } from '..';
import getBranchItems from '../../graphql/query/getBranchItems';
import { getNextPosts, isTablet, readyPosts } from '../../utils';
import SwiperView from '../ItemView/SwiperView';
import { Constants } from 'expo';

class BranchModal extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.isBranchModalVisible !== prevState.isBranchModalVisible) {
      return { isBranchModalVisible: nextProps.isBranchModalVisible };
    } else {
      return { ...prevState };
    }
  }
  getNextPosts: any;

  constructor(props: any) {
    super(props);
    this.getNextPosts = debounce(getNextPosts, 500);

    this.state = {
      isBranchModalVisible: false,
      refreshing: false,
      loading: false
    };
  }

  renderHeader = (title: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: this.props.width,
          height: 40,
          backgroundColor: '#8E90F0',
          paddingHorizontal: 20,
          alignSelf: 'center'
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.hideBranchModal()}
          style={{
            position: 'absolute',
            top: Platform.OS === 'android' ? 5 : undefined,
            left: 8,
            zIndex: 10,
            width: 32,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Ionicons name="ios-close" size={40} color="#fff" />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 18
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    );
  };

  renderBranchQuery = ({ variables, lang, isRTL, words }: any) => {
    return (
      <Query
        query={getBranchItems}
        variables={{ ...variables, ...this.props.rest }}
      >
        {({ loading, error, data, fetchMore, refetch }: any) => {
          if (loading) {
            return <HomeLoading />;
          }
          if (error) {
            return <Noresult title="network error" />;
          }
          if (!data.getBranchItems || !data.getBranchItems.posts) {
            refetch();
            return <HomeLoading />;
          }
          const postsQuery =
            data.getBranchItems && data.getBranchItems.posts
              ? data.getBranchItems.posts
              : [];
          const posts =
            postsQuery.length > 0
              ? readyPosts(postsQuery, isTablet() ? 800 : 600, 79, lang)
              : postsQuery;
          return (
            <FlatList
              data={posts}
              scrollEventThrottle={16}
              contentContainerStyle={{
                paddingTop: 10,
                paddingBottom: 20
              }}
              style={{ flex: 1 }}
              onRefresh={() => refetch()}
              refreshing={this.state.refreshing}
              onEndReached={() => {
                return null;
                // this.getNextPosts(data, fetchMore, 'getBranchItems');
              }}
              renderItem={({ item }: any) => (
                <SwiperView
                  post={item}
                  navigation={this.props.navigation}
                  word={this.props.words}
                  isRTL={isRTL}
                  lang={lang}
                  addFav={this.props.addFav}
                  addLike={this.props.addLike}
                  saveFav={this.props.saveFav}
                  likes={this.props.likes}
                  favoorites={this.props.favoorites}
                  isAuthenticated={this.props.isAuthenticated}
                  favs={this.props.favs}
                  likePost={this.props.likePost}
                  dislikePost={this.props.dislikePost}
                  favoritePost={this.props.favoritePost}
                  unFavoritePost={this.props.unFavoritePost}
                  showPhotoModal={() => null}
                  width={this.props.width}
                />
              )}
              ListHeaderComponent={() => {
                if (posts.length === 0) {
                  return <Noresult title={words.noresults} />;
                } else {
                  return <View />;
                }
              }}
              numColumns={1}
              keyExtractor={(item: any) => item.id}
              onEndReachedThreshold={0}
              removeClippedSubviews={false}
              disableVirtualization={true}
            />
          );
        }}
      </Query>
    );
  };

  render() {
    const { lang, words, isRTL } = this.props;
    const vrbs = {
      ...this.props.rest,
      branch: this.props.branch,
      categoryIds: this.props.categoryIds
    };

    return (
      <Modal
        isVisible={this.state.isBranchModalVisible}
        onBackdropPress={() => this.props.hideBranchModal()}
        onBackButtonPress={() => this.props.hideBranchModal()}
        backdropOpacity={0.4}
        useNativeDriver={true}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        hideModalContentWhileAnimating={true}
        style={{ flex: 1, margin: 0, top: Constants.statusBarHeight }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#eee',
            height: this.props.height - 75,
            bottom: 0
          }}
        >
          {this.renderHeader(this.props.branchTitle)}
          {this.state.loading && <HomeLoading />}
          {!this.state.loading &&
            this.renderBranchQuery({
              variables:
                this.props.categoryIds.length > 0
                  ? {
                      branch: this.props.branch,
                      categoryIds: this.props.categoryIds
                    }
                  : { branch: this.props.branch },
              isRTL,
              lang,
              words
            })}
        </View>
      </Modal>
    );
  }
}

export default BranchModal;

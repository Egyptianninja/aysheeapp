import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { Text, View, TouchableOpacity } from 'react-native';
import { rtlos, StyleSheet, getDate, onShareSimple } from '../../utils';
import PhotoSliderHome from '../HomeScreen/PhotoSliderHome';
import { getproperties, getJobProperties } from '../ItemScreen';
import { Details } from './Details';
import SpringIcon from '../Common/SpringIcon';
export default class SwiperView extends React.PureComponent<any, any> {
  state = {
    viewDetails: false,
    postLikes: 0,
    commentsQty: 0,
    like: false,
    fav: false
  };

  componentDidMount() {
    this.setState({
      postLikes: this.props.post.likes,
      like: this.props.likes.includes(this.props.post.id),
      fav: this.props.favs.includes(this.props.post.id),
      commentsQty: this.props.post.commentsQty
    });
  }

  getTags = (data: any) => {
    const newObject = data.filter((a: any) => a.name === 'isnew')[0];
    const saleObject = data.filter((a: any) => a.name === 'issale')[0];
    const furntObject = data.filter((a: any) => a.name === 'isfurnishered')[0];
    const fulltimeObject = data.filter((a: any) => a.name === 'isfullTime')[0];
    const warrantyObject = data.filter((a: any) => a.name === 'iswarranty')[0];
    return {
      newObject,
      saleObject,
      furntObject,
      fulltimeObject,
      warrantyObject
    };
  };

  render() {
    const {
      post,
      post: {
        imageWidth,
        imageHeight,
        subTitle,
        subBody,
        uri,
        uris,
        price,
        currency
      },
      word,
      showPhotoModal,
      isAuthenticated,
      isRTL,
      addFav,
      addLike,
      likePost,
      dislikePost,
      favoritePost,
      unFavoritePost,
      selectePost,
      saveFav,
      showCommentsModal,
      width
    } = this.props;
    const pdata = getproperties(post);
    const jdata = getJobProperties(post);
    const {
      newObject,
      saleObject,
      furntObject,
      fulltimeObject,
      warrantyObject
    } = this.getTags(pdata);

    const ratio = imageHeight / imageWidth;
    const liked = this.state.like;
    const faved = this.state.fav;

    return (
      <View
        style={{
          marginBottom: 10,
          backgroundColor: '#fff'
        }}
      >
        <View style={styles.interContainer}>
          {uris && uris.length > 0 && (
            <PhotoSliderHome
              photos={uris}
              showPhotoModal={showPhotoModal}
              ratio={ratio}
              showModal={() => null}
            />
          )}

          {!uri && (
            <View
              style={[
                styles.center,
                {
                  width,
                  height: width / 2,
                  backgroundColor: '#A7A9F3'
                }
              ]}
            >
              <Text style={{ fontSize: 30, color: '#fff', fontWeight: 'bold' }}>
                {subTitle}
              </Text>
            </View>
          )}
        </View>
        <View style={{ padding: 10, paddingHorizontal: 15 }}>
          <View
            style={{
              flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingBottom: 10,
              paddingHorizontal: 20
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ like: !this.state.like });
                addLike(post.id);
                if (liked) {
                  this.setState({ postLikes: this.state.postLikes - 1 });
                  dislikePost({
                    variables: {
                      postId: post.id
                    }
                  });
                } else {
                  this.setState({ postLikes: this.state.postLikes + 1 });
                  likePost({
                    variables: {
                      postId: post.id
                    }
                  });
                }
              }}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <SpringIcon
                icon="heart"
                iconout="heart-o"
                size={24}
                focused={liked}
                tintColor={liked ? '#E85255' : '#999'}
              />

              <Text
                style={{
                  fontSize: 14,
                  color: '#bbb',
                  position: 'absolute',
                  left: rtlos() === 3 ? undefined : 28,
                  right: rtlos() === 3 ? 28 : undefined,
                  bottom: 2
                }}
              >
                {this.state.postLikes < 1 ? '' : this.state.postLikes}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => null}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <FontAwesome
                style={{ top: -3 }}
                name="comments-o"
                size={27}
                color="#bbb"
              />
              <Text
                style={{
                  fontSize: 14,
                  color: '#bbb',
                  position: 'absolute',
                  left: rtlos() === 3 ? undefined : 30,
                  right: rtlos() === 3 ? 30 : undefined,
                  bottom: 2
                }}
              >
                {this.state.commentsQty < 1 ? '' : this.state.commentsQty}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                const message = post.price
                  ? `${post.title}
${post.body}
${post.price}`
                  : `${post.title}
${post.body}`;
                const url = post.uri ? post.uri : '';
                await onShareSimple({ message, url });
              }}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <FontAwesome name="share-square-o" size={24} color="#bbb" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ fav: !this.state.fav });
                addFav(post.id);
                saveFav(post);
                if (isAuthenticated) {
                  if (faved) {
                    unFavoritePost({
                      variables: {
                        postId: post.id
                      }
                    });
                  } else {
                    favoritePost({
                      variables: {
                        postId: post.id
                      }
                    });
                  }
                }
              }}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <SpringIcon
                icon="bookmark"
                iconout="bookmark-o"
                faved={true}
                size={24}
                focused={faved}
                tintColor={faved ? '#7678ED' : '#bbb'}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1
            }}
          >
            <View
              style={{
                alignItems: rtlos() === 3 ? 'flex-end' : 'flex-start',
                paddingTop: 10
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: this.props.width - 30,
                  flexDirection: rtlos() === 3 ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <TouchableOpacity onPress={() => null}>
                  <Text
                    style={{
                      color: '#171717',
                      fontSize: 14,
                      fontWeight: 'bold'
                    }}
                  >
                    {subTitle}
                  </Text>
                </TouchableOpacity>
                <View>
                  {(price || price === 0) && (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
                        alignItems: 'center'
                      }}
                    >
                      <Text
                        style={{
                          color: '#26A65B',
                          fontWeight: 'bold',
                          opacity: 0.9,
                          fontSize: 16
                        }}
                      >
                        {price.toLocaleString('en')}
                      </Text>
                      <Text
                        style={{
                          color: '#777',
                          paddingTop: 5,
                          fontSize: 10,
                          fontWeight: '200'
                        }}
                      >
                        {' '}
                        {currency}
                      </Text>
                    </View>
                  )}
                  {post.isoffer && (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center'
                      }}
                    >
                      <Text
                        style={{
                          color: post.status === 2 ? '#26A65B' : '#373737',
                          fontSize: 12,
                          fontWeight: 'bold'
                        }}
                      >
                        {getDate(post.start)}
                      </Text>
                      <Text
                        style={{
                          color: post.status === 2 ? '#26A65B' : '#373737',
                          fontSize: 12,
                          fontWeight: 'bold'
                        }}
                      >
                        {getDate(post.end)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              {!this.state.viewDetails && (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ viewDetails: !this.state.viewDetails })
                  }
                  style={{
                    alignItems: rtlos() === 3 ? 'flex-start' : 'flex-end',
                    alignSelf: rtlos() === 3 ? 'flex-start' : 'flex-end'
                  }}
                >
                  <Text
                    style={{
                      color: '#373737',
                      fontSize: 14,
                      textAlign: rtlos() === 3 ? 'left' : 'right'
                    }}
                  >
                    {subBody}
                  </Text>
                  <FontAwesome
                    style={{ paddingTop: 2, paddingHorizontal: 5 }}
                    name="angle-down"
                    size={28}
                    color="#777"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {this.state.viewDetails && (
            <Details
              word={word}
              post={post}
              fulltimeObject={fulltimeObject}
              newObject={newObject}
              saleObject={saleObject}
              furntObject={furntObject}
              warrantyObject={warrantyObject}
              isRTL={isRTL}
              pdata={pdata}
              jdata={jdata}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  interContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

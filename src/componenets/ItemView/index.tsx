import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { Text, View, TouchableOpacity } from 'react-native';
import { rtlos, StyleSheet, getDate, onShareSimple } from '../../utils';
import PhotoSliderHome from '../HomeScreen/PhotoSliderHome';
import { AvatarCircle } from '../Avatar';
import { getproperties, getJobProperties } from '../ItemScreen';
import { Details } from './Details';
import SpringIcon from '../../componenets/Common/SpringIcon';
export default class ItemViewSmall extends React.PureComponent<any, any> {
  state = {
    viewDetails: false,
    postLikes: 0,
    like: false,
    fav: false
  };

  componentDidMount() {
    this.setState({
      postLikes: this.props.post.likes,
      like: this.props.likes.includes(this.props.post.id),
      fav: this.props.favs.includes(this.props.post.id)
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

  renderUser = ({ user, navigation, word, time }: any) => {
    return (
      <View
        style={{
          flexDirection: rtlos() === 3 ? 'row' : 'row-reverse',
          paddingHorizontal: 10
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileScreen', { userId: user.id, user });
          }}
          style={{ paddingVertical: 10 }}
        >
          <AvatarCircle user={user} size={44} bwidth={1} />
        </TouchableOpacity>

        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 10,
            alignItems: rtlos() === 3 ? 'flex-start' : 'flex-end'
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProfileScreen', { userId: user.id, user });
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>
              {user.name ? user.name.substring(0, 25) : user.uniquename}{' '}
            </Text>
          </TouchableOpacity>
          <Text>{user.about ? user.about.substring(0, 35) : ''}</Text>
          <Text
            style={{
              fontSize: 10,
              color: '#777'
            }}
          >
            {time}
          </Text>
        </View>
      </View>
    );
  };

  getDistanceNumbers = (sort: any) => {
    const inkm: any = Number(sort[0]).toFixed(2);
    if (inkm > 1) {
      return {
        dist: inkm,
        unit: 'km'
      };
    } else {
      return {
        dist: Math.ceil(inkm * 100) * 10,
        unit: 'm'
      };
    }
  };

  render() {
    const {
      post,
      post: {
        imageWidth,
        imageHeight,
        subTitle,
        subBody,
        time,
        uri,
        uris,
        price,
        currency
      },
      word,
      navigation,
      locSort,
      showPhotoModal,
      isAuthenticated,
      isRTL,
      addFav,
      addLike,
      likes,
      favs,
      likePost,
      dislikePost,
      favoritePost,
      unFavoritePost,
      selectePost,
      showMapModal,
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
    const fratio = ratio > 1.25 ? 1.25 : ratio;
    const user = {
      name: post.userName,
      about: post.userAbout,
      avatar: post.userAvatar,
      uniquename: post.userUniquename,
      id: post.userId
    };
    // TODO: change to location
    const location = post.location;
    const locations = post.locations;
    // const liked = likes.includes(post.id);
    const liked = this.state.like;
    const faved = this.state.fav;

    // const faved = favs.includes(post.id);

    const dist =
      locSort && post.sort && post.sort.length > 0
        ? this.getDistanceNumbers(post.sort)
        : null;
    return (
      <View
        style={{
          // flex: 1,
          marginBottom: 8,
          backgroundColor: '#fff'
        }}
      >
        <View
          style={{
            flexDirection: rtlos() === 3 ? 'row-reverse' : 'row'
          }}
        >
          {(location || (locations && locations.length > 0)) && (
            <TouchableOpacity
              style={{
                flex: 3,
                flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => {
                showMapModal({
                  itemLocation: location,
                  itemLocations: locations,
                  itemTitle: post.subTitle
                });
              }}
            >
              <FontAwesome name="map-marker" size={33} color="#777" />

              {dist && (
                <Text
                  style={{
                    top: 10,
                    fontSize: 12,
                    color: '#777',
                    left: -2,
                    letterSpacing: 1
                  }}
                >
                  {dist.dist} {dist.unit}
                </Text>
              )}
              {!dist && (
                <Text
                  style={{
                    top: 10,
                    fontSize: 10,
                    color: '#797979',
                    left: -2,
                    letterSpacing: 1
                  }}
                >
                  {word.location}
                </Text>
              )}
            </TouchableOpacity>
          )}
          <View style={{ flex: 8 }}>
            {user.uniquename &&
              this.renderUser({ user, navigation, word, time })}
          </View>
        </View>

        <View style={styles.interContainer}>
          {uris && uris.length > 0 && (
            <PhotoSliderHome
              photos={uris}
              showPhotoModal={showPhotoModal}
              ratio={fratio}
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
                  fontSize: 12,
                  color: '#bbb',
                  position: 'absolute',
                  left: rtlos() === 3 ? undefined : 26,
                  right: rtlos() === 3 ? 26 : undefined,
                  bottom: 0
                }}
              >
                {this.state.postLikes}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => showCommentsModal(post)}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <FontAwesome
                style={{ top: -3 }}
                name="comments-o"
                size={27}
                color="#bbb"
              />
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
                <TouchableOpacity
                  onPress={() => {
                    selectePost(post, word, this.props.lang, isRTL);
                  }}
                >
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

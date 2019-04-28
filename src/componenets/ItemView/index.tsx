import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { Text, View, TouchableOpacity } from 'react-native';
import {
  rtlos,
  StyleSheet,
  getDate,
  distance,
  onShareSimple
} from '../../utils';
import PhotoSliderHome from '../HomeScreen/PhotoSliderHome';
import { AvatarCircle } from '../Avatar';
import { getproperties, getJobProperties } from '../ItemScreen';
import { Details } from './Details';
import SpringIcon from '../../componenets/Common/SpringIcon';
export default class ItemViewSmall extends React.PureComponent<any, any> {
  state = {
    viewDetails: false,
    postLikes: 0
  };

  componentDidMount() {
    this.setState({ postLikes: this.props.post.likes });
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
      <View style={{ flexDirection: 'row-reverse', paddingHorizontal: 10 }}>
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
            alignItems: 'flex-end'
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProfileScreen', { userId: user.id, user });
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{user.name} </Text>
          </TouchableOpacity>
          <Text>{user.about ? user.about.substring(0, 40) : ''}</Text>
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
      mylocation,
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
      saveFav
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
      id: post.userId
    };
    // TODO: change to location
    const location = post.location;
    const locations = post.locations;
    const liked = likes.includes(post.id);
    const faved = favs.includes(post.id);
    const dist =
      location && mylocation
        ? distance({
            lat1: mylocation.lat,
            lon1: mylocation.lon,
            lat2: location.lat,
            lon2: location.lon,
            unit: 'm'
          })
        : null;
    return (
      <View
        style={{
          flex: 1,
          marginBottom: 8,
          backgroundColor: '#fff'
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          {(location || locations) && (
            <TouchableOpacity
              style={{
                flex: 2,
                flexDirection: 'row',
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
                  {dist.dist}
                  {dist.unit}
                </Text>
              )}
              {!dist && (
                <Text
                  style={{
                    top: 10,
                    fontSize: 12,
                    color: '#777',
                    left: -2,
                    letterSpacing: 1
                  }}
                >
                  Map
                </Text>
              )}
            </TouchableOpacity>
          )}
          <View style={{ flex: 8 }}>
            {user.name && this.renderUser({ user, navigation, word, time })}
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
            <View style={styles.center}>
              <Text style={{ fontSize: 16 }}>{subTitle}</Text>
            </View>
          )}
        </View>
        <View style={{ padding: 10, paddingHorizontal: 15 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingBottom: 10
            }}
          >
            <TouchableOpacity
              onPress={() => {
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
            >
              <SpringIcon
                icon="heart"
                iconout="heart-o"
                size={26}
                focused={liked}
                tintColor={liked ? '#E85255' : '#999'}
              />

              <Text
                style={{
                  fontSize: 12,
                  color: '#999',
                  position: 'absolute',
                  left: 26,
                  bottom: 0
                }}
              >
                {this.state.postLikes}
              </Text>
            </TouchableOpacity>
            <FontAwesome
              style={{ top: -3 }}
              name="comments-o"
              size={30}
              color="#999"
            />
            <TouchableOpacity
              onPress={async () => {
                const message = `
            ${post.title}
            ${post.body}
            ${post.price}`;
                await onShareSimple(message);
              }}
            >
              <FontAwesome name="share-square-o" size={26} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
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
            >
              <SpringIcon
                icon="bookmark"
                iconout="bookmark-o"
                faved={true}
                size={26}
                focused={faved}
                tintColor={faved ? '#7678ED' : '#999'}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row'
            }}
          >
            <View style={{ flex: 2 }}>
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
                      color: post.status === 2 ? '#26A65B' : '#363636',
                      fontSize: 12,
                      fontWeight: 'bold'
                    }}
                  >
                    {getDate(post.start)}
                  </Text>
                  <Text
                    style={{
                      color: post.status === 2 ? '#26A65B' : '#363636',
                      fontSize: 12,
                      fontWeight: 'bold'
                    }}
                  >
                    {getDate(post.end)}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                flex: 7,
                alignItems: 'flex-end',
                paddingTop: 10
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  selectePost(post, word, this.props.lang, isRTL);
                }}
              >
                <Text
                  style={{ color: '#7678ED', fontSize: 14, fontWeight: 'bold' }}
                >
                  {subTitle}
                </Text>
              </TouchableOpacity>

              {!this.state.viewDetails && (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ viewDetails: !this.state.viewDetails })
                  }
                  style={{ alignItems: 'flex-end' }}
                >
                  <Text
                    style={{
                      color: '#555',
                      fontSize: 14,
                      textAlign: 'right',
                      top: 5
                    }}
                  >
                    {subBody}
                  </Text>
                  <FontAwesome
                    style={{ paddingTop: 10, paddingHorizontal: 5 }}
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

import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import { Text, View, TouchableOpacity } from 'react-native';
import { rtlos, StyleSheet, isTablet, readyPosts } from '../../utils';
import { AvatarCircle } from '../Avatar';
import SwiperView from './SwiperView';
export default class SwiperContainer extends React.PureComponent<any, any> {
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
      post: { time, branch },
      word,
      navigation,
      locSort,
      showMapModal,
      lang
    } = this.props;

    const user = {
      name: post.userName,
      about: post.userAbout,
      avatar: post.userAvatar,
      uniquename: post.userUniquename,
      id: post.userId
    };
    const location = post.location;
    const locations = post.locations;

    const dist =
      locSort && post.sort && post.sort.length > 0
        ? this.getDistanceNumbers(post.sort)
        : null;

    const posts =
      post.innerPosts && post.innerPosts.length > 0
        ? readyPosts(post.innerPosts, isTablet() ? 800 : 600, 79, lang)
        : [post];

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
                  itemTitle: branch
                });
              }}
            >
              <Text
                style={{
                  position: 'absolute',
                  top: 0,
                  right: rtlos() === 3 ? 10 : undefined,
                  left: rtlos() === 3 ? undefined : 10,
                  fontSize: 12,
                  color: '#999'
                }}
              >
                {branch}
              </Text>
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

        {posts.map((item: any) => {
          return <SwiperView key={item.id} {...this.props} post={item} />;
        })}
      </View>
    );
  }
}

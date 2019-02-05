import * as React from 'react';
import { View, TouchableOpacity, Animated, Text } from 'react-native';
import { Constants } from 'expo';
import Menu from './Menu';
import { StyleSheet } from '../../utils';
import { Ionicons } from '@expo/vector-icons';

class ItemHeader extends React.Component<any, any> {
  render() {
    const title = this.props.title.substring(0, 20);
    const { post, favoritePost, word, lang } = this.props;
    return (
      <View
        style={[
          styles.container,
          {
            shadowOffset: { width: 3, height: 3 },
            shadowColor: '#555',
            shadowOpacity: 0.1,
            backgroundColor: '#fff',
            opacity: this.props.opacity
          }
        ]}
      >
        <View
          style={[
            styles.leftIconView,
            { flexDirection: 'row', flex: 1, opacity: this.props.opacity }
          ]}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{
              paddingRight: 20,
              paddingLeft: 5,
              marginLeft: 5,
              marginTop: 3
            }}
          >
            <Ionicons
              name="ios-arrow-back"
              size={35}
              style={styles.icon}
              color="#6FA7D5"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: this.props.opacity
          }}
        >
          <Text
            style={{
              fontFamily: 'cairo-regular',
              fontSize: 20,
              color: '#373737'
            }}
          >
            {title}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Menu
            post={post}
            favoritePost={favoritePost}
            word={word}
            lang={lang}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    height: Constants.statusBarHeight + 45,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    zIndex: 2
  }
});

export default ItemHeader;

import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from '../../carousel';
import styles from '../styles/SliderEntry';
import { images } from '../../../load';

const icon = Math.floor(Math.random() * 89);

export default class SliderEntry extends Component<any, any> {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  get image() {
    const {
      data: { illustration },
      parallax,
      parallaxProps,
      even
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: illustration }}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {}
        ]}
        style={[styles.image, { position: 'relative' }]}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image source={{ uri: illustration }} style={styles.image} />
    );
  }

  render() {
    const { even } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onLongPress={() => {
          alert(`You've clicked`);
        }}
      >
        <View
          style={{
            position: 'absolute',
            right: 10,
            top: 5,
            zIndex: 100,
            flexDirection: 'row'
          }}
        >
          <Text
            style={{
              top: -3,
              right: 5,
              fontSize: 13,
              fontWeight: 'bold',
              color: '#171717',
              fontFamily: 'cairo-regular',
              shadowOpacity: 1,
              shadowRadius: 8,
              shadowColor: '#fff',
              shadowOffset: { height: 0, width: 0 }
            }}
          >
            مكتبة جرير
          </Text>
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              borderColor: '#7678ED',
              borderWidth: 1,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              style={{
                height: 32,
                width: 32,
                borderRadius: 16
              }}
              source={images[`b${icon}`]}
            />
          </View>
        </View>

        <View
          style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        >
          {this.image}
        </View>
      </TouchableOpacity>
    );
  }
}

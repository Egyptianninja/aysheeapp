import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from '../../carousel';
import styles from '../styles/SliderEntry';
import { images } from '../../../load';

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
            top: 1,
            zIndex: 100,
            flexDirection: 'row'
          }}
        >
          <Text
            style={{
              top: -6,
              right: 5,
              fontSize: 13,
              fontWeight: 'bold',
              color: '#171717',
              fontFamily: 'cairo-regular'
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
              backgroundColor: '#eee',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              style={{
                height: 33,
                width: 33,
                borderRadius: 17
              }}
              source={images.b2}
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
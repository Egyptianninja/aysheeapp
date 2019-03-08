import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { ParallaxImage, getDate } from '../../../utils';
import styles from '../styles/SliderEntry';

class SliderEntry extends Component<any, any> {
  get image() {
    const {
      data: { uri },
      parallax,
      parallaxProps,
      navigation,
      even
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri }}
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
      <Image source={{ uri }} style={styles.image} />
    );
  }

  render() {
    const {
      data: { _id, body, end, photos, start, title, isrtl },
      even
    } = this.props;
    const { words, lang, isRTL } = this.props;

    const uppercaseTitle = title ? (
      <Text
        style={[styles.title, { textAlign: isrtl ? 'right' : 'left' }]}
        numberOfLines={2}
      >
        {title.toUpperCase()}
      </Text>
    ) : (
      false
    );
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          this.props.navigation.navigate('ItemScreenModal', {
            post: this.props.data,
            word: words,
            lang,
            isRTL
          });
        }}
      >
        <View style={[styles.imageContainer]}>
          {this.image}
          <View style={[styles.radiusMask]} />
        </View>
        <View style={[styles.textContainer]}>
          {uppercaseTitle}
          <Text
            style={[styles.subtitle, { textAlign: isrtl ? 'right' : 'left' }]}
            numberOfLines={2}
          >
            {body}
          </Text>
          <Text
            style={{
              position: 'absolute',
              left: 20,
              top: -10,
              textAlign: 'left',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: 12,
              marginTop: 6
            }}
            numberOfLines={2}
          >
            {getDate(start)} - {getDate(end)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state: any) => ({
  lang: state.glob.languageName,
  isRTL: state.glob.isRTL,
  words: state.glob.language.words
});

export default connect(mapStateToProps)(SliderEntry);

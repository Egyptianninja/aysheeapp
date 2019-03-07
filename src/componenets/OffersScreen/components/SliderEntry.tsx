import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { ParallaxImage } from '../../../utils';
import styles from '../styles/SliderEntry';

class SliderEntry extends Component<any, any> {
  get image() {
    const {
      data: { photos },
      parallax,
      parallaxProps,
      navigation,
      even
    } = this.props;

    const uri = `http://res.cloudinary.com/arflon/image/upload/w_${500}/${
      photos[0]
    }`;
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
      data: { _id, body, end, photos, start, title },
      even
    } = this.props;
    const { words, lang, isRTL } = this.props;

    const uppercaseTitle = title ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
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
        <View
          style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
        >
          {this.image}
          <View
            style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}
          />
        </View>
        <View
          style={[styles.textContainer, even ? styles.textContainerEven : {}]}
        >
          {uppercaseTitle}
          <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
            numberOfLines={2}
          >
            {body}
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

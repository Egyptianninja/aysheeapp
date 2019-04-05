import * as React from 'react';
import { Image, View } from 'react-native';
import { StyleSheet } from '../../../src/utils';

const Logo = () => (
  <View style={styles.logo}>
    <Image source={require('../../../assets/logo.png')} />
  </View>
);

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50
  }
});

export default Logo;

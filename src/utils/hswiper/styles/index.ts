import { StyleSheet } from 'react-native';

export const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#7678ED',
  background2: '#21D4FD',
  background3: '#B721FF'
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background1
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  scrollview: {
    flex: 1
    // paddingTop: 10
  },
  scrollviewContentContainer: {
    // paddingBottom: 10
  },
  exampleContainer: {
    // marginBottom: 10
  },

  slider: {
    // marginTop: 10
  }
});

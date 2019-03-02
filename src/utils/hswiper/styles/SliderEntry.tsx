import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './index';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

function wp(percentage: any) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.3;
const slideWidth = wp(80);
const itemHorizontalMargin = 2;

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 0;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingTop: 25,
    paddingBottom: 18,
    // shadowOpacity: 0.8,
    // shadowRadius: 8,
    // shadowColor: '#171717',
    // shadowOffset: { height: 0, width: 0 }
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.8,
    shadowRadius: 7,

    elevation: 10
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: entryBorderRadius,
    overflow: 'hidden'
  },
  imageContainerEven: {
    backgroundColor: colors.black,
    overflow: 'hidden'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    borderRadius: entryBorderRadius
  }
});

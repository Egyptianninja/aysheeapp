import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './index';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

function wp(percentage: any) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.27;
const slideWidth = wp(85);
const itemHorizontalMargin = 1;

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 0;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    marginTop: 5,
    paddingTop: 20,
    paddingBottom: 8

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4
    // },
    // shadowOpacity: 0.7,
    // shadowRadius: 4,
    // elevation: 5
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: entryBorderRadius,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden'
  },
  imageContainerEven: {
    backgroundColor: colors.black,
    overflow: 'hidden'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: entryBorderRadius
  }
});

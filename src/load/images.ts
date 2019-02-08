import { Image } from 'react-native';
import { Asset } from 'expo';

export function cacheImages(imgs: any) {
  return imgs.map((image: any) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export const images = {
  logo: require('../../assets/logo.png'),
  icon: require('../../assets/icon.png'),

  icon1: require('../../assets/icons/building.png'),
  icon2: require('../../assets/icons/Car.png'),
  icon3: require('../../assets/icons/elect.png'),
  icon4: require('../../assets/icons/sofa.png'),
  icon5: require('../../assets/icons/sofa.png'),
  icon6: require('../../assets/icons/toys2.png'),
  icon7: require('../../assets/icons/spor.png'),
  icon8: require('../../assets/icons/Music.png'),
  icon9: require('../../assets/icons/book.png'),
  icon10: require('../../assets/icons/Clothes.png'),
  icon11: require('../../assets/icons/mobileipad.png'),
  icon12: require('../../assets/icons/spar-part.png'),
  icon13: require('../../assets/icons/boat.png'),
  icon14: require('../../assets/icons/animals.png'),
  icon15: require('../../assets/icons/food.png'),
  icon16: require('../../assets/icons/beauty.png'),
  icon17: require('../../assets/icons/job.png'),
  icon18: require('../../assets/icons/others.png'),
  icon19: require('../../assets/icons/job-search.png'),
  icon20: require('../../assets/icons/services.png'),
  icon21: require('../../assets/icons/Services-2.png'),

  home: require('../../assets/icons/home.png')
};

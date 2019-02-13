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

  icon1: require('../../assets/icons/realestate.png'),
  icon2: require('../../assets/icons/car.png'),
  icon3: require('../../assets/icons/home-electronics.png'),
  // icon4: require('../../assets/icons/sofa.png'),
  icon5: require('../../assets/icons/furniture.png'),
  icon6: require('../../assets/icons/childreen-needs.png'),
  icon7: require('../../assets/icons/health-and-sport.png'),
  icon8: require('../../assets/icons/music.png'),
  icon9: require('../../assets/icons/books.png'),
  icon10: require('../../assets/icons/clothes.png'),
  icon11: require('../../assets/icons/mobile.png'),
  icon12: require('../../assets/icons/spar-parts.png'),
  icon13: require('../../assets/icons/navy.png'),
  icon14: require('../../assets/icons/pets.png'),
  icon15: require('../../assets/icons/food.png'),
  icon16: require('../../assets/icons/bueaty.png'),
  icon17: require('../../assets/icons/jop.png'),
  icon18: require('../../assets/icons/points.png'),
  icon19: require('../../assets/icons/looking-for-jop.png'),
  icon20: require('../../assets/icons/requist-services.png'),
  icon21: require('../../assets/icons/offer-services.png'),

  // home: require('../../assets/icons/home.png')

  // FILTER ICONS
  sortType: require('../../assets/icons/filtericons/Sort.jpg'),
  city: require('../../assets/icons/filtericons/City.jpg'),
  kindId: require('../../assets/icons/filtericons/Kind.jpg'),
  realestateId: require('../../assets/icons/filtericons/Sort.jpg'),
  serviceId: require('../../assets/icons/filtericons/Servics.jpg'),
  brandId: require('../../assets/icons/filtericons/Brand.jpg'),
  subBrandId: require('../../assets/icons/filtericons/Subbrand.jpg'),
  eBrandId: require('../../assets/icons/filtericons/Brand.jpg'),
  isnew: require('../../assets/icons/filtericons/new-old.jpg'),
  issale: require('../../assets/icons/filtericons/Sale-Buy.jpg'),
  isfurnishered: require('../../assets/icons/filtericons/Furniture.jpg'),
  rooms: require('../../assets/icons/filtericons/room.jpg'),
  bathrooms: require('../../assets/icons/filtericons/Bathroom.jpg'),
  year: require('../../assets/icons/filtericons/Year.jpg')
};

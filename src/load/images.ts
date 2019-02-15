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

  home: require('../../assets/icons/header/home.png'),
  bell: require('../../assets/icons/header/bell.png'),
  search: require('../../assets/icons/header/search.png'),
  menu: require('../../assets/icons/header/menu.png'),

  namelogo: require('../../assets/icons/header/namelogo.png'),

  itemmenuiconup: require('../../assets/icons/header/pointsv.png'),
  itemmenuicon: require('../../assets/icons/header/pointsh.png'),

  load: require('../../assets/icons/main/load.png'),

  icon1: require('../../assets/icons/main/realestate.jpg'),
  icon2: require('../../assets/icons/main/car.jpg'),
  icon3: require('../../assets/icons/main/home-electronics.png'),
  icon5: require('../../assets/icons/main/furniture.png'),
  icon6: require('../../assets/icons/main/childreen-needs.jpg'),
  icon7: require('../../assets/icons/main/health-and-sport.png'),
  icon8: require('../../assets/icons/main/music.jpg'),
  icon9: require('../../assets/icons/main/books.png'),
  icon10: require('../../assets/icons/main/clothes.jpg'),
  icon11: require('../../assets/icons/main/mobile.jpg'),
  icon12: require('../../assets/icons/main/spare-part.jpg'),
  icon13: require('../../assets/icons/main/navy.png'),
  icon14: require('../../assets/icons/main/pets.png'),
  icon15: require('../../assets/icons/main/food.jpg'),
  icon16: require('../../assets/icons/main/bueaty.jpg'),
  icon17: require('../../assets/icons/main/job.jpg'),
  icon18: require('../../assets/icons/header/pointshr.png'),
  icon19: require('../../assets/icons/main/Find-Jobs.jpg'),
  icon20: require('../../assets/icons/main/request-service.jpg'),
  icon21: require('../../assets/icons/main/offer-services.jpg'),

  // FILTER ICONS
  sortType: require('../../assets/icons/filtericons/Sort.jpg'),
  city: require('../../assets/icons/filtericons/City.jpg'),
  kindId: require('../../assets/icons/filtericons/Kind.jpg'),
  realestateId: require('../../assets/icons/filtericons/Kind.jpg'),
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

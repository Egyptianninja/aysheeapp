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
  offers: require('../../assets/icons/header/offers.png'),

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
  icon22: require('../../assets/icons/main/pc-camera.png'),
  icon23: require('../../assets/icons/main/building-material.png'),

  // FILTER ICONS
  sortType: require('../../assets/icons/filtericons/Sort.png'),
  city: require('../../assets/icons/filtericons/City.png'),
  kindId: require('../../assets/icons/filtericons/Kind.png'),
  realestateId: require('../../assets/icons/filtericons/Kind.png'),
  serviceId: require('../../assets/icons/filtericons/Servics.png'),
  brandId: require('../../assets/icons/filtericons/Brand.png'),
  subBrandId: require('../../assets/icons/filtericons/Subbrand.png'),
  eBrandId: require('../../assets/icons/filtericons/Brand.png'),
  isnew: require('../../assets/icons/filtericons/new-old.png'),
  issale: require('../../assets/icons/filtericons/Sale-Buy.png'),
  isfurnishered: require('../../assets/icons/filtericons/Furniture.png'),
  rooms: require('../../assets/icons/filtericons/room.png'),
  bathrooms: require('../../assets/icons/filtericons/Bathroom.png'),
  year: require('../../assets/icons/filtericons/Year.png'),

  // Brands
  b0: require('../../assets/icons/brands/0.png'),
  b1: require('../../assets/icons/brands/1.png'),
  b2: require('../../assets/icons/brands/2.png'),
  b3: require('../../assets/icons/brands/3.png'),
  b4: require('../../assets/icons/brands/4.png'),
  b5: require('../../assets/icons/brands/5.png'),
  b6: require('../../assets/icons/brands/6.png'),
  b7: require('../../assets/icons/brands/7.png'),
  b8: require('../../assets/icons/brands/8.png'),
  b9: require('../../assets/icons/brands/9.png'),
  b10: require('../../assets/icons/brands/10.png'),
  b11: require('../../assets/icons/brands/11.png'),
  b12: require('../../assets/icons/brands/12.png'),
  b13: require('../../assets/icons/brands/13.png'),
  b14: require('../../assets/icons/brands/14.png'),
  b15: require('../../assets/icons/brands/15.png'),
  b16: require('../../assets/icons/brands/16.png'),
  b17: require('../../assets/icons/brands/17.png'),
  b18: require('../../assets/icons/brands/18.png'),
  b19: require('../../assets/icons/brands/19.png'),
  b20: require('../../assets/icons/brands/20.png'),
  b21: require('../../assets/icons/brands/21.png'),
  b22: require('../../assets/icons/brands/22.png'),
  b23: require('../../assets/icons/brands/23.png'),
  b24: require('../../assets/icons/brands/24.png'),
  b25: require('../../assets/icons/brands/25.png'),
  b26: require('../../assets/icons/brands/26.png'),
  b27: require('../../assets/icons/brands/27.png'),
  b28: require('../../assets/icons/brands/28.png'),
  b29: require('../../assets/icons/brands/29.png'),
  b30: require('../../assets/icons/brands/30.png'),
  b31: require('../../assets/icons/brands/31.png'),
  b32: require('../../assets/icons/brands/32.png'),
  b33: require('../../assets/icons/brands/33.png'),
  b34: require('../../assets/icons/brands/34.png'),
  b35: require('../../assets/icons/brands/35.png'),
  b36: require('../../assets/icons/brands/36.png'),
  b37: require('../../assets/icons/brands/37.png'),
  b38: require('../../assets/icons/brands/38.png'),
  b39: require('../../assets/icons/brands/39.png'),
  b40: require('../../assets/icons/brands/40.png'),
  b41: require('../../assets/icons/brands/41.png'),
  b42: require('../../assets/icons/brands/42.png'),
  b43: require('../../assets/icons/brands/43.png'),
  b44: require('../../assets/icons/brands/44.png'),
  b45: require('../../assets/icons/brands/45.png'),
  b46: require('../../assets/icons/brands/46.png'),
  b47: require('../../assets/icons/brands/47.png'),
  b48: require('../../assets/icons/brands/48.png'),
  b50: require('../../assets/icons/brands/50.png'),
  b51: require('../../assets/icons/brands/51.png'),
  b52: require('../../assets/icons/brands/52.png'),
  b53: require('../../assets/icons/brands/53.png'),
  b54: require('../../assets/icons/brands/54.png'),
  b55: require('../../assets/icons/brands/55.png'),
  b56: require('../../assets/icons/brands/56.png'),
  b57: require('../../assets/icons/brands/57.png'),
  b58: require('../../assets/icons/brands/58.png'),
  b59: require('../../assets/icons/brands/59.png'),
  b60: require('../../assets/icons/brands/60.png'),
  b61: require('../../assets/icons/brands/61.png'),
  b62: require('../../assets/icons/brands/62.png'),
  b63: require('../../assets/icons/brands/63.png'),
  b64: require('../../assets/icons/brands/64.png'),
  b65: require('../../assets/icons/brands/65.png'),
  b66: require('../../assets/icons/brands/66.png'),
  b67: require('../../assets/icons/brands/67.png'),
  b68: require('../../assets/icons/brands/68.png'),
  b69: require('../../assets/icons/brands/69.png'),
  b70: require('../../assets/icons/brands/70.png'),
  b71: require('../../assets/icons/brands/71.png'),
  b72: require('../../assets/icons/brands/72.png'),
  b73: require('../../assets/icons/brands/73.png'),

  b74: require('../../assets/icons/brands/74.png'),
  b75: require('../../assets/icons/brands/75.png'),
  b76: require('../../assets/icons/brands/76.png'),
  b77: require('../../assets/icons/brands/77.png'),
  b78: require('../../assets/icons/brands/78.png'),
  b79: require('../../assets/icons/brands/79.png'),
  b80: require('../../assets/icons/brands/80.png'),
  b81: require('../../assets/icons/brands/81.png'),
  b82: require('../../assets/icons/brands/82.png'),
  b83: require('../../assets/icons/brands/83.png'),
  b84: require('../../assets/icons/brands/84.png'),
  b85: require('../../assets/icons/brands/85.png'),
  b86: require('../../assets/icons/brands/86.png'),
  b87: require('../../assets/icons/brands/87.png'),
  b88: require('../../assets/icons/brands/88.png'),
  b89: require('../../assets/icons/brands/89.png'),

  DZ: require('../../assets/icons/flag/algeria.png'),
  AT: require('../../assets/icons/flag/austria.png'),
  BH: require('../../assets/icons/flag/bahrain.png'),
  BE: require('../../assets/icons/flag/belgium.png'),
  CA: require('../../assets/icons/flag/canada.png'),
  EG: require('../../assets/icons/flag/egypt.png'),
  AE: require('../../assets/icons/flag/emirates.png'),
  FR: require('../../assets/icons/flag/france.png'),
  DE: require('../../assets/icons/flag/germany.png'),
  GR: require('../../assets/icons/flag/greece.png'),
  ID: require('../../assets/icons/flag/indonesia.png'),
  IR: require('../../assets/icons/flag/iran.png'),
  IQ: require('../../assets/icons/flag/iraq.png'),
  IT: require('../../assets/icons/flag/italy.png'),
  JO: require('../../assets/icons/flag/jordan.png'),
  KW: require('../../assets/icons/flag/kuwait.png'),
  LB: require('../../assets/icons/flag/lebanon.png'),
  MA: require('../../assets/icons/flag/morocco.png'),
  QA: require('../../assets/icons/flag/qatar.png'),
  RU: require('../../assets/icons/flag/russia.png'),
  SA: require('../../assets/icons/flag/saudi.png'),
  ES: require('../../assets/icons/flag/spain.png'),
  CH: require('../../assets/icons/flag/switzerland.png'),
  SY: require('../../assets/icons/flag/syria.png'),
  TR: require('../../assets/icons/flag/turkey.png'),
  GB: require('../../assets/icons/flag/uk.png'),
  US: require('../../assets/icons/flag/usa.png'),
  YE: require('../../assets/icons/flag/yemen.png')
};

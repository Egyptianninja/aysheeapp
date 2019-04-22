//  This routine calculates the distance between two points (given the
//  latitude/longitude of those points). It is being used to calculate
//  the distance between two locations using GeoDataSource (TM) prodducts
//  Definitions:
//    South latitudes are negative, east longitudes are positive
//  Passed to function:
//    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)
//    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)
//    unit = the unit you desire for results
//           where: 'M' is statute miles (default)
//                  'K' is kilometers
//                  'N' is nautical miles
//                  'm' is meter
//
//  Worldwide cities and other features databases with latitude longitude
//  are available at https://www.geodatasource.com
//  For enquiries, please contact sales@geodatasource.com
//  Official Web site: https://www.geodatasource.com
//  GeoDataSource.com (C) All Rights Reserved 2018

export const distance = ({ lat1, lon1, lat2, lon2, unit }: any) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === 'K') {
      dist = dist * 1.609344;
    }
    if (unit === 'm') {
      dist = dist * 1609.344;
    }
    if (unit === 'N') {
      dist = dist * 0.8684;
    }
    return roundDistance(dist);
  }
};

const roundDistance = (dist: any) => {
  // return Math.round(dist / 100) * 100;
  if (dist > 1000) {
    return {
      dist: (Math.ceil(dist / 100) * 100) / 1000,
      unit: 'km'
    };
  } else {
    return {
      dist: Math.ceil(dist / 100) * 100,
      unit: 'm'
    };
  }
};

// const a = distance({
//   lat1: 25.995409,
//   lon1: 51.306409,
//   lat2: 25.268223,
//   lon2: 51.507382,
//   unit: 'm'
// });
// console.log(a);

// Object {
//   "dist": 600,
//   "unit": "m",
// }

// Object {
//   "dist": 8.5,
//   "unit": "km",
// }

// Object {
//   "dist": 83.4,
//   "unit": "km",
// }

// Math.round( 20.49); //  20
// Math.round( 20.5 ); //  21
// Math.round( 42   ); //  42
// Math.round(-20.5 ); // -20
// Math.round(-20.51); // -21

// Math.round(100*X)/100;

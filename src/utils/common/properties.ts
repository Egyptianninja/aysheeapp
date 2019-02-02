export const getproperties = (post: any) => {
  const {
    isnew,
    issale,
    iswarranty,
    realestate,
    space,
    rooms,
    bathrooms,
    isfurnishered,
    brand,
    subBrand,
    year,
    km,
    color,
    isfullTime,
    service
  } = post;

  return [
    { name: "isnew", value: isnew },
    { name: "issale", value: issale },
    { name: "warranty", value: iswarranty },
    { name: "realestate", value: realestate },
    { name: "space", value: space },
    { name: "rooms", value: rooms },
    { name: "bathrooms", value: bathrooms },
    { name: "isfurnishered", value: isfurnishered },
    { name: "brand", value: brand },
    { name: "subBrand", value: subBrand },
    { name: "year", value: year },
    { name: "km", value: km },
    { name: "color", value: color },
    { name: "fullTime", value: isfullTime },
    { name: "service", value: service }
  ];
};

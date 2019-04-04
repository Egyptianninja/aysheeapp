export const getproperties = (post: any) => {
  const {
    isnew,
    issale,
    iswarranty,
    realestate,
    space,
    areaunit,
    rooms,
    bathrooms,
    isfurnishered,
    brand,
    subBrand,
    year,
    km,
    color,
    service,
    isfullTime,
    kind,
    eBrand
  } = post;
  return [
    { name: 'isnew', value: isnew },
    { name: 'issale', value: issale },
    { name: 'iswarranty', value: iswarranty },
    { name: 'realestate', value: realestate },
    { name: 'space', value: `${space} ${areaunit}` },
    { name: 'rooms', value: rooms },
    { name: 'bathrooms', value: bathrooms },
    { name: 'isfurnishered', value: isfurnishered },
    { name: 'brand', value: brand },
    { name: 'subBrand', value: subBrand },
    { name: 'year', value: year },
    { name: 'km', value: km },
    { name: 'color', value: color },
    { name: 'service', value: service },
    { name: 'isfullTime', value: isfullTime },
    // TODO:
    { name: 'type', value: kind },
    { name: 'eBrand', value: eBrand }
  ];
};
export const getJobProperties = (post: any) => {
  const { education, experience, salary } = post;

  return [
    { name: 'education', value: education },
    { name: 'experience', value: experience },
    { name: 'salary', value: salary }
  ];
};

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
    service,
    isfullTime
  } = post;

  return [
    { name: 'isnew', value: isnew },
    { name: 'issale', value: issale },
    { name: 'iswarranty', value: iswarranty },
    { name: 'realestate', value: realestate },
    { name: 'space', value: space },
    { name: 'rooms', value: rooms },
    { name: 'bathrooms', value: bathrooms },
    { name: 'isfurnishered', value: isfurnishered },
    { name: 'brand', value: brand },
    { name: 'subBrand', value: subBrand },
    { name: 'year', value: year },
    { name: 'km', value: km },
    { name: 'color', value: color },
    { name: 'service', value: service },
    { name: 'isfullTime', value: isfullTime }
  ];
};
export const getJobProperties = (post: any) => {
  const { jobTitle, jobIndustry, education, experience, salary } = post;

  return [
    { name: 'jobtitle', value: jobTitle },
    { name: 'jobindustry', value: jobIndustry },
    { name: 'education', value: education },
    { name: 'experience', value: experience },
    { name: 'salary', value: salary }
  ];
};

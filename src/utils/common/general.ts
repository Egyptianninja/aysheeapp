export const filterOptions = (data: any, list: any) => {
  return data.filter((da: any) => list.includes(da.id));
};

export const searchInList = (q: any, list: any) => {
  const updatedList = list.filter((item: any) => {
    return item.toLowerCase().search(q.toLowerCase()) !== -1;
  });
  return updatedList;
};

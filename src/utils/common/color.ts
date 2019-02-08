export const nameToColor = (name: string, s: number = 50, l: number = 50) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const h = hash % 360;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};

export const isArabic = (text: string, length: number = 20) => {
  let rtl = 0;
  text
    .replace(/[\s\n\0\f\t\v\'\"\-0-9\+\?\!]+/gm, '')
    .substring(0, text.length > length ? length : text.length)
    .split('')
    .map((char: any) => {
      if (inRange(char.charCodeAt(0), 1539, 1791)) {
        rtl++;
      }
    });
  return rtl > text.length / 2 ? true : false;
};

const inRange = (num: number, start: number, end: number) => {
  return start < num && num < end;
};

export const arabicToNum = (arNumStr: any) => {
  const regex = /[٠١٢٣٤٥٦٧٨٩]/g;
  const found = arNumStr.match(regex);
  if (found) {
    return arNumStr.replace(regex, (d: any) => {
      return d.charCodeAt(0) - 1632;
    });
  } else {
    return arNumStr;
  }
};

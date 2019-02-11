export const isArabic = (text: string, length: number = 20) => {
  let rtl = 0;
  text
    .replace(/[\s\n\0\f\t\v\'\"\-0-9\+\?\!]+/gm, '')
    .substring(0, text.length > length ? length : text.length)
    .split('')
    .map((char: any) => {
      const charNum = char.charCodeAt(0);
      if (inRange(charNum, 1539, 1791)) {
        rtl++;
      }
    });
  const x = text.length < length ? text.length : length;
  return rtl > x / 2 ? true : false;
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

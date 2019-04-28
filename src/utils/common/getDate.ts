import { getLocaleLang } from './getlang';

Date.prototype.getMonthName = function() {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return monthNames[this.getMonth()];
};
Date.prototype.getMonthNumber = function() {
  const monthNames = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
  ];
  return monthNames[this.getMonth()];
};

export const getDate = (date: any, type = 'short') => {
  const newDate = new Date(date);
  const locale: any = getLocaleLang ? getLocaleLang : 'en-us';
  const day = newDate.getDate();
  const month = newDate.getMonthName();
  return `${day} ${month}`;
};

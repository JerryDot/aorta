import {getFirstDay} from '../database/fullData';

export const isToday = (someDate: Date) => {
  const today = new Date();
  return someDate.getDate() == today.getDate() && someDate.getMonth() == today.getMonth() && someDate.getFullYear() == today.getFullYear();
};

export const startOfDay = (someDate?: Date): Date | undefined => {
  if (!someDate) return undefined;
  let day = someDate;
  day.setUTCHours(0, 0, 0, 0);
  return day;
};

export type Timespan = 'day' | 'week' | 'month' | 'all';

export const timespanToStartDate = (timespan: Timespan): Date => {
  let startDay = new Date();
  if (timespan == 'day') {
    startDay.setDate(startDay.getDate() - 1);
  } else if (timespan == 'month') {
    startDay.setDate(startDay.getDate() - 30);
  } else if (timespan == 'week') {
    startDay.setDate(startDay.getDate() - 7);
  } else {
    startDay = getFirstDay();
  }
  return startDay;
};

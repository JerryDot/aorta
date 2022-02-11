import {getFirstDay} from '../database/fullData';

export const dayStart = (time: Date): Date => {
  let day = new Date(time);
  day.setHours(0, 0, 0);
  return day;
};

export const dayEnd = (time: Date): Date => {
  let day = new Date(time);
  day.setHours(23, 59, 59);
  return day;
};

export type Timespan = 'day' | 'week' | 'month' | 'all';

export const timespanToStartDate = (time: Date, timespan: Timespan): Date => {
  let startDay = dayStart(time);
  if (timespan == 'day') {
    return startDay;
  } else if (timespan == 'month') {
    startDay.setDate(startDay.getDate() - 30);
  } else if (timespan == 'week') {
    startDay.setDate(startDay.getDate() - 6);
  } else {
    startDay = getFirstDay();
  }
  return startDay;
};

import {getDay} from 'date-fns';
import {dayEnd, dayStart} from '../utils/timeUtils';
import {getRecordsPeriod, resultsToArray} from './general';
import {Activity, Calorie, Mood, RecordString, RecordType, Weight} from './realm';

export type DaySummary = {
  day: Date;
  mood: number;
  activities: string[];
  calories: number;
  weight?: number;
};

export type FullDay = {
  day: Date;
  moods: Mood['values'][];
  activities: Activity['values'][];
  calories: Calorie['values'][];
  weight: Weight['values'][];
};

export const getDaySummary = (time: Date): DaySummary => {
  let day: DaySummary = {
    day: new Date(time),
    mood: getDayRecords<Mood>('Mood', time).avg('rating'),
    activities: getDayRecords<Activity>('Activity', time).map(record => record.type),
    calories: getDayRecords<Calorie>('Calorie', time).sum('amount') || 0,
    weight: (getDayRecords<Weight>('Weight', time)[0] || {amount: 0}).amount,
  };
  return day;
};

export const getAllDayRecords = (time: Date): FullDay => {
  console.log(getDayRecords<Mood>('Mood', time));
  console.log(resultsToArray(getDayRecords<Mood>('Mood', time)));

  let day: FullDay = {
    day: new Date(time),
    moods: resultsToArray(getDayRecords<Mood>('Mood', time)),
    activities: resultsToArray(getDayRecords<Activity>('Activity', time)),
    calories: resultsToArray(getDayRecords<Calorie>('Calorie', time)),
    weight: resultsToArray(getDayRecords<Weight>('Weight', time)),
  };
  return day;
};

export type DayStartEnd = {
  start: Date;
  end: Date;
};

export const getDayStartEnd = (time: Date): DayStartEnd => {
  let dayRecords = getAllDayRecords(time);
  let start = dayEnd(time);
  let end = dayStart(time);
  [...dayRecords.moods, ...dayRecords.calories, ...dayRecords.activities, ...dayRecords.weight].forEach(element => {
    if (element.date < start) {
      start = element.date;
    }
    if (element.date > end) {
      end = element.date;
    }
  });
  const startEnd: DayStartEnd = {start, end};
  const reserveStart = dayStart(time);
  reserveStart.setHours(7);
  const reserveEnd = dayEnd(time);
  reserveEnd.setHours(22);
  startEnd.start = [start, reserveStart].sort((a, b) => a.getTime() - b.getTime())[0];
  startEnd.end = [end, reserveEnd].sort((a, b) => b.getTime() - a.getTime())[0];
  return startEnd;
};

export const getDayRecords = <T>(realmType: RecordString, time: Date): Realm.Results<T> => {
  return getRecordsPeriod<T>(realmType, dayStart(time), dayEnd(time));
};

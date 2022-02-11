import {getDay} from 'date-fns';
import {dayEnd, dayStart} from '../utils/timeUtils';
import {getRecordsPeriod, resultsToArray} from './general';
import {Activity, Calorie, Mood, RecordString, Weight} from './realm';

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

export const getDayRecords = <T>(realmType: RecordString, time: Date): Realm.Results<T> => {
  return getRecordsPeriod<T>(realmType, dayStart(time), dayEnd(time));
};

import {getGeneralDayRecords, resultsToArray} from './general';
import {Activity, Calorie, Mood, Weight} from './realm';

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

export const getDaySummary = (startOfDay: Date): DaySummary => {
  let day: DaySummary = {
    day: new Date(startOfDay),
    mood: getGeneralDayRecords<Mood>('Mood', startOfDay).avg('rating'),
    activities: getGeneralDayRecords<Activity>('Activity', startOfDay).map(record => record.type),
    calories: getGeneralDayRecords<Calorie>('Calorie', startOfDay).sum('amount') || 0,
    weight: (getGeneralDayRecords<Weight>('Weight', startOfDay)[0] || {amount: 0}).amount,
  };
  return day;
};

export const getFullDay = (startOfDay: Date): FullDay => {
  let day: FullDay = {
    day: new Date(startOfDay),
    moods: resultsToArray(getGeneralDayRecords<Mood>('Mood', startOfDay)),
    activities: resultsToArray(getGeneralDayRecords<Activity>('Activity', startOfDay)),
    calories: resultsToArray(getGeneralDayRecords<Calorie>('Calorie', startOfDay)),
    weight: resultsToArray(getGeneralDayRecords<Weight>('Weight', startOfDay)),
  };
  return day;
};

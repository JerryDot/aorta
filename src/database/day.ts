import {getGeneralDayRecords} from './general';
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
    day: startOfDay,
    mood: getGeneralDayRecords<Mood>('Mood', startOfDay).avg('rating'),
    activities: getGeneralDayRecords<Activity>('Activity', startOfDay).map(record => record.type),
    calories: getGeneralDayRecords<Calorie>('Calorie', startOfDay).sum('amount') || 0,
    weight: getGeneralDayRecords<Weight>('Weight', startOfDay)[0].amount,
  };
  return day;
};

export const getFullDay = (startOfDay: Date): FullDay => {
  let day: FullDay = {
    day: startOfDay,
    moods: getGeneralDayRecords<Mood>('Mood', startOfDay).map(result => result.values),
    activities: getGeneralDayRecords<Activity>('Activity', startOfDay).map(result => result.values),
    calories: getGeneralDayRecords<Calorie>('Calorie', startOfDay).map(result => result.values),
    weight: getGeneralDayRecords<Weight>('Weight', startOfDay).map(result => result.values),
  };
  return day;
};

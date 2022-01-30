import {getGeneralDayRecords} from './general';
import realm, {Activity, Calorie, Mood, Weight} from './realm';

export type DaySummary = {
  day: Date;
  mood: number;
  activities: string[];
  calories: number;
  weight?: number;
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

export const getAllTimeSummary = (lastDay: Date): DaySummary[] => {
  let moods = realm.objects<Mood>('Mood').sorted('date');
  let activities = realm.objects<Activity>('Activity').sorted('date');
  let calories = realm.objects<Calorie>('Calorie').sorted('date');
  let weight = realm.objects<Weight>('Weight').sorted('date');
  let firstDay: Date = lastDay;
  [moods, activities, calories, weight].forEach(thing => {
    if (thing[0].date < firstDay) {
      let newDate = thing[0].date;
      newDate.setHours(0, 0, 0, 0);
      firstDay = newDate;
    }
  });
  let dayResults: DaySummary[] = [];
  for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
    dayResults.push(getDaySummary(d));
  }
  return dayResults;
};

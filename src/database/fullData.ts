import {dayEnd, dayStart} from '../utils/timeUtils';
import {DaySummary, FullDay, getDaySummary, getAllDayRecords} from './day';
import realm, {Mood, Activity, Calorie, Weight} from './realm';

type FullData = FullDay[];

export const getFirstDay = (): Date => {
  let moods = realm.objects<Mood>('Mood').sorted('date', true);
  let activities = realm.objects<Activity>('Activity').sorted('date');
  let calories = realm.objects<Calorie>('Calorie').sorted('date', false);
  let weight = realm.objects<Weight>('Weight').sorted('date');
  let firstDay: Date = (moods[0] || {date: new Date()}).date;
  [activities, calories, weight].forEach(thing => {
    if (thing[0] && thing[0].date < firstDay) {
      firstDay = dayStart(thing[0].date);
    }
  });
  return firstDay;
};

export const getDaysSummary = (startTime: Date, endTime: Date): DaySummary[] => {
  let firstDay = new Date(startTime);
  let dayResults: DaySummary[] = [];
  for (let d = firstDay; d <= dayEnd(endTime); d.setDate(d.getDate() + 1)) {
    console.log(d);
    dayResults.push(getDaySummary(d));
  }
  return dayResults;
};

export const getAllData = (currentTime: Date): FullData => {
  let firstDay: Date = getFirstDay();
  let dayFullResults = [];
  for (let d = firstDay; d <= currentTime; d.setDate(d.getDate() + 1)) {
    // This might get tomorrow too
    dayFullResults.push(getAllDayRecords(d));
  }
  return dayFullResults;
};

export const insertAllData = (data: FullDay[]): void => {
  data.forEach(value => {
    value.moods.forEach(mood => {
      realm.write(() => {
        realm.create(Mood.schema.name, mood);
      });
    });
    value.calories.forEach(calorie => {
      realm.write(() => {
        realm.create(Calorie.schema.name, calorie);
      });
    });
    value.weight.forEach(weight => {
      realm.write(() => {
        realm.create(Weight.schema.name, weight);
      });
    });
    value.activities.forEach(activity => {
      realm.write(() => {
        realm.create(Activity.schema.name, activity);
      });
    });
  });
};

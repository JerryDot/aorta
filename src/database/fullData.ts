import {DaySummary, FullDay, getDaySummary, getFullDay} from './day';
import realm, {Mood, Activity, Calorie, Weight} from './realm';

type FullData = FullDay[];

export const getFirstDay = (): Date => {
  let moods = realm.objects<Mood>('Mood').sorted('date');
  let activities = realm.objects<Activity>('Activity').sorted('date');
  let calories = realm.objects<Calorie>('Calorie').sorted('date');
  let weight = realm.objects<Weight>('Weight').sorted('date');
  let firstDay: Date = moods[0].date;
  [activities, calories, weight].forEach(thing => {
    if (thing[0] && thing[0].date < firstDay) {
      let newDate = thing[0].date;
      newDate.setHours(0, 0, 0, 0);
      firstDay = newDate;
    }
  });
  return firstDay;
};

export const getAllDaysSummary = (lastDay: Date): DaySummary[] => {
  let firstDay: Date = getFirstDay();
  let dayResults: DaySummary[] = [];
  for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
    dayResults.push(getDaySummary(d));
  }
  return dayResults;
};

export const getAllData = (): FullData => {
  let firstDay: Date = getFirstDay();
  let dayFullResults = [];
  for (let d = firstDay; d <= new Date(); d.setDate(d.getDate() + 1)) {
    dayFullResults.push(getFullDay(d));
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

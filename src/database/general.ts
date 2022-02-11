import {LineData} from '../components/Graph';
import realm, {Calorie, Mood, RecordString, Weight, Activity, RecordType} from './realm';

export const getRecordsPeriod = <T>(realmType: RecordString, startTime: Date, endTime: Date): Realm.Results<T> => {
  return realm.objects<T>(realmType).filtered('date >= $0 && date < $1', startTime, endTime);
};

export const getGraphDataPeriod = (realmType: RecordString, startTime: Date, endTime: Date): LineData => {
  const realmData = getRecordsPeriod<RecordType>(realmType, startTime, endTime);
  let results = [] as LineData;
  if (realmType === 'Weight' || realmType === 'Calorie') {
    results = resultsToArray<Weight | Calorie>(realmData as Realm.Results<Weight | Calorie>).map(record => ({
      date: record.date,
      value: record.amount,
    }));
  } else if (realmType === 'Mood') {
    results = resultsToArray<Mood>(realmData as Realm.Results<Mood>).map(record => ({date: record.date, value: record.rating}));
  } else {
    results = resultsToArray<Activity>(realmData as Realm.Results<Activity>).map(record => ({date: record.date, value: 1}));
  }
  return results;
};

export const getRecentRecord = <T>(realmType: RecordString, time: Date): T | null => {
  console.log('hi');
  const endTime = new Date();
  const prevTime = new Date(time);
  console.log(prevTime);
  prevTime.setMinutes(time.getMinutes() - 3); // MAGIC NUMBER ALARM
  const possiblePrevRecord = getRecordsPeriod<T>(realmType, prevTime, endTime);
  if (possiblePrevRecord.length) {
    return possiblePrevRecord[0];
  } else {
    return null;
  }
};

export const deleteRecord = (objectType: RecordString, recordID: string) => {
  realm.write(() => {
    realm.delete(realm.objectForPrimaryKey(objectType, recordID));
  });
};

export const resultsToArray = <T>(realmResults: Realm.Results<T>): T[] => {
  return Array.from(realmResults);
};

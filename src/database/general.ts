import {LineData} from '../components/Graph';
import realm, {Calorie, Mood, RecordString, Weight, Activity, RecordType} from './realm';

export const getGeneralRecordsPeriod = <T>(realmType: RecordString, startTime: Date, endTime?: Date): Realm.Results<T> => {
  return realm.objects<T>(realmType).filtered('date >= $0 && date < $1', startTime, endTime || new Date());
};

export const getGraphDataPeriod = (realmType: RecordString, startTime: Date, endTime?: Date): LineData => {
  const realmData = getGeneralRecordsPeriod<RecordType>(realmType, startTime, endTime);
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

export const getGeneralDayRecords = <T>(realmType: RecordString, startTime: Date): Realm.Results<T> => {
  const endTime = new Date(startTime);
  endTime.setDate(startTime.getDate() + 1);
  return getGeneralRecordsPeriod<T>(realmType, startTime, endTime);
};

export const getGeneralRecentRecord = <T>(realmType: RecordString): T | null => {
  const endTime = new Date();
  const startTime = new Date();
  startTime.setMinutes(endTime.getSeconds() - 2); // MAGIC NUMBER ALARM
  const possiblePrevRecord = getGeneralRecordsPeriod<T>(realmType, startTime, endTime);
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
  return realmResults.map(x => Object.assign({}, x));
};

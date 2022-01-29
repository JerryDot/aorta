import realm, {RecordString, RecordType} from './realm';

export const getGeneralRecordsPeriod = <T>(realmType: RecordString, startTime: Date, endTime: Date): Realm.Results<T> => {
  return realm.objects<T>(realmType).filtered('date >= $0 && date < $1', startTime, endTime);
};

export const getGeneralRecentRecord = <T>(realmType: RecordString): T | null => {
  const endTime = new Date();
  const startTime = new Date();
  startTime.setMinutes(endTime.getMinutes() - 5); // MAGIC NUMBER ALARM
  const possiblePrevRecord = getGeneralRecordsPeriod<T>(realmType, startTime, endTime);
  if (possiblePrevRecord.length) {
    return possiblePrevRecord[0];
  } else {
    return null;
  }
};

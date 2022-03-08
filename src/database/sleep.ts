import {dayEnd, dayStart} from '../utils/timeUtils';
import {getRecordsPeriod, resultsToArray} from './general';
import {v4 as uuidv4} from 'uuid';
import realm, {Sleep} from './realm';

export const getSleepRecord = (time: Date): Sleep | undefined => {
  console.log(dayStart(time));
  console.log(dayEnd(time));
  const dayRecord = getRecordsPeriod<Sleep>('Sleep', dayStart(time), dayEnd(time));
  return resultsToArray<Sleep>(dayRecord)[0];
};

export const putSleepRecord = (date: Date, doze: Date, wake: Date) => {
  const possiblePrevRecord = getSleepRecord(date);
  if (possiblePrevRecord) {
    realm.write(() => {
      possiblePrevRecord.date = date;
      possiblePrevRecord.doze = doze;
      possiblePrevRecord.wake = wake;
    });
  } else {
    realm.write(() => {
      const sleep = new Sleep(date, wake, doze, uuidv4());
      realm.create(Sleep.schema.name, sleep);
    });
  }
};

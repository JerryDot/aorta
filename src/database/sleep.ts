import {dayEnd, dayStart} from '../utils/timeUtils';
import {getRecordsPeriod} from './general';
import {v4 as uuidv4} from 'uuid';
import realm, {Sleep} from './realm';

export const getSleepRecord = (time: Date): Sleep => {
  const dayRecord = getRecordsPeriod<Sleep>('Sleep', dayStart(time), dayEnd(time));
  return dayRecord[-1];
};

export const putSleepRecord = (date: Date, doze: Date, wake: Date) => {
  const possiblePrevRecord = getSleepRecord(date);
  if (possiblePrevRecord) {
    realm.write(() => {
      possiblePrevRecord.doze = doze;
      possiblePrevRecord.wake = wake;
    });
  } else {
    realm.write(() => {
      const sleep = new Sleep(wake, doze, uuidv4());
      realm.create(Sleep.schema.name, sleep);
    });
  }
};

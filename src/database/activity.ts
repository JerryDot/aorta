import {getRecordsPeriod} from './general';
import realm, {Activity} from './realm';
import {v4 as uuidv4} from 'uuid';
import {dayEnd, dayStart} from '../utils/timeUtils';

export const getActivityRecords = (time: Date): Realm.Results<Activity> => {
  return getRecordsPeriod<Activity>('Activity', dayStart(time), dayEnd(time));
};

export const addActivityRecord = (type: string, time: Date) => {
  realm.write(() => {
    let activity = new Activity(time, type, uuidv4());
    realm.create(Activity.schema.name, activity);
  });
};

export const editActivityRecord = (recordID: string, date?: Date, type?: string) => {
  realm.write(() => {
    let activity = realm.objectForPrimaryKey<Activity>('Activity', recordID);
    if (!activity) {
      throw 'record not found';
    }
    if (date) {
      activity.date = date;
    }
    if (type) {
      activity.type = type;
    }
  });
};

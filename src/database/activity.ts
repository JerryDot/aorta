import {getGeneralRecentRecord, getGeneralRecordsPeriod} from './general';
import realm, {Activity} from './realm';
import {v4 as uuidv4} from 'uuid';

export const getActivityRecords = (startDay: Date): Realm.Results<Activity> => {
  // Should be given the start of a day at 1200 am
  const endDay = new Date(startDay);
  endDay.setDate(startDay.getDate() + 1);
  return getGeneralRecordsPeriod<Activity>('Activity', startDay, endDay);
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

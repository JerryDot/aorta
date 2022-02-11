import realm, {Calorie} from './realm';
import {v4 as uuidv4} from 'uuid';
import {getRecentRecord, getRecordsPeriod} from './general';
import {dayEnd, dayStart} from '../utils/timeUtils';

export const getCalorieRecords = (time: Date): Realm.Results<Calorie> => {
  return getRecordsPeriod<Calorie>('Calorie', dayStart(time), dayEnd(time));
};

export const addCalorieRecord = (calories: number, time: Date) => {
  const possiblePrevRecord = getRecentRecord<Calorie>('Calorie', time);
  if (possiblePrevRecord) {
    realm.write(() => {
      possiblePrevRecord.amount = possiblePrevRecord.amount + calories;
    });
  } else {
    realm.write(() => {
      let calorie = new Calorie(time, calories, uuidv4());
      realm.create(Calorie.schema.name, calorie);
    });
  }
};

export const editCalorieRecord = (recordID: string, date?: Date, amount?: number) => {
  realm.write(() => {
    let calorie = realm.objectForPrimaryKey<Calorie>('Calorie', recordID);
    if (!calorie) {
      throw 'record not found';
    }
    if (date) {
      calorie.date = date;
    }
    if (amount) {
      calorie.amount - amount;
    }
  });
};

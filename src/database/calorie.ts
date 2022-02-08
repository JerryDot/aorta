import moment from 'moment';
import realm, {Calorie} from './realm';
import {v4 as uuidv4} from 'uuid';
import {getGeneralRecentRecord, getGeneralRecordsPeriod} from './general';

export const getCalorieRecords = (startDay: Date): Realm.Results<Calorie> => {
  // Should be given the start of a day at 1200 am
  const endDay = new Date(startDay);
  endDay.setDate(startDay.getDate() + 1);
  return getGeneralRecordsPeriod<Calorie>('Calorie', startDay, endDay);
};

export const addCalorieRecord = (calories: number, time: Date) => {
  const possiblePrevRecord = getGeneralRecentRecord<Calorie>('Calorie');
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

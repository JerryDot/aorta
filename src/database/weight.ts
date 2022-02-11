import {getRecentRecord, getRecordsPeriod} from './general';
import realm, {Weight} from './realm';
import {v4 as uuidv4} from 'uuid';
import {dayEnd, dayStart} from '../utils/timeUtils';

export const getWeightRecords = (time: Date): Realm.Results<Weight> => {
  return getRecordsPeriod<Weight>('Weight', dayStart(time), dayEnd(time));
};

export const addWeightRecord = (weight: number, time: Date) => {
  const possiblePrevRecord = getRecentRecord<Weight>('Weight', time);
  if (possiblePrevRecord) {
    realm.write(() => {
      possiblePrevRecord.amount = weight;
    });
  } else {
    realm.write(() => {
      let newWeight = new Weight(time, weight, uuidv4());
      realm.create(Weight.schema.name, newWeight);
    });
  }
};

export const editWeightRecord = (recordID: string, date?: Date, amount?: number) => {
  realm.write(() => {
    let calorie = realm.objectForPrimaryKey<Weight>('Weight', recordID);
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

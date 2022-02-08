import {getGeneralRecentRecord, getGeneralRecordsPeriod} from './general';
import realm, {Weight} from './realm';
import {v4 as uuidv4} from 'uuid';

export const getWeightRecords = (startDay: Date): Realm.Results<Weight> => {
  // Should be given the start of a day at 1200 am
  const endDay = new Date(startDay);
  endDay.setDate(startDay.getDate() + 1);
  return getGeneralRecordsPeriod<Weight>('Weight', startDay, endDay);
};

export const addWeightRecord = (weight: number, time: Date) => {
  const possiblePrevRecord = getGeneralRecentRecord<Weight>('Weight');
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

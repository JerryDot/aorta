import {getGeneralRecentRecord} from './general';
import realm, {Weight} from './realm';
import {v4 as uuidv4} from 'uuid';

export const addWeightRecord = (weight: number) => {
  const possiblePrevRecord = getGeneralRecentRecord<Weight>('Weight');
  if (possiblePrevRecord) {
    realm.write(() => {
      possiblePrevRecord.amount = weight;
    });
  } else {
    realm.write(() => {
      let newWeight = new Weight(new Date(), weight, uuidv4());
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

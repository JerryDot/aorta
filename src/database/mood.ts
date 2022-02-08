import {getGeneralRecentRecord, getGeneralRecordsPeriod} from './general';
import realm, {Mood} from './realm';
import {v4 as uuidv4} from 'uuid';

export const getMoodRecords = (startDay: Date): Realm.Results<Mood> => {
  // Should be given the start of a day at 1200 am
  const endDay = new Date(startDay);
  endDay.setDate(startDay.getDate() + 1);
  return getGeneralRecordsPeriod<Mood>('Mood', startDay, endDay);
};

export const addMoodRecord = (rating: number, time: Date) => {
  const possiblePrevRecord = getGeneralRecentRecord<Mood>('Mood');
  if (possiblePrevRecord) {
    realm.write(() => {
      possiblePrevRecord.rating = rating;
    });
  } else {
    realm.write(() => {
      let mood = new Mood(time, rating, uuidv4(), null, null);
      realm.create(Mood.schema.name, mood);
    });
  }
};

export const editMoodRecord = (recordID: string, date?: Date, rating?: number, flavour?: string, comment?: string) => {
  realm.write(() => {
    let mood = realm.objectForPrimaryKey<Mood>('Mood', recordID);
    if (!mood) {
      throw 'record not found';
    }
    if (date) {
      mood.date = date;
    }
    if (rating) {
      mood.rating = rating;
    }
    if (flavour) {
      mood.flavour = flavour;
    }
    if (comment) {
      mood.comment = comment;
    }
  });
};

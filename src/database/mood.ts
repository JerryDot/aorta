import {getRecentRecord, getRecordsPeriod, resultsToArray} from './general';
import realm, {Mood} from './realm';
import {v4 as uuidv4} from 'uuid';
import {dayEnd, dayStart} from '../utils/timeUtils';

export const getMoodRecords = (time: Date): Realm.Results<Mood> => {
  return getRecordsPeriod<Mood>('Mood', dayStart(time), dayEnd(time));
};

export const addMoodRecord = (rating: number, time: Date) => {
  const possiblePrevRecord = getRecentRecord<Mood>('Mood', time);
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

export const alterMoodRecord = (comment: string, time: Date, setText: React.Dispatch<React.SetStateAction<string>>) => {
  const moodRecords = resultsToArray(getMoodRecords(time)).sort((a, b) => a.date.getTime() - b.date.getTime());
  let record = moodRecords.pop();
  if (!record) {
    setText('No record to comment on.');
  } else {
    editMoodRecord(record.recordID, record.date, record.rating, record.flavour || undefined, comment);
  }
};

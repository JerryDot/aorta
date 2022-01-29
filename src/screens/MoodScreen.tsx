import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Button, Text} from 'react-native';
import {RootStackParamList} from '../../App';
import realm from '../database/realm';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {addMoodRecord, getMoodRecords} from '../database/mood';
import moment from 'moment';
import {deleteRecord} from '../database/general';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const MoodScreen = ({navigation}: Props) => {
  const [dailyRecords, setDailyRecords] = useState(getMoodRecords(moment().startOf('day').toDate()));
  const buttonOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const refetchDailyRecords = () => {
    setDailyRecords(getMoodRecords(moment().startOf('day').toDate()));
  };

  const addMoodRecordHandler = (rating: number) => {
    addMoodRecord(rating);
    refetchDailyRecords();
  };

  const deleteMoodRecordHandler = (recordId: string) => {
    deleteRecord('Mood', recordId);
    refetchDailyRecords();
  };

  const AddMoodButton = ({rating}: {rating: number}) => (
    <Button key={rating} title={`+ ${rating} moods`} onPress={() => addMoodRecordHandler(rating)} />
  );

  return (
    <>
      <Text>This is {dailyRecords.length ? (dailyRecords.sum('rating') || 0) / dailyRecords.length : 'empty'}</Text>
      {buttonOptions.map(rating => (
        <AddMoodButton rating={rating} />
      ))}
      {dailyRecords.map(record => (
        <Text
          onPress={() =>
            deleteMoodRecordHandler(record.recordID)
          }>{`${record.date} ${record.rating} ${record.recordID} ${record.flavour} ${record.comment}`}</Text>
      ))}
    </>
  );
};

export default MoodScreen;

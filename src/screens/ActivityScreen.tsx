import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import React, {useState} from 'react';
import {Button, Text} from 'react-native';
import {RootStackParamList} from '../../App';
import {addActivityRecord, getActivityRecords} from '../database/activity';
import {deleteRecord} from '../database/general';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const ActivityScreen = ({navigation}: Props) => {
  const [dailyRecords, setDailyRecords] = useState(getActivityRecords(moment().startOf('day').toDate()));
  const buttonOptions = ['sport', 'social', 'dating', 'study', 'alcohol'];

  const refetchDailyRecords = () => {
    setDailyRecords(getActivityRecords(moment().startOf('day').toDate()));
  };

  const addActivityRecordHandler = (type: string) => {
    addActivityRecord(type);
    refetchDailyRecords();
  };

  const deleteActivityRecordHandler = (recordId: string) => {
    deleteRecord('Activity', recordId);
    refetchDailyRecords();
  };

  const AddActivityButton = ({type}: {type: string}) => (
    <Button key={type} title={`+ ${type} activitys`} onPress={() => addActivityRecordHandler(type)} />
  );

  return (
    <>
      <Text>This is {dailyRecords.length} activities.</Text>
      {buttonOptions.map(type => (
        <AddActivityButton type={type} />
      ))}
      {dailyRecords.map(record => (
        <Text onPress={() => deleteActivityRecordHandler(record.recordID)}>{`${record.date} ${record.type} ${record.recordID}`}</Text>
      ))}
    </>
  );
};

export default ActivityScreen;

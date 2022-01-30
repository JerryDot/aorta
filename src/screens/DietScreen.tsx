import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import React, {useState} from 'react';
import {Button, Text} from 'react-native';
import {RootStackParamList} from '../../App';
import {addCalorieRecord, getCalorieRecords} from '../database/calorie';
import {deleteRecord} from '../database/general';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const DietScreen = ({navigation}: Props) => {
  const [dailyRecords, setDailyRecords] = useState(getCalorieRecords(moment().startOf('day').toDate()));
  const buttonOptions = [25, 50, 100, 200, 400];

  const refetchDailyRecords = () => {
    setDailyRecords(getCalorieRecords(moment().startOf('day').toDate()));
  };

  const addCalorieRecordHandler = (amount: number) => {
    addCalorieRecord(amount);
    refetchDailyRecords();
  };

  const deleteCalorieRecordHandler = (recordId: string) => {
    deleteRecord('Calorie', recordId);
    refetchDailyRecords();
  };

  const AddCalorieButton = ({amount}: {amount: number}) => (
    <Button key={amount} title={`+ ${amount} calories`} onPress={() => addCalorieRecordHandler(amount)} />
  );

  return (
    <>
      <Text>This is {dailyRecords.sum('amount')}</Text>
      {buttonOptions.map(amount => (
        <AddCalorieButton key={'acb' + amount} amount={amount} />
      ))}
      {dailyRecords.map(record => (
        <Text
          key={record.recordID}
          onPress={() => deleteCalorieRecordHandler(record.recordID)}>{`${record.date} ${record.amount} ${record.recordID}`}</Text>
      ))}
    </>
  );
};

export default DietScreen;

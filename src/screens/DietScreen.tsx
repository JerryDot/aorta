import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import React, {useState} from 'react';
import {Button, Text} from 'react-native';
import {RootStackParamList} from '../../App';
import {addCalorieRecord, getCalorieRecords} from '../database/calorie';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const DietScreen = ({navigation}: Props) => {
  const [dailyRecords, setDailyRecords] = useState(getCalorieRecords(moment().startOf('day').toDate()));
  const buttonOptions = [25, 50, 100, 200, 500];

  const refetchDailyRecords = () => {
    setDailyRecords(getCalorieRecords(moment().startOf('day').toDate()));
  };

  const addCalorieRecordHandler = (amount: number) => {
    addCalorieRecord(amount);
    refetchDailyRecords();
  };

  const AddCalorieButton = ({amount}: {amount: number}) => (
    <Button key={amount} title={`+ ${amount} calories`} onPress={() => addCalorieRecordHandler(amount)} />
  );

  return (
    <>
      <Text>This is {dailyRecords.sum('amount')}</Text>
      {buttonOptions.map(amount => (
        <AddCalorieButton amount={amount} />
      ))}
      {dailyRecords.map(record => (
        <Text>{`${record.date} ${record.amount} ${record.recordID}`}</Text>
      ))}
    </>
  );
};

export default DietScreen;

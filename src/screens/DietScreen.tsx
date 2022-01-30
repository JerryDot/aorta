import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Grid, Col, Row} from 'react-native-easy-grid';
import {Button} from 'react-native-elements';
import {RootStackParamList} from '../../App';
import {addCalorieRecord, getCalorieRecords} from '../database/calorie';
import {deleteRecord} from '../database/general';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const DietScreen = ({navigation}: Props) => {
  const [dailyRecords, setDailyRecords] = useState(getCalorieRecords(moment().startOf('day').toDate()));
  const buttonOptions = [25, 50, 100];
  const secondButtonOptions = [200, 400, 1000];

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

  const stringFromAmount = (amount: number): string => {
    let returnString = '+' + amount.toString();
    if (amount < 100) {
      returnString = ' ' + returnString;
    }
    if (amount < 1000) {
      returnString = ' ' + returnString;
    }
    return returnString;
  };

  const AddCalorieButton = ({amount}: {amount: number}) => (
    <View style={{width: '30%', height: 50, justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', flex: 1}}>
      <Button
        buttonStyle={{height: 50, width: 80}}
        key={amount}
        title={`${stringFromAmount(amount)}`}
        onPress={() => addCalorieRecordHandler(amount)}
      />
    </View>
  );

  return (
    <>
      <View style={{height: 40}}>
        <Grid>
          <Col>
            <Button title="Mood" onPress={() => navigation.navigate('Mood')} />
          </Col>
          <Col>
            <Button title="Diet" onPress={() => navigation.navigate('Diet')} />
          </Col>
          <Col>
            <Button title="Activity" onPress={() => navigation.navigate('Activity')} />
          </Col>
        </Grid>
      </View>
      <Text>This is {dailyRecords.sum('amount')}</Text>
      <View style={{paddingTop: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
        {buttonOptions.map(amount => (
          <AddCalorieButton key={'acb' + amount} amount={amount} />
        ))}
      </View>
      <View style={{paddingTop: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
        {secondButtonOptions.map(amount => (
          <AddCalorieButton key={'acb' + amount} amount={amount} />
        ))}
      </View>
      {dailyRecords.map(record => (
        <Text
          style={styles.titleText}
          key={record.recordID}
          onPress={() => deleteCalorieRecordHandler(record.recordID)}>{`${record.date} ${record.amount} ${record.recordID}`}</Text>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DietScreen;

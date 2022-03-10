import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TextInput, useWindowDimensions, View} from 'react-native';
import {DebugTimeContext, RootStackParamList} from '../../App';
import 'react-native-get-random-values';
import {putSleepRecord, getSleepRecord} from '../database/sleep';
import {deleteRecord} from '../database/general';
import {Grid, Col, Row} from 'react-native-easy-grid';
import {Button} from 'react-native-elements';
import {dayStart} from '../utils/timeUtils';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type DailySleep = {
  doze: Date;
  wake: Date;
};

const SleepScreen = ({navigation}: Props) => {
  const {debugTime, setDebugTime} = useContext(DebugTimeContext);
  const [dailyRecords, setDailyRecords] = useState<DailySleep>(
    getSleepRecord(dayStart(debugTime || new Date())) || {
      doze: new Date(
        (debugTime || new Date()).getFullYear(),
        (debugTime || new Date()).getMonth(),
        (debugTime || new Date()).getDate() - 1,
        23,
      ),
      wake: new Date((debugTime || new Date()).getFullYear(), (debugTime || new Date()).getMonth(), (debugTime || new Date()).getDate(), 7),
    },
  );
  const [doze, setDoze] = useState<Date>(dailyRecords.doze);
  const [wake, setWake] = useState<Date>(dailyRecords.wake);
  const {height, width} = useWindowDimensions();

  const refetchDailyRecords = (doze?: Date, wake?: Date) => {
    setDailyRecords(
      getSleepRecord(dayStart(debugTime || new Date())) || {
        doze: new Date(
          (debugTime || new Date()).getFullYear(),
          (debugTime || new Date()).getMonth(),
          (debugTime || new Date()).getDate() - 1,
          23,
        ),
        wake: new Date(
          (debugTime || new Date()).getFullYear(),
          (debugTime || new Date()).getMonth(),
          (debugTime || new Date()).getDate(),
          7,
        ),
      },
    );
    doze && setDoze(doze);
    wake && setWake(wake);
  };

  const putSleepRecordHandler = () => {
    putSleepRecord(debugTime || new Date(), doze, wake);
    setDailyRecords({doze: doze, wake: wake});
  };

  const deleteSleepRecordHandler = (recordId: string) => {
    deleteRecord('Sleep', recordId);
    refetchDailyRecords();
  };

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
          <Col>
            <Button title="Sleep" onPress={() => navigation.navigate('Sleep')} />
          </Col>
        </Grid>
      </View>
      <Text style={{color: 'black'}}>Previous day sleep start and end times</Text>
      <DatePicker date={dailyRecords && dailyRecords.doze} onDateChange={setDoze} mode="time" />
      <DatePicker date={dailyRecords && dailyRecords.wake} onDateChange={setWake} mode="time" />
      <Button title="Save sleeps" containerStyle={{paddingTop: 5}} onPress={() => putSleepRecordHandler()} />
      <ScrollView style={{height: width}}>
        <Grid style={{height: width}}>
          <Row key={'sleep' + 'row'}>
            <Col size={1}>
              <Text style={styles.titleText}>{`${dailyRecords && dailyRecords.doze}`}</Text>
            </Col>
            <Col size={1}>
              <Text style={styles.titleText}>{`${dailyRecords && dailyRecords.wake}`}</Text>
            </Col>
          </Row>
        </Grid>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {
    paddingLeft: 10,
    color: 'black',
    paddingTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SleepScreen;

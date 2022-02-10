import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DebugTimeContext, RootStackParamList} from '../../App';
import realm from '../database/realm';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {addMoodRecord, getMoodRecords} from '../database/mood';
import moment from 'moment';
import {deleteRecord} from '../database/general';
import {Grid, Col} from 'react-native-easy-grid';
import {Button} from 'react-native-elements';
import {isToday, startOfDay} from '../utils/timeUtils';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const MoodScreen = ({navigation}: Props) => {
  const [dailyRecords, setDailyRecords] = useState(getMoodRecords(moment().startOf('day').toDate()));
  const {debugTime, setDebugTime} = useContext(DebugTimeContext);
  const buttonOptions = [1, 2, 3, 4, 5];
  const secondButtonOptions = [6, 7, 8, 9, 10];

  const refetchDailyRecords = () => {
    setDailyRecords(getMoodRecords(startOfDay(debugTime)));
  };

  const addMoodRecordHandler = (rating: number) => {
    addMoodRecord(rating, isToday(debugTime) ? new Date() : debugTime);
    refetchDailyRecords();
  };

  const deleteMoodRecordHandler = (recordId: string) => {
    deleteRecord('Mood', recordId);
    refetchDailyRecords();
  };

  const AddMoodButton = ({rating}: {rating: number}) => (
    <View style={{width: '30%', height: 50, justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', flex: 1}}>
      <Button buttonStyle={{height: 50, width: 60}} key={rating} title={`${rating}`} onPress={() => addMoodRecordHandler(rating)} />
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
      <Text style={{color: 'black'}}>
        This is {dailyRecords.length ? (dailyRecords.sum('rating') || 0) / dailyRecords.length : 'empty'}
      </Text>
      <View style={{paddingTop: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
        {buttonOptions.map(rating => (
          <AddMoodButton key={'amb' + rating} rating={rating} />
        ))}
      </View>
      <View style={{paddingTop: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
        {secondButtonOptions.map(rating => (
          <AddMoodButton key={'amb' + rating} rating={rating} />
        ))}
      </View>
      {dailyRecords.map(record => (
        <Text
          style={styles.titleText}
          key={record.recordID}
          onPress={() =>
            deleteMoodRecordHandler(record.recordID)
          }>{`${record.date} ${record.rating} ${record.recordID} ${record.flavour} ${record.comment}`}</Text>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: 'black',
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MoodScreen;

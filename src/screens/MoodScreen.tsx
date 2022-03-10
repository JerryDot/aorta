import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TextInput, useWindowDimensions, View} from 'react-native';
import {DebugTimeContext, RootStackParamList} from '../../App';
import 'react-native-get-random-values';
import {addMoodRecord, alterMoodRecord, getMoodRecords} from '../database/mood';
import {deleteRecord} from '../database/general';
import {Grid, Col, Row} from 'react-native-easy-grid';
import {Button} from 'react-native-elements';
import {dayStart, dString} from '../utils/timeUtils';
import {ScrollView} from 'react-native-gesture-handler';
import {Mood} from '../database/realm';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const MoodScreen = ({navigation}: Props) => {
  const {debugTime, setDebugTime} = useContext(DebugTimeContext);
  const [dailyRecords, setDailyRecords] = useState<Realm.Results<Mood>>(getMoodRecords(dayStart(debugTime || new Date())));
  const buttonOptions = [1, 2, 3, 4, 5];
  const secondButtonOptions = [6, 7, 8, 9, 10];
  const {height, width} = useWindowDimensions();
  const [moodComment, setMoodComment] = useState<string>('');

  const refetchDailyRecords = () => {
    setDailyRecords(getMoodRecords(dayStart(debugTime || new Date())));
  };

  const addMoodRecordHandler = (rating: number) => {
    addMoodRecord(rating, debugTime || new Date());
    refetchDailyRecords();
  };

  const commentMoodRecordHandler = (comment: string) => {
    alterMoodRecord(comment, debugTime || new Date(), setMoodComment);
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
          <Col>
            <Button title="Sleep" onPress={() => navigation.navigate('Sleep')} />
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
      <ScrollView style={{height: width}}>
        <Grid style={{height: width}}>
          {dailyRecords.map(record => (
            <Row key={record.recordID + 'row'}>
              <Col size={1}>
                <Text style={styles.titleText} key={record.recordID} onPress={() => deleteMoodRecordHandler(record.recordID)}>
                  {`${dString(record.date)}`}
                </Text>
              </Col>
              <Col size={1}>
                <Text style={styles.titleText}>{`${record.rating}`}</Text>
              </Col>
              <Col size={3}>
                <Text style={styles.titleText}>{`${record.comment}`}</Text>
              </Col>
            </Row>
          ))}
        </Grid>
      </ScrollView>
      <TextInput
        style={{height: 80, color: 'gray', fontSize: 20, paddingTop: 10}}
        placeholder="Add comment"
        placeholderTextColor={'black'}
        onChangeText={moodComment => setMoodComment(moodComment)}
        defaultValue={moodComment}
      />
      <Button title="Add Comment" containerStyle={{paddingTop: 10}} onPress={() => commentMoodRecordHandler(moodComment)} />
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

export default MoodScreen;

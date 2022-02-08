import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {RootStackParamList} from '../../App';
import {ScrollView} from 'react-native-gesture-handler';
import {GraphWrapper} from '../components/Graph';
import {useIsFocused} from '@react-navigation/core';
import {RecordString} from '../database/realm';
import {timespanToStartDate} from '../utils/timeUtils';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const [key, setKey] = useState(1);
  const [oneKey, setOneKey] = useState<RecordString>('Mood');
  const [twoKey, setTwoKey] = useState<RecordString>('Calorie');
  const [graphStartDate, setGraphStartDate] = useState<Date>(timespanToStartDate('all'));
  const isFocused = useIsFocused();

  useEffect(() => {
    setKey(key + 1);
  }, [isFocused]);

  return (
    <>
      <ScrollView>
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
            <Button title="Data" onPress={() => navigation.navigate('Data')} />
          </Col>
        </Grid>
        <View key={key} style={{paddingBottom: 30}}>
          <GraphWrapper oneKey={oneKey} twoKey={twoKey} startDate={graphStartDate} />
        </View>
        <Grid>
          <Row>
            <Col>
              <Button title="Mood" onPress={() => setOneKey('Mood')} />
              <Button title="Diet" onPress={() => setOneKey('Calorie')} />
              <Button title="Activity" onPress={() => setOneKey('Activity')} />
              <Button title="Weight" onPress={() => setOneKey('Weight')} />
            </Col>
            <Col>
              <Button title="Mood" onPress={() => setTwoKey('Mood')} />
              <Button title="Diet" onPress={() => setTwoKey('Calorie')} />
              <Button title="Activity" onPress={() => setTwoKey('Activity')} />
              <Button title="Weight" onPress={() => setTwoKey('Weight')} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button title="Day" onPress={() => setGraphStartDate(timespanToStartDate('day'))} />
            </Col>
            <Col>
              <Button title="Week" onPress={() => setGraphStartDate(timespanToStartDate('week'))} />
            </Col>
            <Col>
              <Button title="Month" onPress={() => setGraphStartDate(timespanToStartDate('month'))} />
            </Col>
            <Col>
              <Button title="All" onPress={() => setGraphStartDate(timespanToStartDate('all'))} />
            </Col>
          </Row>
        </Grid>
      </ScrollView>
    </>
  );
};

export default HomeScreen;

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {RootStackParamList} from '../../App';
import {ScrollView} from 'react-native-gesture-handler';
import {GraphWrapper} from '../components/Graph';
import {useIsFocused} from '@react-navigation/core';
import {RecordString} from '../database/realm';
import {Timespan, timespanToStartDate} from '../utils/timeUtils';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const [key, setKey] = useState(1);
  const [oneKey, setOneKey] = useState<RecordString>('Mood');
  const [twoKey, setTwoKey] = useState<RecordString>('Calorie');
  const [graphTimespan, setGraphTimespan] = useState<Timespan>('all');
  const [graphTime, setGraphTime] = useState<Date>(new Date());
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
          <GraphWrapper oneKey={oneKey} twoKey={twoKey} time={graphTime} timespan={graphTimespan} />
        </View>
        <Grid>
          <Row>
            <Col style={{paddingBottom: 5}}>
              <Button color={oneKey === 'Mood' ? 'blue' : ''} title="Mood" onPress={() => setOneKey('Mood')} />
              <Button color={oneKey === 'Calorie' ? 'darkgreen' : ''} title="Diet" onPress={() => setOneKey('Calorie')} />
              <Button
                color={oneKey === 'Activity' ? 'darkpurple' : ''}
                disabled={true}
                title="Activity"
                onPress={() => setOneKey('Activity')}
              />
              <Button color={oneKey === 'Weight' ? 'darkred' : ''} title="Weight" onPress={() => setOneKey('Weight')} />
            </Col>
            <Col style={{paddingBottom: 5}}>
              <Button color={twoKey === 'Mood' ? 'blue' : ''} title="Mood" onPress={() => setTwoKey('Mood')} />
              <Button color={twoKey === 'Calorie' ? 'darkgreen' : ''} title="Diet" onPress={() => setTwoKey('Calorie')} />
              <Button
                color={twoKey === 'Activity' ? 'darkred' : ''}
                disabled={true}
                title="Activity"
                onPress={() => setTwoKey('Activity')}
              />
              <Button color={twoKey === 'Weight' ? 'darkred' : ''} title="Weight" onPress={() => setTwoKey('Weight')} />
            </Col>
          </Row>
          <Row>
            <Col style={{paddingBottom: 5}}>
              <Button color={graphTimespan === 'day' ? 'blue' : ''} title="Day" onPress={() => setGraphTimespan('day')} />
            </Col>
            <Col style={{paddingBottom: 5}}>
              <Button color={graphTimespan === 'week' ? 'blue' : ''} title="Week" onPress={() => setGraphTimespan('week')} />
            </Col>
            <Col style={{paddingBottom: 5}}>
              <Button color={graphTimespan === 'month' ? 'blue' : ''} title="Month" onPress={() => setGraphTimespan('month')} />
            </Col>
            <Col style={{paddingBottom: 5}}>
              <Button color={graphTimespan === 'all' ? 'blue' : ''} title="All" onPress={() => setGraphTimespan('all')} />
            </Col>
          </Row>
        </Grid>
      </ScrollView>
    </>
  );
};

export default HomeScreen;

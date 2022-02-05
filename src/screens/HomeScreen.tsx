import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import {Col, Grid} from 'react-native-easy-grid';
import {RootStackParamList} from '../../App';
import {ScrollView} from 'react-native-gesture-handler';
import {GraphWrapper} from '../components/Graph';
import {useIsFocused} from '@react-navigation/core';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const [key, setKey] = useState(1);
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
        <View key={key}>
          <GraphWrapper oneKey={'Mood'} twoKey={'Calorie'} timespan={'week'} />
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button} from 'react-native';
import {Col, Grid} from 'react-native-easy-grid';
import {RootStackParamList} from '../../App';
import {ScrollView} from 'react-native-gesture-handler';
import Graph from '../components/Graph';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
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
        <Graph />
      </ScrollView>
    </>
  );
};

export default HomeScreen;

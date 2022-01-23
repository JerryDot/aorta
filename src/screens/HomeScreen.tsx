import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button} from 'react-native';
import {Col, Grid} from 'react-native-easy-grid';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  return (
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
  );
};

export default HomeScreen;

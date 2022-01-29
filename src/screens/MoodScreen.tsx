import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button} from 'react-native';
import {RootStackParamList} from '../../App';
import realm from '../database/realm';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const MoodScreen = ({navigation}: Props) => {
  const storeMood = () => {
    realm.write(() => {
      realm.create('Mood', {
        recordID: uuidv4(),
        rating: 5,
        date: new Date(),
      });
    });
  };

  return (
    <>
      <Button title="Go to Jane's profile" onPress={() => navigation.navigate('Profile', {userId: 'Jane'})} />
      <Button title="hi" onPress={() => storeMood()}></Button>
    </>
  );
};

export default MoodScreen;

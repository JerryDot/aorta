import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Share, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-elements';
import {RootStackParamList} from '../../App';
import {getAllData} from '../database/fullData';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const shareOptions = (data: string) => ({
  title: 'Title',
  message: data, // Note that according to the documentation at least one of "message" or "url" fields is required
  url: 'www.example.com',
  subject: 'Subject',
});

const ShareExample = () => {
  const onSharePress = () => Share.share(shareOptions(JSON.stringify(getAllData())));
  return (
    <TouchableOpacity onPress={() => onSharePress()}>
      <Text>Share data</Text>
    </TouchableOpacity>
  );
};

const DataScreen = ({navigation}: Props) => {
  return (
    <View>
      <Button title="Mood" onPress={() => navigation.navigate('Mood')} />
      <ShareExample />
    </View>
  );
};

export default DataScreen;

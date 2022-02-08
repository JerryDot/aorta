import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {Share, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Button} from 'react-native-elements';
import {DebugTimeContext, RootStackParamList} from '../../App';
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
      <Text style={{color: 'black'}}>Share data</Text>
    </TouchableOpacity>
  );
};

const DataScreen = ({navigation}: Props) => {
  const {debugTime, setDebugTime} = useContext(DebugTimeContext);

  return (
    <View>
      <Button title="Mood" onPress={() => navigation.navigate('Mood')} />
      <ShareExample />
      <DatePicker date={debugTime} onDateChange={setDebugTime} />
      <Button title="Reset default time" onPress={() => setDebugTime(new Date())} />
    </View>
  );
};

export default DataScreen;

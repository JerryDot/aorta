import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {ScrollView, Share, TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Button} from 'react-native-elements';
import {DebugTimeContext, RootStackParamList} from '../../App';
import {getAllData, insertAllData} from '../database/fullData';
import realm from '../database/realm';
import {getTestData} from '../utils/testData';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const shareOptions = (data: string) => ({
  title: 'Title',
  message: data, // Note that according to the documentation at least one of "message" or "url" fields is required
  url: 'www.example.com',
  subject: 'Subject',
});

const DataScreen = ({navigation}: Props) => {
  const {debugTime, setDebugTime} = useContext(DebugTimeContext);
  const [text, setText] = useState<string>('');

  const shareHandler = () => {
    Share.share(shareOptions(JSON.stringify(getAllData(new Date()))));
  };

  return (
    <ScrollView>
      <Button title="Export data" onPress={() => shareHandler()} />
      <DatePicker date={debugTime || new Date()} onDateChange={setDebugTime} />
      <Button title="Reset default time" onPress={() => setDebugTime(undefined)} />
      <TextInput
        style={{height: 80, color: 'black', fontSize: 20, paddingTop: 10}}
        placeholder="Import data from text."
        placeholderTextColor={'black'}
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <Button title="Import data." disabled={!text} onPress={() => insertAllData(JSON.parse(text))} />
      <Button title="Clear tables" containerStyle={{paddingTop: 5}} onPress={() => realm.write(() => realm.deleteAll())} />
      <Button title="Add test-data" containerStyle={{paddingTop: 5}} onPress={() => insertAllData(getTestData(3))} />
    </ScrollView>
  );
};

export default DataScreen;

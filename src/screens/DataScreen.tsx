import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Share, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-elements';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const shareOptions = {
  title: 'Title',
  message: 'Message to share', // Note that according to the documentation at least one of "message" or "url" fields is required
  url: 'www.example.com',
  subject: 'Subject',
};

export class ShareExample extends React.Component {
  onSharePress = () => Share.share(shareOptions);

  render() {
    return (
      <TouchableOpacity onPress={this.onSharePress}>
        <Text>Share data</Text>
      </TouchableOpacity>
    );
  }
}

const DataScreen = ({navigation}: Props) => {
  return (
    <View>
      <Button title="Mood" onPress={() => navigation.navigate('Mood')} />
      <ShareExample />
    </View>
  );
};

export default DataScreen;

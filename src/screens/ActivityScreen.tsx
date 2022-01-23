import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { Button } from 'react-native';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const ActivityScreen = ({ navigation }: Props) => {
	return (
		<Button
			title="Go to Jane's profile"
			onPress={() =>
				navigation.navigate('Profile', { userId: 'Jane' })
			}
		/>
	);
};

export default ActivityScreen;
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import React, {useState} from 'react';
import {Button, ScrollView, Text} from 'react-native';
import {RootStackParamList} from '../../App';
import ContributionGraph from '../contribution';
import {addActivityRecord, getActivityRecords} from '../database/activity';
import {deleteRecord} from '../database/general';

export type activityColors = {
  sport: string;
  social: string;
  dating: string;
  study: string;
  alcohol: string;
  wfh: string;
  wfo: string;
};

const activityColorMap = {
  sport: 'red',
  social: 'purple',
  dating: 'pink',
  study: 'green',
  alcohol: 'black',
  wfh: 'orange',
  wfo: 'yellow',
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const ActivityScreen = ({navigation}: Props) => {
  const [dailyRecords, setDailyRecords] = useState(getActivityRecords(moment().startOf('day').toDate()));
  const buttonOptions = ['sport', 'social', 'dating', 'study', 'alcohol', 'wfh', 'wfo'];

  const refetchDailyRecords = () => {
    setDailyRecords(getActivityRecords(moment().startOf('day').toDate()));
  };

  const addActivityRecordHandler = (type: string) => {
    addActivityRecord(type);
    refetchDailyRecords();
  };

  const deleteActivityRecordHandler = (recordId: string) => {
    deleteRecord('Activity', recordId);
    refetchDailyRecords();
  };

  const AddActivityButton = ({type}: {type: string}) => (
    <Button key={type} title={`+ ${type} activitys`} onPress={() => addActivityRecordHandler(type)} />
  );

  const commitsData = [
    {date: '2017-01-02', count: 1},
    {date: '2017-01-03', count: 2},
    {date: '2017-01-04', count: 3, activityType: 'sport'},
    {date: '2017-01-05', count: 4, activityType: 'sport'},
    {date: '2017-01-06', count: 5, activityType: 'sport'},
    {date: '2017-01-30', count: 2},
    {date: '2017-01-31', count: 3},
    {date: '2017-03-01', count: 2, activityType: 'sport'},
    {date: '2017-04-02', count: 4, activityType: 'sport'},
    {date: '2017-03-05', count: 2},
    {date: '2017-02-30', count: 4},
  ];

  const chartConfig = {
    // backgroundGradientFrom: '#1E2923',
    // backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: '#08130D',
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <ScrollView>
      <Text>This is {dailyRecords.length} activities.</Text>
      {buttonOptions.map(type => (
        <AddActivityButton key={'aab' + type} type={type} />
      ))}
      {dailyRecords.map(record => (
        <Text
          key={record.recordID}
          onPress={() => deleteActivityRecordHandler(record.recordID)}>{`${record.date} ${record.type} ${record.recordID}`}</Text>
      ))}
      <ScrollView horizontal={true}>
        <ContributionGraph
          values={commitsData}
          endDate={new Date('2017-04-05')}
          numDays={100}
          // width={screenWidth}
          height={250}
          width={600} // chartConfig={chartConfig}
          tooltipDataAttrs={null}
          chartConfig={chartConfig}
          gutterSize={5}
          borderSize={3}
          showOutOfRangeDays={true}
          activityColorMap={activityColorMap}
        />
      </ScrollView>
      {/* <ContributionGraph
        values={commitsData}
        endDate={new Date('2021-05-01')}
        width={335}
        height={220}
        borderSize={3}
        chartConfig={{
          backgroundGradientFrom: '#e2e2e2',
          backgroundGradientTo: '#e2e2e2',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        tooltipDataAttrs={null}
        style={{
          marginVertical: 10,
          borderRadius: 10,
        }}
      /> */}
    </ScrollView>
  );
};

export default ActivityScreen;

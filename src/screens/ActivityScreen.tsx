import {NativeStackScreenProps} from '@react-navigation/native-stack';
import moment from 'moment';
import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Grid, Col} from 'react-native-easy-grid';
import {Button} from 'react-native-elements';
import {DebugTimeContext, RootStackParamList} from '../../App';
import ContributionGraph from '../contribution';
import {addActivityRecord, getActivityRecords} from '../database/activity';
import {deleteRecord} from '../database/general';
import {isToday} from '../utils/timeUtils';

export type activityColors = {
  sport: string;
  social: string;
  dating: string;
  study: string;
  alcohol: string;
  wfh: string;
  wfo: string;
  'w+': string;
  'w-': string;
  'o+': string;
  'o-': string;
};

const activityColorMap = {
  sport: 'red',
  social: 'purple',
  dating: 'pink',
  study: 'green',
  alcohol: 'black',
  wfh: 'orange',
  wfo: 'yellow',
  'w+': 'black',
  'w-': 'grey',
  'o+': 'green',
  'o-': 'red',
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const ActivityScreen = ({navigation}: Props) => {
  const [dailyRecords, setDailyRecords] = useState(getActivityRecords(moment().startOf('day').toDate()));
  const {height, width} = useWindowDimensions();
  const {debugTime, setDebugTime} = useContext(DebugTimeContext);

  const buttonOptions = ['sport', 'social', 'dating'];
  const secondButtonOptions = ['study', 'o+', 'o-', 'alcohol'];
  const thirdButtonOptions = ['wfh', 'wfo', 'w+', 'w-'];

  const refetchDailyRecords = () => {
    setDailyRecords(getActivityRecords(moment().startOf('day').toDate()));
  };

  const addActivityRecordHandler = (type: string) => {
    addActivityRecord(type, isToday(debugTime) ? new Date() : debugTime);
    refetchDailyRecords();
  };

  const deleteActivityRecordHandler = (recordId: string) => {
    deleteRecord('Activity', recordId);
    refetchDailyRecords();
  };

  const AddActivityButton = ({type}: {type: string}) => (
    <View style={{width: '30%', height: 50, justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', flex: 1}}>
      <Button buttonStyle={{height: 50, width: 80}} key={type} title={type} onPress={() => addActivityRecordHandler(type)} />
    </View>
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
    {date: '2017-04-05', count: 4, activityType: 'sport'},
    {date: '2022-01-01', count: 2},
    {date: '2022-01-21', count: 4},
  ];

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFFFFF',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <>
      <View style={{height: 40}}>
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
      </View>
      <Text style={{color: 'black'}}>This is {dailyRecords.length} activities.</Text>
      <View style={{paddingTop: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
        {buttonOptions.map(type => (
          <AddActivityButton key={'aab' + type} type={type} />
        ))}
      </View>
      <View style={{paddingTop: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
        {secondButtonOptions.map(type => (
          <AddActivityButton key={'aab' + type} type={type} />
        ))}
      </View>
      <View style={{paddingTop: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
        {thirdButtonOptions.map(type => (
          <AddActivityButton key={'aab' + type} type={type} />
        ))}
      </View>
      {dailyRecords.map(record => (
        <Text
          style={styles.titleText}
          key={record.recordID}
          onPress={() => deleteActivityRecordHandler(record.recordID)}>{`${record.date.toDateString()} ${record.type} ${
          record.recordID
        }`}</Text>
      ))}
      <View>
        <ScrollView horizontal={true}>
          <ContributionGraph
            key={'sadfasf'}
            values={commitsData}
            endDate={new Date('2022-01-25')}
            numDays={77}
            // width={screenWidth}
            height={250}
            width={width} // chartConfig={chartConfig}
            tooltipDataAttrs={null}
            chartConfig={chartConfig}
            gutterSize={5}
            borderSize={3}
            showOutOfRangeDays={true}
            activityColorMap={activityColorMap}
          />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: 'black',
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ActivityScreen;

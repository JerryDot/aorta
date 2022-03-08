import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Grid, Col} from 'react-native-easy-grid';
import {Button} from 'react-native-elements';
import {DebugTimeContext, RootStackParamList} from '../../App';
import ContributionGraph from '../contribution';
import {addActivityRecord, getActivityRecords} from '../database/activity';
import {deleteRecord} from '../database/general';
import {DaySummary} from '../database/day';
import {getDaysSummary} from '../database/fullData';
import SegmentedControlTab from 'react-native-segmented-control-tab';

export type ActivityType = 'sport' | 'social' | 'dating' | 'study' | 'alcohol' | 'wfh' | 'wfo' | 'w+' | 'w-' | 'o+' | 'o-';

export type activityColors = {
  sport: string;
  social: string;
  dating: string;
  study: string;
  alcohol: string;
  wfh: string;
  wfo: string;
  'w+': string;
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
  'o+': 'green',
  'o-': 'red',
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const ActivityScreen = ({navigation}: Props) => {
  const graphDuration = 77;
  const {debugTime, setDebugTime} = useContext(DebugTimeContext);
  let currentTime = debugTime || new Date();
  let oldenTime = new Date(currentTime);
  oldenTime.setDate(oldenTime.getDate() - graphDuration);
  const [dailyRecords, setDailyRecords] = useState(getActivityRecords(debugTime || new Date()));
  const [graphActivityRecords, setGraphActivityRecords] = useState<DaySummary[]>(getDaysSummary(oldenTime, currentTime));
  const {height, width} = useWindowDimensions();
  const [activity, setActivity] = useState<ActivityType>('sport');

  const buttonOptions: ActivityType[] = ['sport', 'social', 'dating'];
  const secondButtonOptions: ActivityType[] = ['study', 'o+', 'o-', 'alcohol'];
  const thirdButtonOptions: ActivityType[] = ['wfh', 'wfo', 'w+'];
  const [select, setSelect] = useState<boolean>(false);

  const refetchDailyRecords = () => {
    setDailyRecords(getActivityRecords(debugTime || new Date()));
    setGraphActivityRecords(getDaysSummary(oldenTime, currentTime));
  };

  const addActivityRecordHandler = (type: string) => {
    addActivityRecord(type, debugTime || new Date());
    refetchDailyRecords();
  };

  const deleteActivityRecordHandler = (recordId: string) => {
    deleteRecord('Activity', recordId);
    refetchDailyRecords();
  };

  const ActivityButton = ({type}: {type: ActivityType}) => (
    <View style={{width: '30%', height: 50, justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'row', flex: 1}}>
      <Button
        buttonStyle={{height: 50, width: 80}}
        key={type}
        title={type}
        onPress={select ? () => setActivity(type) : () => addActivityRecordHandler(type)}
      />
    </View>
  );

  const fullGraphData = (daySummaries: DaySummary[], activity: string) =>
    daySummaries
      .map(day => ({
        date: day.day.toLocaleDateString('en-CA'),
        count: day.mood,
        activityType: day.activities.filter(act => act === activity),
      }))
      .filter(day => day.count);

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
    {date: '2022-01-21', count: 4, activityType: 'sport'},
    {date: '2022-01-28', count: 9, activityType: 'sport'},
  ];

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FFFFFF',
    backgroundGradientToOpacity: 0.1,
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
      <ScrollView>
        <Text style={{color: 'black'}}>This is {dailyRecords.length} activities.</Text>
        <View style={{paddingTop: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
          {buttonOptions.map((type: ActivityType) => (
            <ActivityButton key={'aab' + type} type={type} />
          ))}
        </View>
        <View style={{paddingTop: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
          {secondButtonOptions.map(type => (
            <ActivityButton key={'aab' + type} type={type} />
          ))}
        </View>
        <View style={{paddingTop: 20, flexDirection: 'row', flexWrap: 'wrap'}}>
          {thirdButtonOptions.map(type => (
            <ActivityButton key={'aab' + type} type={type} />
          ))}
        </View>
        <SegmentedControlTab
          tabsContainerStyle={{paddingVertical: 15, paddingHorizontal: 20}}
          tabStyle={{borderColor: '#2196F3'}}
          activeTabStyle={{backgroundColor: '#2196F3'}}
          tabTextStyle={{color: '#2196F3'}}
          selectedIndex={Number(select)}
          allowFontScaling={false}
          values={['Add', 'Select']}
          onTabPress={index => setSelect(Boolean(index))}
        />
        <View>
          <ScrollView horizontal={true}>
            {activity && graphActivityRecords && (
              <ContributionGraph
                key={'sadfasf'}
                values={fullGraphData(graphActivityRecords, activity)}
                endDate={currentTime}
                numDays={graphDuration}
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
            )}
          </ScrollView>
        </View>
        {dailyRecords.map(record => (
          <Text style={styles.titleText} key={record.recordID} onPress={() => deleteActivityRecordHandler(record.recordID)}>
            {`${record.date.toDateString()} ${record.type}`}
          </Text>
        ))}
      </ScrollView>
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

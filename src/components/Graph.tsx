import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {YAxis, XAxis, LineChart, Grid, BarChart} from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import * as dateFns from 'date-fns';
import * as shape from 'd3-shape';
import {Circle, G, Line} from 'react-native-svg';
import {Calorie, Mood, RecordString, Weight} from '../database/realm';
import {getDaysSummary} from '../database/fullData';
import {getRecordsPeriod} from '../database/general';
import {useIsFocused} from '@react-navigation/core';
import {dayEnd, dayStart, Timespan, timespanToStartDate} from '../utils/timeUtils';
import {getDayStartEnd} from '../database/day';

type lineColors = 'purple' | 'green' | 'blue' | 'red';

export type LineData = {date: Date; value?: number}[];

export type GraphInput = {
  lineData: LineData;
  lineColor: lineColors;
  max: number;
  min: number;
  numberOfTicks: number;
  bar?: boolean;
};

const CalorieGraphConfig = (time: Date, timespan: Timespan): GraphInput => {
  let graphData = {} as GraphInput;
  graphData.lineData = getDaysSummary(timespanToStartDate(time, timespan), dayEnd(time))
    .map(record => ({
      date: record.day,
      value: record.calories,
    }))
    .filter(
      record =>
        record.value ||
        (record.date.getMonth() == timespanToStartDate(time, timespan).getMonth() &&
          record.date.getDate() == timespanToStartDate(time, timespan).getDate()),
    );
  graphData.lineData.sort((a, b) => a.date.getTime() - b.date.getTime());
  graphData.max = Math.max(...graphData.lineData.map(point => point.value || 0), 1400) + 100;

  graphData.min = 0;
  graphData.lineColor = 'green';
  graphData.numberOfTicks = 10;
  return graphData;
};

const CalorieDayGraphConfig = (time: Date): GraphInput => {
  let graphData = {} as GraphInput;
  const dayRecords = getRecordsPeriod<Calorie>('Calorie', dayStart(time), dayEnd(time)).map(record => ({
    date: record.date,
    value: record.amount,
  }));
  const startEnd = getDayStartEnd(time);
  graphData.lineData = [];
  for (let d = startEnd.start; d <= startEnd.end; d.setMinutes(d.getMinutes() + 20)) {
    graphData.lineData.push({
      date: d,
      value: dayRecords
        .filter(record => d <= record.date && record.date.getTime() <= d.getTime() + 20 * 60 * 1000)
        .reduce((sum, record) => record.value + sum, 0),
    });
  }
  graphData.max = Math.max(...graphData.lineData.map(point => point.value || 0), 500) + 100;
  graphData.bar = true;
  graphData.min = 0;
  graphData.lineColor = 'green';
  graphData.numberOfTicks = 10;
  return graphData;
};

const MoodGraphConfig = (time: Date, timespan: Timespan): GraphInput => {
  let graphData = {} as GraphInput;
  graphData.lineData = getDaysSummary(timespanToStartDate(time, timespan), dayEnd(time))
    .map(record => ({
      date: record.day,
      value: record.mood,
    }))
    .filter(
      record =>
        record.value ||
        (record.date.getMonth() == timespanToStartDate(time, timespan).getMonth() &&
          record.date.getDate() == timespanToStartDate(time, timespan).getDate()),
    );
  graphData.min = 0;
  graphData.max = 10;
  graphData.lineColor = 'blue';
  graphData.numberOfTicks = 10;
  return graphData;
};

const MoodDayGraphConfig = (time: Date): GraphInput => {
  let graphData = {} as GraphInput;
  graphData.lineData = getRecordsPeriod<Mood>('Mood', dayStart(time), dayEnd(time)).map(record => ({
    date: record.date,
    value: record.rating,
  }));
  let startEnd = getDayStartEnd(time);
  graphData.lineData = [{date: startEnd.start, value: undefined}, ...graphData.lineData, {date: startEnd.end, value: undefined}].sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );
  graphData.min = 0;
  graphData.max = 10;
  graphData.lineColor = 'blue';
  graphData.numberOfTicks = 10;
  return graphData;
};

const WeightGraphConfig = (time: Date, timespan: Timespan): GraphInput => {
  let graphData = {} as GraphInput;
  graphData.lineData = getDaysSummary(timespanToStartDate(time, timespan), dayEnd(time))
    .filter(
      record =>
        record.weight ||
        (record.day.getMonth() == timespanToStartDate(time, timespan).getMonth() &&
          record.day.getDate() == timespanToStartDate(time, timespan).getDate()),
    )
    .map(record => ({
      date: record.day,
      value: record.weight,
    })) as LineData;
  graphData.min = (Math.min(...graphData.lineData.map(point => point.value || 0)) || 65) - 3;
  graphData.max = (Math.max(...graphData.lineData.map(point => point.value || 0)) || 85) + 3;
  graphData.lineColor = 'red';
  graphData.numberOfTicks = 10;
  console.log(graphData.lineData);

  return graphData;
};

type GraphWrapperProps = {oneKey: RecordString; twoKey: RecordString; time: Date; timespan: Timespan};

export const GraphWrapper = ({oneKey, twoKey, time, timespan}: GraphWrapperProps) => {
  const keyToInput = (key: RecordString): GraphInput => {
    switch (key) {
      case 'Mood':
        return timespan === 'day' ? MoodDayGraphConfig(time) : MoodGraphConfig(time, timespan);
      case 'Calorie':
        return timespan === 'day' ? CalorieDayGraphConfig(time) : CalorieGraphConfig(time, timespan);
      case 'Weight':
        return WeightGraphConfig(time, timespan);
      case 'Activity':
        throw 'Wow very active graph';
    }
  };

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Graph
          one={oneKey ? keyToInput(oneKey) : keyToInput(oneKey)}
          two={twoKey ? keyToInput(twoKey) : keyToInput(twoKey)}
          timespan={timespan}
        />
      </View>
    </>
  );
};

const Graph = ({one, two, timespan}: {one: GraphInput; two: GraphInput; timespan: Timespan}) => {
  const isFocused = useIsFocused();

  const {height, width} = useWindowDimensions();

  const CustomGrid = ({x, y, data, ticks}) => (
    <G>
      {
        // Horizontal grid
        ticks.map(tick => (
          <Line key={tick} x1={'0%'} x2={'100%'} y1={y(tick)} y2={y(tick)} stroke={'rgba(0,0,0,0.2)'} />
        ))
      }
      {
        // Vertical grid
        data.map((value, index) => (
          <Line key={index} y1={'0%'} y2={'100%'} x1={x(value.date)} x2={x(value.date)} stroke={'rgba(0,0,0,0.2)'} />
        ))
      }
    </G>
  );

  const contentInset = {top: 20, bottom: 20};

  const Decorator = ({x, y, data, color}) => {
    return data.map((value, index) => <Circle key={index} cx={x(value.date)} cy={y(value.value)} r={3} stroke={color} fill={'white'} />);
  };

  return (
    <>
      <View key={'graphyTimeDanceNow'} />
      <View style={{height: width, flexDirection: 'row'}}>
        <YAxis
          style={{height: width}}
          formatLabel={value => value}
          contentInset={contentInset}
          svg={{fontSize: 12, fill: 'black'}}
          data={one.lineData}
          max={one.max}
          min={one.min}
          scale={scale.scaleLinear}
          // numberOfTicks={one.numberOfTicks}
          // numberOfTicks={10}
        />
        <View style={{width: '87%', height: width}}>
          {one.bar ? (
            <BarChart
              style={StyleSheet.absoluteFill}
              svg={{fill: 'none', fillOpacity: 0.5, stroke: one.lineColor}}
              data={one.lineData}
              xAccessor={({item}) => item.date}
              yAccessor={({item}) => item.value}
              yMax={one.max}
              yMin={one.min}
              contentInset={contentInset}
              curve={shape.curveBumpX}
              xScale={scale.scaleTime}
            />
          ) : (
            <LineChart
              style={{height: width}}
              svg={{fill: 'none', stroke: one.lineColor}}
              data={one.lineData}
              contentInset={contentInset}
              xAccessor={({item}) => item.date}
              yAccessor={({item}) => item.value}
              yMax={one.max}
              yMin={one.min}
              yScale={scale.scaleLinear}
              xScale={scale.scaleTime}
              curve={shape.curveBumpX}>
              <Decorator color={one.lineColor} />
              <CustomGrid belowChart={true} />
            </LineChart>
          )}
          {!two.bar && (
            <LineChart
              style={StyleSheet.absoluteFill}
              svg={{fill: 'none', stroke: two.lineColor}}
              data={two.lineData}
              xAccessor={({item}) => item.date}
              yAccessor={({item}) => item.value}
              yMax={two.max}
              yMin={two.min}
              contentInset={contentInset}
              curve={shape.curveBumpX}
              yScale={scale.scaleLinear}
              xScale={scale.scaleTime}>
              <Decorator color={two.lineColor} />
              <CustomGrid belowChart={true} />
            </LineChart>
          )}
          {two.bar && (
            <BarChart
              style={StyleSheet.absoluteFill}
              svg={{fill: 'none', stroke: two.lineColor}}
              data={two.lineData}
              xAccessor={({item}) => item.date}
              yAccessor={({item}) => item.value}
              yMax={two.max}
              yMin={two.min}
              contentInset={contentInset}
              curve={shape.curveBumpX}
              xScale={scale.scaleTime}
            />
          )}
          <XAxis
            style={{
              width: '100%',
              bottom: 10,
            }}
            data={one.lineData.concat(two.lineData)} // This needs to catch all visible data
            xAccessor={({item}) => item.date}
            scale={scale.scaleTime}
            contentInset={contentInset}
            svg={{fontSize: 12, fill: 'black'}}
            // xAccessor={({item}) => item.date}
            numberOfTicks={6}
            formatLabel={value => {
              if (timespan === 'day') {
                return dateFns.format(value, 'HH:mm');
              } else {
                return dateFns.format(value, 'MM:dd');
              }
            }}
          />
        </View>
        <YAxis
          style={{marginHorizontal: 3, height: width}}
          formatLabel={value => value}
          contentInset={contentInset}
          svg={{fontSize: 12, fill: 'black'}}
          data={two.lineData}
          max={two.max}
          min={two.min}
          numberOfTicks={two.numberOfTicks}
        />
      </View>
    </>
  );
};

export default Graph;

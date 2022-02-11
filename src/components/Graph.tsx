import React, {useEffect, useState} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {Button} from 'react-native-elements';
import {YAxis, XAxis, LineChart, Grid} from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import * as dateFns from 'date-fns';
import * as shape from 'd3-shape';
import {Circle, G, Line} from 'react-native-svg';
import {Calorie, Mood, RecordString, Weight} from '../database/realm';
import {getDaysSummary, getFirstDay} from '../database/fullData';
import {getRecordsPeriod, getGraphDataPeriod} from '../database/general';
import {useIsFocused} from '@react-navigation/core';
import {dayEnd, dayStart, Timespan, timespanToStartDate} from '../utils/timeUtils';

type lineColors = 'purple' | 'green' | 'blue' | 'red';

export type LineData = {date: Date; value: number}[];

export type GraphInput = {
  lineData: LineData;
  lineColor: lineColors;
  max: number;
  min: number;
  numberOfTicks: number;
};

const CalorieGraphConfig = (time: Date, timespan: Timespan): GraphInput => {
  let graphData = {} as GraphInput;
  graphData.lineData = getDaysSummary(timespanToStartDate(time, timespan), dayEnd(time)).map(record => ({
    date: record.day,
    value: record.calories,
  }));
  console.log(graphData.lineData);
  graphData.lineData.sort((a, b) => a.date.getTime() - b.date.getTime());
  graphData.min = 0;
  graphData.max = Math.max(...graphData.lineData.map(point => point.value), 1400) + 100;
  graphData.lineColor = 'green';
  graphData.numberOfTicks = 10;
  return graphData;
};

const MoodGraphConfig = (time: Date, timespan: Timespan): GraphInput => {
  let graphData = {} as GraphInput;
  if (timespan === 'day') {
    graphData.lineData = getRecordsPeriod<Mood>('Mood', dayStart(time), dayEnd(time))
      .map(record => ({
        date: record.date,
        value: record.rating,
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  } else {
    graphData.lineData = getDaysSummary(timespanToStartDate(time, timespan), dayEnd(time)).map(record => ({
      date: record.day,
      value: record.mood,
    }));
  }
  graphData.min = 0;
  graphData.max = 10;
  graphData.lineColor = 'blue';
  graphData.numberOfTicks = 10;
  return graphData;
};

const WeightGraphConfig = (time: Date, timespan: Timespan): GraphInput => {
  let graphData = {} as GraphInput;
  graphData.lineData = getDaysSummary(timespanToStartDate(time, timespan), dayEnd(time))
    .filter(record => record.weight)
    .map(record => ({
      date: record.day,
      value: record.weight,
    })) as LineData;
  graphData.min = (Math.min(...graphData.lineData.map(point => point.value)) || 65) - 3;
  graphData.max = (Math.max(...graphData.lineData.map(point => point.value)) || 85) + 3;
  graphData.lineColor = 'red';
  graphData.numberOfTicks = 10;
  return graphData;
};

type GraphWrapperProps = {oneKey: RecordString; twoKey: RecordString; time: Date; timespan: Timespan};

export const GraphWrapper = ({oneKey, twoKey, time, timespan}: GraphWrapperProps) => {
  const keyToInput = (key: RecordString): GraphInput => {
    switch (key) {
      case 'Mood':
        return MoodGraphConfig(time, timespan);
      case 'Calorie':
        return CalorieGraphConfig(time, timespan);
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
  console.log(one);
  console.log(two);
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
            xScale={scale.scaleTime}>
            <Decorator color={two.lineColor} />
            <CustomGrid belowChart={true} />
          </LineChart>
          <XAxis
            style={{
              width: '100%',
              bottom: 10,
            }}
            data={one.lineData}
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

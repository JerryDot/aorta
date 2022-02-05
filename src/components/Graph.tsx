import React, {useEffect, useState} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {YAxis, XAxis, LineChart, Grid} from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import * as dateFns from 'date-fns';
import * as shape from 'd3-shape';
import {Circle, G, Line} from 'react-native-svg';
import {Calorie, Mood, RecordString, Weight} from '../database/realm';
import {getFirstDay} from '../database/fullData';
import {getGeneralRecordsPeriod, getGraphDataPeriod} from '../database/general';
import {useIsFocused} from '@react-navigation/core';

type lineColors = ['purple', 'green', 'blue', 'red'];

export type LineData = {date: Date; value: number}[];

export type GraphInput = {
  lineData: LineData;
  lineColor: string;
  max: number;
  min: number;
  numberOfTicks: number;
};

const CalorieGraphConfig = (startDate: Date): GraphInput => {
  let graphData = {} as GraphInput;
  graphData.lineData = getGeneralRecordsPeriod<Calorie>('Calorie', startDate).map(record => ({
    date: record.date,
    value: record.amount,
  }));
  graphData.min = 0;
  graphData.max = Math.max(...graphData.lineData.map(point => point.value)) + 100;
  graphData.lineColor = 'green';
  graphData.numberOfTicks = 10;
  return graphData;
};

const MoodGraphConfig = (startDate: Date): GraphInput => {
  let graphData = {} as GraphInput;
  graphData.lineData = getGeneralRecordsPeriod<Mood>('Mood', startDate)
    .map(record => ({
      date: record.date,
      value: record.rating,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  graphData.min = 0;
  graphData.max = 10;
  graphData.lineColor = 'blue';
  graphData.numberOfTicks = 10;
  return graphData;
};

const WeightGraphConfig = (startDate: Date): GraphInput => {
  let graphData = {} as GraphInput;
  graphData.lineData = getGeneralRecordsPeriod<Weight>('Weight', startDate).map(record => ({
    date: record.date,
    value: record.amount,
  }));
  graphData.min = Math.min(...graphData.lineData.map(point => point.value)) - 3;
  graphData.max = Math.max(...graphData.lineData.map(point => point.value)) + 3;
  graphData.lineColor = 'red';
  graphData.numberOfTicks = 10;
  return graphData;
};

export type Timespan = 'day' | 'week' | 'month' | 'all';

type GraphWrapperProps = {oneKey: RecordString; twoKey: RecordString; timespan: Timespan};

const timespanToStartDate = (timespan: Timespan): Date => {
  let startDay = new Date();
  if (timespan == 'day') {
    startDay.setDate(startDay.getDate() - 1);
  } else if (timespan == 'month') {
    startDay.setDate(startDay.getDate() - 30);
  } else if (timespan == 'week') {
    startDay.setDate(startDay.getDate() - 7);
  } else {
    startDay = getFirstDay();
  }
  return startDay;
};

export const GraphWrapper = ({oneKey, twoKey, timespan}: GraphWrapperProps) => {
  // Note this uses a database call sometimes so might slow down graph load
  const [startDate, setStartDate] = useState<Date>(timespanToStartDate(timespan));
  console.log(startDate);
  const keyToInput = (key: RecordString): GraphInput => {
    switch (key) {
      case 'Mood':
        return MoodGraphConfig(startDate);
      case 'Calorie':
        return CalorieGraphConfig(startDate);
      case 'Weight':
        return WeightGraphConfig(startDate);
      case 'Activity':
        throw 'Wow very active graph';
    }
  };

  return <Graph one={keyToInput(oneKey)} two={keyToInput(twoKey)} />;
};

const Graph = ({one, two}: {one: GraphInput; two: GraphInput}) => {
  console.log(one);
  const [key, setKey] = useState(1);
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
        data.map((_, index) => (
          <Line key={index} y1={'0%'} y2={'100%'} x1={x(index)} x2={x(index)} stroke={'rgba(0,0,0,0.2)'} />
        ))
      }
    </G>
  );

  const contentInset = {top: 20, bottom: 20};

  const Decorator = ({x, y, data}) => {
    return data.map((value, index) => <Circle key={index} cx={x(index)} cy={y(value.value)} r={3} stroke={one.lineColor} fill={'white'} />);
  };

  return (
    <>
      <View key={key} />
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
            <Decorator />
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
            xScale={scale.scaleTime}
          />
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
            formatLabel={value => dateFns.format(value, 'MM:dd')}
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

import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {YAxis, XAxis, LineChart, Grid} from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import * as dateFns from 'date-fns';
import * as shape from 'd3-shape';
import {Circle, G, Line} from 'react-native-svg';
import {RecordString} from '../database/realm';

type lineColors = ['purple', 'green', 'blue', 'red'];

export type GraphInput = {
  lineData: {date: Date; value: number}[];
  lineColor: string;
  max: number;
  min: number;
  numberOfTicks: number;
};

export type Timespan = 'day' | 'week' | 'month' | 'all';

type GraphWrapperProps = {one: RecordString; two: RecordString; timespan: Timespan};

const GraphWrapper = ({oneKey, twoKey, timespan}: GraphWrapperProps) => {};

const Graph = ({one, two, day}: {one: GraphInput; two: GraphInput; day: boolean}) => {
  const {height, width} = useWindowDimensions();
  const firstLineData = [2, 34, 5, 22, 6, 6];
  const thirdLineData = [
    {
      value: 150,
      date: new Date(2018, 1, 1),
    },
    {
      value: 10,
      date: new Date(2018, 1, 4),
    },
    {
      value: 100,
      date: new Date(2018, 1, 9),
    },
    {
      value: 20,
      date: new Date(2018, 1, 11),
    },
    {
      value: 150,
      date: new Date(2018, 1, 18),
    },
    {
      value: 10,
      date: new Date(2018, 1, 21),
    },
    {
      value: 100,
      date: new Date(2018, 1, 25),
    },
    {
      value: 20,
      date: new Date(2018, 1, 29),
    },
  ];
  const secondLineData = [1, 2, 3, 3, 5, 6];

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
  const fullData = [
    {
      data: firstLineData,
      svg: {stroke: 'purple', strokeWidth: 2},
    },
    {
      data: secondLineData,
      svg: {stroke: 'green', strokeWidth: 2},
    },
  ];

  const contentInset = {top: 20, bottom: 20};
  //@ts-ignore
  const Decorator = ({x, y, data}) => {
    //@ts-ignore
    return data.map((value, index) => <Circle key={index} cx={x(index)} cy={y(value)} r={3} stroke={'rgb(134, 65, 244)'} fill={'white'} />);
  };
  return (
    <>
      <View style={{height: width, flexDirection: 'row'}}>
        <YAxis
          style={{height: width}}
          formatLabel={value => value}
          contentInset={contentInset}
          svg={{fontSize: 12, fill: 'black'}}
          data={secondLineData}
          max={10}
          min={0}
          // numberOfTicks={10}
        />
        <View style={{width: '87%', height: width}}>
          <LineChart
            style={{height: width}}
            svg={{fill: 'none', stroke: 'rgb(134, 65, 244)'}}
            data={firstLineData}
            contentInset={contentInset}
            curve={shape.curveBumpX}>
            <Decorator />
            <CustomGrid belowChart={true} />
          </LineChart>
          <LineChart
            style={StyleSheet.absoluteFill}
            svg={{fill: 'none', stroke: 'rgb(134, 65, 244)'}}
            data={thirdLineData}
            xAccessor={({item}) => item.date}
            yAccessor={({item}) => item.value}
            contentInset={contentInset}
            xScale={scale.scaleTime}>
            <Grid direction={Grid.Direction.VERTICAL} />
          </LineChart>
          <XAxis
            style={{
              width: '100%',
              bottom: 10,
            }}
            data={thirdLineData}
            xAccessor={({item}) => item.date}
            scale={scale.scaleTime}
            contentInset={contentInset}
            svg={{fontSize: 12, fill: 'black'}}
            // xAccessor={({item}) => item.date}
            numberOfTicks={6}
            formatLabel={value => dateFns.format(value, 'MM:dd')}
            // formatLabel={day ? value => dateFns.format(value, 'HH') : value => dateFns.format(value, 'HH')}
          />
        </View>
        {/* <LineChart style={{height: width, position: 'absolute'}} data={secondLineData} contentInset={contentInset}>
            <Grid />
          </LineChart> */}
        <YAxis
          style={{marginHorizontal: 3, height: width}}
          formatLabel={value => value}
          contentInset={contentInset}
          svg={{fontSize: 12, fill: 'black'}}
          data={firstLineData}
          max={2400}
          min={0}
          numberOfTicks={10}
        />
      </View>
    </>
  );
};

export default Graph;

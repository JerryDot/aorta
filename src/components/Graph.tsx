import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {Grid} from 'react-native-easy-grid';
import {YAxis, XAxis, LineChart} from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import * as dateFns from 'date-fns';
import * as shape from 'd3-shape';
import {Circle} from 'react-native-svg';

type lineColors = ['purple', 'green', 'blue', 'red'];

export type GraphInput = {
  lineData: {date: Date; value: number}[];
  lineColor: string;
  max: number;
  min: number;
  numberOfTicks: number;
};

const Graph = ({one, two, day}: {one: GraphInput; two: GraphInput; day: boolean}) => {
  const {height, width} = useWindowDimensions();
  const firstLineData = [2, 34, 5, 22, 6, 6];
  // const firstLineData = [
  //   {
  //     value: 150,
  //     date: dateFns.setHours(new Date(2018, 0, 0), 15),
  //   },
  //   {
  //     value: 10,
  //     date: dateFns.setHours(new Date(2018, 0, 0), 18),
  //   },
  //   {
  //     value: 100,
  //     date: dateFns.setHours(new Date(2018, 0, 0), 21),
  //   },
  //   {
  //     value: 20,
  //     date: dateFns.setHours(new Date(2018, 0, 0), 24),
  //   },
  // ];
  const secondLineData = [1, 2, 3, 3, 5, 6];
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
    return data.map((value, index) => <Circle key={index} cx={x(index)} cy={y(value)} r={4} stroke={'rgb(134, 65, 244)'} fill={'white'} />);
  };
  return (
    <>
      <View style={{height: width, flexDirection: 'row'}}>
        <YAxis
          style={{marginHorizontal: 3, height: width}}
          formatLabel={value => value}
          contentInset={contentInset}
          svg={{fontSize: 12, fill: 'black'}}
          data={secondLineData}
          max={10}
          min={0}
          // numberOfTicks={10}
        />
        <View style={{marginLeft: 10, width: '85%', height: width}}>
          <LineChart
            style={{height: width}}
            svg={{fill: 'none', stroke: 'rgb(134, 65, 244)'}}
            data={firstLineData}
            contentInset={contentInset}
            curve={shape.curveBumpX}>
            <Decorator />
            <Grid />
          </LineChart>
          <LineChart
            style={StyleSheet.absoluteFill}
            svg={{fill: 'none', stroke: 'rgb(134, 65, 244)'}}
            data={secondLineData}
            contentInset={contentInset}
            xScale={scale.scaleTime}>
            <Grid />
          </LineChart>
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
          numberOfTicks={10}
        />
      </View>
      <XAxis
        style={{marginHorizontal: -10, height: width}}
        data={secondLineData}
        scale={scale.scaleTime}
        svg={{fontSize: 12, fill: 'black'}}
        // xAccessor={({item}) => item.date}
        formatLabel={index => index}
        // formatLabel={day ? value => dateFns.format(value, 'HH') : value => dateFns.format(value, 'HH')}
      />
    </>
  );
};

export default Graph;

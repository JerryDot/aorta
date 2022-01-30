import {ViewStyle} from 'react-native';
import {activityColors} from '../screens/ActivityScreen';

import {AbstractChartProps} from './abstractChart';
import ContributionGraph, {ContributionChartValue, TooltipDataAttrs} from './contributionGraph';

export interface ContributionGraphProps extends AbstractChartProps {
  values: Array<any>;
  endDate: Date;
  numDays: number;
  width: number;
  height: number;
  activityColorMap: activityColors;
  borderSize?: number;
  gutterSize?: number;
  squareSize?: number;
  horizontal?: boolean;
  showMonthLabels?: boolean;
  showOutOfRangeDays?: boolean;
  accessor?: string;
  getMonthLabel?: (monthIndex: number) => string;
  onDayPress?: ({count: number, date: Date}) => void;
  classForValue?: (value: string) => string;
  style?: Partial<ViewStyle>;
  titleForValue?: (value: ContributionChartValue) => string;
  tooltipDataAttrs: TooltipDataAttrs;
}

export type ContributionGraphState = {
  maxValue: number;
  minValue: number;
  valueCache: object;
};

export default ContributionGraph;

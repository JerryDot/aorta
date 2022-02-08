import {createContext, useContext, useState} from 'react';

interface DebugTimeContextValue {
  debugTime: Date | null;
  setDebugTime: () => Date | null;
}

const DebugTimeContext = createContext<DebugTimeContextValue>({
  debugTime: null,
  setDebugTime: () => null,
});

export const useDebugTimeContext = (): DebugTimeContextValue => {
  const context = useContext(DebugTimeContext);
  return context;
};

export const DebugTimeProvider = ({children}: {children: JSX.Element}): JSX.Element => {
  const debugTimeValue = useState<Date | null>(null);

  return <DebugTimeContext.Provider value={debugTimeValue, }>{children}</DebugTimeContext.Provider>;
};

export default TimeContext;

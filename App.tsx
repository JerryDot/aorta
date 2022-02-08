/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-get-random-values';
import React, {createContext, useContext, useMemo, useState} from 'react';
import {useColorScheme} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './src/screens/HomeScreen';
import DietScreen from './src/screens/DietScreen';
import MoodScreen from './src/screens/MoodScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import DataScreen from './src/screens/DataScreen';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined;
  Profile: {userId: string};
  Diet: undefined;
  Mood: undefined;
  Activity: undefined;
  Data: undefined;
};

export interface DebugTimeContextProps {
  debugTime: Date;
  setDebugTime: React.Dispatch<React.SetStateAction<Date>>;
}

export const DebugTimeContext = React.createContext<DebugTimeContextProps>({
  debugTime: new Date(),
  setDebugTime: () => {},
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [debugTime, setDebugTime] = useState<Date>(new Date());
  const value = {debugTime, setDebugTime};

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <DebugTimeContext.Provider value={value}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Diet" component={DietScreen} />
            <Stack.Screen name="Mood" component={MoodScreen} />
            <Stack.Screen name="Activity" component={ActivityScreen} />
            <Stack.Screen name="Data" component={DataScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </DebugTimeContext.Provider>
      {/* </TimeContext.Provider> */}
      {/* <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={sectionStyles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView> */}
    </>
  );
};

export default App;

import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{
    title: string;
  }> = ({children, title}) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
      <View style={sectionStyles.sectionContainer}>
        <Text
          style={[
            sectionStyles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            sectionStyles .sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {children}
        </Text>
      </View>
    );
  };

export const sectionStyles = StyleSheet.create({
  sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
  },
  sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
  },
  sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
  },
  highlight: {
      fontWeight: '700',
  },
});
export default Section
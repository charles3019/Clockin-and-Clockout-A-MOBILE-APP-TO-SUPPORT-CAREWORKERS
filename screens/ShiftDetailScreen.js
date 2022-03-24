import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ShiftClockScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The ClockShift Screen!</Text>
      <Button title="Go to Details" onPress={() => {
          props.navigation.navigate({
              routeName: 'ClockShift'
          });
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ShiftClockScreen;
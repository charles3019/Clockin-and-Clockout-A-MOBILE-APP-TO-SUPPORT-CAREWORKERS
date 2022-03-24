import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AvailableShiftScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Available Shift Screen!</Text>
      <Button title="Go to ShiftDetails!" onPress={() => {
          props.navigation.navigate({routeName: 'ShiftDetails'});
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

export default AvailableShiftScreen;
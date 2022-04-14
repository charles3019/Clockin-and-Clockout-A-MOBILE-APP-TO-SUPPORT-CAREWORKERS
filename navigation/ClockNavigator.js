import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import AvailableShiftScreen from '../screens/AvailableShiftScreen';
import ShiftDetailScreen from '../screens/ShiftDetailScreen';
import ShiftClockScreen from '../screens/ShiftClockScreen';
const ClockNavigator = createStackNavigator(
    {
        Shifts: {
        screen: AvailableShiftScreen
      },
      ShiftDetails: {
        screen: ShiftDetailScreen
      },
      ClockShift: ShiftClockScreen
    }
  );

export default createAppContainer(ClockNavigator);
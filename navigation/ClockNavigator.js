import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import AvailableShiftScreen from '../screens/AvailableShiftScreen';
import ShiftDetailScreen from '../screens/ShiftDetailScreen';
import ShiftClockScreen from '../screens/ShiftClockScreen';
// import { Platform } from 'react-native';
// import { Platform } from 'react-native-web';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {createBottomTabNavigator}
// import { Platform } from 'react-native';
// import {
//   createBottomTabNavigator,
// } from 'react-navigation';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
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
    // {
    //   // initialRouteName: 'Categories',
    //   defaultNavigationOptions: {
    //     headerStyle: {
    //       backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    //     },
    //     headerTintColor:
    //       Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    //     headerTitle: 'A Screen'
    //   }
    // }
  );


// const defaultStackNavOptions = {
//     headerStyle: {
//         // backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
//         backgroundColor: Colors.primaryColor
//     },
//     // headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    
//     headerTitle: 'A Screen'
// };

// const MealsNavigator = createStackNavigator(
//     {
//         Shifts: {
//             screen: AvailableShiftScreen
//         },
//         ShiftDetails: {
//             screen: ShiftDetailScreen
//         },
//         ClockShift: ShiftClockScreen
//     },
//     {
//         // initialRouteName: 'Shifts',
//         defaultNavigationOptions: defaultStackNavOptions
//     }
// );

// const FavNavigator = createStackNavigator(
//     {
//         UpcomingShift: UpcomingShiftScreen,
//         ClockShift: ShiftClockScreen
//     },
//     {
//         // initialRouteName: 'Shifts',
//         defaultNavigationOptions: defaultStackNavOptions
//     }
// );

// const tabScreenConfig = {
//     Meals: {
//         screen: MealsNavigator,
//         navigationOptions: {
//             tabBarIcon: tabInfo => {
//                 return (
//                     <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
//                 );
//             },
//             tabBarColor: Colors.primaryColor
//         }
//     },
//     UpcomingShift: {
//         screen: FavNavigator,
//         navigationOptions: {
//             tabBarIcon: tabInfo => {
//                 return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
//             },
//             tabBarColor: Colors.accentColor
//         }
//     }
// };

// const ClockNavigator = createBottomTabNavigator(tabScreenConfig);
    // Platform.OS === 'android'
    //     ? createMaterialBottomTabNavigator(tabScreenConfig, {
    //         activeTintColor: 'white',
    //         shifting: true,
    //         barStyle: {
    //             backgroundColor: Colors.primaryColor
    //         }
    //     })
    //     : createBottomTabNavigator(tabScreenConfig, {
    //         tabBarOptions: {
    //             activeTintColor: Colors.accentColor
    //         }
    //     });

export default createAppContainer(ClockNavigator);
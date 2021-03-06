import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList
} from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import ShiftsOverviewScreen, {screenOptions as productsOverviewScreenOptions} from '../screens/shift/ShiftsOverviewScreen';
import ShiftDetailScreen, {
  screenOptions as productDetailScreenOptions
} from '../screens/shift/ShiftDetailScreen';
import CartScreen, {
  screenOptions as cartScreenOptions
} from '../screens/shift/CartScreen';
import JobScreen, {
  screenOptions as jobScreenOptions
} from '../screens/shift/JobScreen';
import UserShiftsScreen, {
  screenOptions as userShiftsScreenOptions
} from '../screens/user/UserShiftsScreen';
import EditShiftScreen, {
  screenOptions as editShiftScreenOptions
} from '../screens/user/EditShiftScreen';
import AuthScreen, {
  screenOptions as authScreenOptions
} from '../screens/user/AuthScreen';
import MapScreen, {
  screenOptions as mapScreenOptions
} from '../screens/shift/MapScreen';
import ClockInOutScreen, { screenOptions as clockInOutOption} from '../screens/shift/ClockInOutScreen';
// import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ShiftsStackNavigator = createStackNavigator();

export const ShiftsNavigator = () => {
  return (
    <ShiftsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ShiftsStackNavigator.Screen
        name="ShiftsOverview"
        component={ShiftsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ShiftsStackNavigator.Screen
        name="ShiftDetail"
        component={ShiftDetailScreen}
        options={productDetailScreenOptions}
      />
      <ShiftsStackNavigator.Screen
        name="Map"
        component={MapScreen}
        options={mapScreenOptions}
      />
      <ShiftsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ShiftsStackNavigator.Navigator>
  );
};


const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="jobScreen"
        component={JobScreen}
        options={jobScreenOptions}
      />
      <OrdersStackNavigator.Screen
        name="ClockInOut"
        component={ClockInOutScreen}
        options={clockInOutOption}
      />
      <OrdersStackNavigator.Screen
        name="Map"
        component={MapScreen}
        options={mapScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserShifts"
        component={UserShiftsScreen}
        options={userShiftsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditShift"
        component={EditShiftScreen}
        options={editShiftScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="Map"
        component={MapScreen}
        options={mapScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};


const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {
                  dispatch(authActions.logout());
                  // props.navigation.navigate('Auth');
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      screenOptions={{
        headerShown: false,
        activeTintColor: Colors.primary
      }}
      
    >
      <ShopDrawerNavigator.Screen
        name="Shifts"
        component={ShiftsNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-briefcase-outline' : 'ios-briefcase-outline'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Jobs"
        component={OrdersNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};


const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};


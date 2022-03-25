import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
import { AVAILABLESHIFTS, SHIFTS } from '../data/dummy-data';
import ShiftList from '../components/ShiftList';
const ShiftClockScreen = props => {
 
    const catId = props.navigation.getParam('categoryId');

    const displayedShifts = SHIFTS.filter(
      meal => meal.categoryIds.indexOf(catId) >= 0
    );
  
    return <ShiftList listData={displayedShifts} navigation={props.navigation} />;
  };
  
  ShiftDetailScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');
  
    const selectedCategory = AVAILABLESHIFTS.find(cat => cat.id === catId);
  
    return {
      headerTitle: selectedCategory.title
    };
  };

export default ShiftClockScreen;
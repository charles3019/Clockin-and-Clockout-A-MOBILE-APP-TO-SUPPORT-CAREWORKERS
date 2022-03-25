import React from 'react';

import ShiftList from '../components/ShiftList';
import { SHIFTS } from '../data/dummy-data';

const FavoritesScreen = props => {
  const comShift = SHIFTS.filter(shift => shift.id === 'm1' || shift.id === 'm2');
  return <ShiftList listData={comShift} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = {
  headerTitle: 'Your Favorites'
};

export default FavoritesScreen;
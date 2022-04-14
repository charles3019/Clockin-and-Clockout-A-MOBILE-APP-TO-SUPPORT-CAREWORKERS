import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ShiftItem from '../../components/shift/ShiftItem';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';
import ShiftStatuses from '../../constants/ShiftStatuses';



const JobScreen = props => {
  const userBookShift = useSelector(state => state.products.userBookShift);
  const dispatch = useDispatch();

  const editShiftHandler = (id, title) => {
    props.navigation.navigate('ClockInOut', { productId: id, productTitle: title });
  };

  // const deleteHandler = id => {
  //   Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
  //     { text: 'No', style: 'default' },
  //     {
  //       text: 'Yes',
  //       style: 'destructive',
  //       onPress: () => {
  //         dispatch(productsActions.deleteShift(id));
  //       }
  //     }
  //   ]);
  // };

  if (userBookShift.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No Shifts found, maybe start booking some?</Text>
      </View>
    );
  }

  return (
    
    <FlatList
      data={userBookShift}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ShiftItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}

          onSelect={() => {
            editShiftHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="Details"
            onPress={() => {
              editShiftHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="Cancel"
            onPress={() => {dispatch(productsActions.cancelShift(itemData.item.id, ShiftStatuses.open));}}
          />
        </ShiftItem>
      )}
    />
  );
};


export const screenOptions = navData => {
  return {
    headerTitle: 'Your Jobs',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};


const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default JobScreen;

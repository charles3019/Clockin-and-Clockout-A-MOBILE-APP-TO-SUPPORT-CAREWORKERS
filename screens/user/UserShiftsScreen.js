import React from 'react';
import { View, Text, FlatList, Button, Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ShiftItem from '../../components/shift/ShiftItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const UserShiftsScreen = props => {
  const userShifts = useSelector(state => state.products.userShifts);
  const dispatch = useDispatch();

  const editShiftHandler = id => {
    props.navigation.navigate('EditShift', { productId: id });
  };

  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteShift(id));
        }
      }
    ]);
  };

  if (userShifts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No Shifts found, maybe start creating some?</Text>
      </View>
    );
  }
  // console.log("User Shifts Screen", userShifts);

  return (
    
    <FlatList
      data={userShifts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ShiftItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}

          onSelect={() => {
            editShiftHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editShiftHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ShiftItem>
      )}
    />
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Your Shifts',
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
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditShift');
          }}
        />
      </HeaderButtons>
    )
  };
};

export default UserShiftsScreen;

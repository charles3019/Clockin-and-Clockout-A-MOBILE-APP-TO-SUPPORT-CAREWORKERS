// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   FlatList,
//   Text,
//   Platform,
//   ActivityIndicator,
//   StyleSheet
// } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// import HeaderButton from '../../components/UI/HeaderButton';
// import OrderItem from '../../components/shift/OrderItem';
// import * as ordersActions from '../../store/actions/orders';
// import Colors from '../../constants/Colors';

// const JobScreen = props => {
//   const [isLoading, setIsLoading] = useState(false);

//   const orders = useSelector(state => state.orders.orders);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     setIsLoading(true);
//     dispatch(ordersActions.fetchOrders()).then(() => {
//       setIsLoading(false);
//     });
//   }, [dispatch]);

//   if (isLoading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color={Colors.primary} />
//       </View>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>No Shift found, maybe start adding some Shifts?</Text>
//       </View>
//     );
//   }


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
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';
import ShiftStatuses from '../../constants/ShiftStatuses';



const JobScreen = props => {
  const userBookShift = useSelector(state => state.products.userBookShift);
  const dispatch = useDispatch();

  const editShiftHandler = (id, title) => {
    props.navigation.navigate('ClockInOut', { productId: id, productTitle: title });
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

  if (userBookShift.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No Shifts found, maybe start booking some?</Text>
      </View>
    );
  }
  // console.log("Job Screen", userBookShift);

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
            // onPress={deleteHandler.bind(this, itemData.item.id)}
            onPress={() => {dispatch(productsActions.cancelShift(itemData.item.id, ShiftStatuses.open));}}
          />
        </ShiftItem>
      )}
    />
  );
};



  // return (
    // <FlatList
    //   data={orders}
    //   keyExtractor={item => item.id}
    //   renderItem={itemData => (
    //     <OrderItem
    //       amount={itemData.item.totalAmount}
    //       date={itemData.item.readableDate}
    //       items={itemData.item.items}
    //     />
    //   )}
    // />
  // );
// };

export const screenOptions = navData => {
  return {
    headerTitle: 'Your Jobs',
    // headerShown: true,
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

// const styles = StyleSheet.create({
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// });

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default JobScreen;

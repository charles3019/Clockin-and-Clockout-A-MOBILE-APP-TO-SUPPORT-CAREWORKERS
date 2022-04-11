import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import ShiftStatuses from '../../constants/ShiftStatuses';

const ShiftDetailScreen = props => {
  const productId = props.route.params.productId;
  const selectedShift = useSelector(state =>
    state.products.availableShifts.find(prod => prod.id === productId)
  );
  const dispatch = useDispatch();
  // console.log("Details Screen", selectedShift);
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedShift.imageUrl }} />
      <View style={styles.actions}>
        {/* <Button
          color={Colors.primary}
          title="Book Shift"
          onPress={() => {
            // dispatch(cartActions.addToCart(selectedShift));
              // dispatch(cartActions.addToCart(itemData.item));
              dispatch(productsActions.bookShift(selectedShift.id, ShiftStatuses.booked));
              // navigator
              props.navigation.navigate('ShiftsOverview')
            }
        }
        /> */}
      </View>
      {/* .toFixed(2) */}
      <Text style={styles.price}>${selectedShift.price}</Text>
      <Text style={styles.description}>{selectedShift.description}</Text>
      {/* <Text style={styles.description}>{selectedShift}</Text> */}
    </ScrollView>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: navData.route.params.productTitle
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default ShiftDetailScreen;

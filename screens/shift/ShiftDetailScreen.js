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
  const pickOnMapHandler = async ()  => {
    
    let userLocation;
    let shiftLocation = selectedShift.shiftLocation;
    props.navigation.navigate('Map',{ initialLocation: shiftLocation, productId: productId, readonly: true });
    
    // if (!shiftLocation) {
    //   props.navigation.navigate('Map',{ saveLocation: userLocation, readonly: false });
    // }
    // else if (selectedShift) {
    //   // console.log(prodId);
    // }
    // else{
    //   props.navigation.navigate('Map',{ initialLocation: shiftLocation, readonly: false });

    // }
    // const res = await getReadableLocation();
  };
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
      <Text style={styles.price}>£{selectedShift.price}</Text>
      <Text style={styles.description}>{selectedShift.description}</Text>
      <Text style={styles.description}> {"Shift Date: "}{selectedShift.shiftDate} </Text>
      <Text style={styles.description}> {"Shift Time: "}{selectedShift.shiftTime} </Text>
      <View style={styles.container}>
            
          <View style={{marginVertical: 10, marginHorizontal: 15, alignItems: "center"}}>
              {(selectedShift && (<Text>{selectedShift.shiftLocation.address}</Text>)) }
              {selectedShift ? null : (<View>{}</View>)}
              {/* {<Text>{selectedShift.shiftLocation.address}</Text>} */}
            </View>
            <Button
            title= "View Location"
            color={Colors.primary}
            onPress={pickOnMapHandler}
            />
          </View>
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
    marginHorizontal: 20,
    marginVertical: 5
  }
});

export default ShiftDetailScreen;

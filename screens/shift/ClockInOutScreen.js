import React , { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import ShiftStatuses from '../../constants/ShiftStatuses';

const ClockInOutScreen = props => {
  const [timeStart, setTimeStart] = useState() ;
  let timeOut;
  const [inButton, setInButton] = useState(true);
  const [outButton, setOutButton] = useState(false);
  const [breakButton, setBreakButton] = useState(false);
  const [homeButton, setHomeButton] = useState(true);
  useEffect(() => {
    setInButton(true);
    setOutButton(false);
    setBreakButton(false);
    setHomeButton(true);
  }, []);

  const inButtonPressed = () =>{
    let startingTime = new Date;
    setTimeStart(startingTime);
    setInButton(false);
    setOutButton(true);
    setBreakButton(true);
    setHomeButton(false);
  }

  const breakButtonPressed = (id) =>{
    timeOut = new Date;
    setInButton(true);
    setOutButton(false);
    setBreakButton(false);
    setHomeButton(false);

    dispatch(productsActions.closeShift(id, timeStart, timeOut, ShiftStatuses.booked));
  }

  const outButtonPressed = (id) =>{
    timeOut = new Date;
    setInButton(false);
    setOutButton(false);
    setBreakButton(false);
    setHomeButton(true);
    dispatch(productsActions.closeShift(id, timeStart, timeOut, ShiftStatuses.complete));
  }

  const productId = props.route.params.productId;
  const selectedShift = useSelector(state =>
    state.products.userBookShift.find(prod => prod.id === productId)
  );
  const dispatch = useDispatch();
  // console.log("Details Screen", selectedShift);
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedShift.imageUrl }} />
      
      {/* .toFixed(2) */}
      <Text style={styles.price}>${selectedShift.price}</Text>
      <Text style={styles.description}>{selectedShift.description}</Text>
      {/* <Text style={styles.description}>{selectedShift}</Text> */}

      <View style={styles.threeButtons}>
        <View style = {styles.buttonWithIn}>
        <Button
          color={Colors.primary}
          title="In"
          disabled={inButton === false || selectedShift.shiftStatus === ShiftStatuses.complete}
          onPress={inButtonPressed}
        />
        </View>

        
        <Button
          color={Colors.primary}
          title="Take Break"
          disabled={breakButton === false}
          onPress={() => {breakButtonPressed(productId)}}
        />
        
        <View style = {styles.buttonWithIn}>
        <Button
          color={Colors.primary}
          title="Out"
          disabled={outButton === false}
          onPress={ () => {outButtonPressed(productId)}}
        />
        </View>
      </View>
      <View style={styles.actions}>
      <Button
          color={Colors.primary}
          title="Back"
          disabled={homeButton === false}
          onPress={() => { props.navigation.navigate('jobScreen')}}
        />

      </View>
      
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
    width: '100%',
    alignItems: 'center'
  },
  threeButtons: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
    width: '90%',
    justifyContent: "space-between"
  },
  buttonWithIn: {
    width: '25%'
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

export default ClockInOutScreen;
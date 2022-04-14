import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import LocationPicker from '../../components/shift/LocationPicker';
import * as Location from 'expo-location';
// import ReadableLocation from '../../components/shift/ReadableLocation';
import ENV from '../../env';
// import ShiftStatuses from '../../constants/ShiftStatuses';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const EditShiftScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [humanAddress, setHumanAddress] = useState("Set Location of the Shift");
  const mapPickedLocation = props.route.params ? props.route.params.pickedLocation :null;

  const prodId = props.route.params ? props.route.params.productId : null;
  const editedShift = useSelector(state =>
    state.products.userShifts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedShift ? editedShift.title : '',
      imageUrl: editedShift ? editedShift.imageUrl : '',
      description: editedShift ? editedShift.description : '',
      
      // shiftStatus: editedShift ? editedShift.shiftStatus : ShiftStatuses.open,
      price: '',
      // shiftDate: editedShift ? editedShift.shiftDate : '',
      // shiftTime: editedShift ? editedShift.shiftTime : '',
      // shiftLocation: editedShift ? editedShift.shiftLocation : ''
    },
    inputValidities: {
      title: editedShift ? true : false,
      imageUrl: editedShift ? true : false,
      description: true,
      // shiftStatus: true,
      price: editedShift ? true : false,
      // shiftDate: true ,
      // shiftTime: true,
      // shiftLocation: editedShift ? true : false
    },
    formIsValid: editedShift ? true : false
  });

  
  /**
   * For Date Time Picker
   */
   const [shiftDate, setShiftDate] = useState();
   const [shiftTime, setShiftTime] = useState();
   const [date, setDate] = useState(new Date);
   const [mode, setMode] = useState('date');
   const [show, setShow] = useState(false);
   const [txt , setTxt] = useState("Set Date and Time");
   const [locationSelected, setLocationSelected] = useState(false);
   const [selectedLocation, setSelectedLocation] = useState("Select Address");
  //  editedShift ? setTxt(editedShift.shiftDate + "\t" + editedShift.shiftTime): setTxt("Enter Date and Time")
   const onChange = (event, selectedDate) => {
     const currentDate = selectedDate || date;
     setShow(Platform.OS === "ios");
     setDate(currentDate);
 
     let tempDate = new Date(currentDate);
     let fDate = tempDate.getDate() + ' ' + (tempDate.getMonth() +1) + ' '+ tempDate.getFullYear();
     let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
     setShiftDate(fDate);
     setShiftTime(fTime);
     setTxt(fDate + "\t\t\t\t" + fTime );
 
   }

   //Location Based functions
  //  const [shiftLocation, setShiftLocation] = useState();
   const verifyPermissions = async () => {
    const result = await Location.requestForegroundPermissionsAsync();
    // const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      // console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
      // props.onLocationPicked({
      //   lat: location.coords.latitude,
      //   lng: location.coords.longitude
      // });
    } catch (err) {
      // console.log(err);
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  //  const locationPickedHandler = useCallback(location => {
  //   setSelectedLocation(location);
  // }, []);


  //  const shiftLocation  = props.route.params ? props.route.params.mpickedLocation : null ;
   let  shiftLocation;
   if (props.route.params || editedShift) {
    if (editedShift) {
      shiftLocation = editedShift.shiftLocation;
    }
    else if (props.route.params) {
      shiftLocation = props.route.params.mpickedLocation;
    } else{
      shiftLocation = null;
      // console.log("Nulla");
    }
  }
  // useEffect(() => {
     
     
     
  //     setShiftLocation(lshiftLocation);
  //     console.log(shiftLocation);
  // }, [lshiftLocation, props.route.params]);

  //  if(!shiftLocation){
    //  console.log("hola");
  //  }
  //  console.log("sh: ", shiftLocation);
  // const getReadableLocation = async () => {
  //   console.log("out");
      
  // }
  

  
  const pickOnMapHandler = async ()  => {
    //If Actual USer Location is needed then use this code i.e Uncomment this
    //Make async this function
    let userLocation;
    // const hasPermission = await verifyPermissions();
    // if (!hasPermission) {
    //   return;
    // }

    // try {
    //   setIsFetching(true);
    //   const cLocation = await Location.getCurrentPositionAsync({
    //     timeout: 5000
    //   });
    //   userLocation = {
    //     lat: cLocation.coords.latitude,
    //     lng: cLocation.coords.longitude
    //   }
    // 
    // } catch (err) {
    //   console.log(err);
    //   Alert.alert(
    //     'Could not fetch location!',
    //     'Please try again later or pick a location on the map.',
    //     [{ text: 'Okay' }]
    //   );
    // }
    // setIsFetching(false);
    if (!shiftLocation) {
      props.navigation.navigate('Map',{ saveLocation: userLocation, readonly: false });
    }
    else if (editedShift) {
      // console.log(prodId);
      props.navigation.navigate('Map',{ initialLocation: shiftLocation, productId: prodId, readonly: false });
    }
    else{
      props.navigation.navigate('Map',{ initialLocation: shiftLocation, readonly: false });

    }
    // const res = await getReadableLocation();
  };

  

   const showMode = (currentMode) =>{
     setShow(true);
     setMode(currentMode);
   }
  useEffect(() => {
    // console.log("From Edit Shift Screen:",editedShift);
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' }
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedShift) {
        await dispatch(
          productsActions.updateShift(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            shiftDate,
            shiftTime,
            shiftLocation
            // formState.inputValues.shiftDate,
            // formState.inputValues.shiftTime,
            // formState.inputValues.shiftLocation,
            // formState.inputValues.shiftStatus
          )
        );
      } else {
        await dispatch(
          productsActions.createShift(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            shiftDate,
            shiftTime,
            shiftLocation,
            // formState.inputValues.shiftDate,
            // formState.inputValues.shiftTime,
            // formState.inputValues.shiftLocation,
            // formState.inputValues.shiftStatus,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={submitHandler}
          />
        </HeaderButtons>
      )
    });
  }, [submitHandler]);
  
  

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    editedShift ? setTxt(editedShift.shiftDate + "\t" + editedShift.shiftTime): setTxt("Enter Date AND Time")
    
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  // if (theLocation) {
  //   console.log(theLocation);
  // }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedShift ? editedShift.title : ''}
            initiallyValid={!!editedShift}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedShift ? editedShift.imageUrl : ''}
            initiallyValid={!!editedShift}
            required
          />
          {/* <Input
            id="shiftDate"
            label="Date of the Shift"
            errorText="Please enter a valid Date!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedShift ? editedShift.shiftDate : ''}
            initiallyValid={!!editedShift}
            required
            
          /> */}

          {/* <Input
            id="shiftTime"
            label="Time of the Shift"
            errorText="Please enter a valid Time!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedShift ? editedShift.shiftTime : ''}
            initiallyValid={!!editedShift}
            required
          /> */}

          {/* <Input
            id="shiftLocation"
            label="Location of the Shift"
            errorText="Please enter a valid Location!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedShift ? editedShift.shiftLocation : ''}
            initiallyValid={!!editedShift}
            required
          /> */}
         
          <View style={styles.container}>
            {/* <Button
            title="Get User Location"
            color={Colors.primary}
            onPress={getLocationHandler}
            /> */}
            <View>
              
            </View>
            <View style={{marginBottom: 15}}>
              {(editedShift && (<Text>{editedShift.shiftLocation.address}</Text>)) }
              {editedShift ? null : (<View>{}</View>)}
              {/* {<Text>{editedShift.shiftLocation.address}</Text>} */}
            </View>
            <Button
            title= {editedShift ? "Change Location" : "Pick on Location Map"}
            color={Colors.primary}
            onPress={pickOnMapHandler}
            />
          </View>
          
          
          <View style= {styles.container}>
            <Text >
              {/* { editedShift ? setTxt(editedShift.shiftDate + "\t" + editedShift.shiftTime): setTxt("Enter Date and Time") } */}
              {txt}
            </Text>
            <View style = {styles.buttonContainer}>
            <View style={styles.buttonWithIn}>
              <Button title='Pick Date' onPress= {()=> showMode('date')}/>
            </View>
            <View style={styles.buttonWithIn}>
              <Button title='Pick Time' onPress= {()=> showMode('time')}/>
            </View>
            </View>
            {show &&(
              <DateTimePicker
              testID = 'dateTimePicker'
              value={date}
              mode={mode}
              is24Hour = {false}
              display='default'
              onChange={onChange}
              />
            )}
          </View>
          {editedShift ? null : (
            <Input
              id="price"
              label="Pay per Hour"
              errorText="Please enter a valid pay!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedShift ? editedShift.description : ''}
            initiallyValid={!!editedShift}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = navData => {
  const routeParams = navData.route.params ? navData.route.params : {};
  const theLocation = navData.route.params ? navData.route.params.pickedLocation : {};
  return {
    headerTitle: routeParams.productId ? 'Edit Shift' : 'Add Shift'
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  centered: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    marginTop: 15,
    alignContent: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  buttonWithIn: {
    width: '30%',
    margin: 15
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    margin: 15
  }
});

export default EditShiftScreen;

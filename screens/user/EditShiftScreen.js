import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  View,
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
      shiftDate: editedShift ? editedShift.shiftDate : '',
      shiftTime: editedShift ? editedShift.shiftTime : '',
      shiftLocation: editedShift ? editedShift.shiftLocation : ''
    },
    inputValidities: {
      title: editedShift ? true : false,
      imageUrl: editedShift ? true : false,
      description: editedShift ? true : false,
      // shiftStatus: true,
      price: editedShift ? true : false,
      shiftDate: editedShift ? true : false,
      shiftTime: editedShift ? true : false,
      shiftLocation: editedShift ? true : false
    },
    formIsValid: editedShift ? true : false
  });

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
            formState.inputValues.shiftDate,
            formState.inputValues.shiftTime,
            formState.inputValues.shiftLocation,
            // formState.inputValues.shiftStatus
          )
        );
      } else {
        await dispatch(
          productsActions.createShift(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            formState.inputValues.shiftDate,
            formState.inputValues.shiftTime,
            formState.inputValues.shiftLocation,
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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

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
          <Input
            id="shiftDate"
            label="Date of the Shift"
            errorText="Please enter a valid Date!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedShift ? editedShift.shiftDate : ''}
            initiallyValid={!!editedShift}
            required
            
          />
          <Input
            id="shiftTime"
            label="Time of the Shift"
            errorText="Please enter a valid Time!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedShift ? editedShift.shiftTime : ''}
            initiallyValid={!!editedShift}
            required
          />
          <Input
            id="shiftLocation"
            label="Location of the Shift"
            errorText="Please enter a valid Location!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedShift ? editedShift.shiftLocation : ''}
            initiallyValid={!!editedShift}
            required
          />
          {/* <Input
            id="shiftStatus"
            label="Choose Shift Status"
            errorText="Please enter a valid shift status"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedShift ? editedShift.shiftStatus : ShiftStatuses.open}
            initiallyValid={!!editedShift}
            required
          /> */}
          {editedShift ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
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
  return {
    headerTitle: routeParams.productId ? 'Edit Shift' : 'Add Shift'
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EditShiftScreen;

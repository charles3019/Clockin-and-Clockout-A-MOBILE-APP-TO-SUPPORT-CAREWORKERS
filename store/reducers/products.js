import PRODUCTS from '../../data/dummy-data';
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS
} from '../actions/products';
import Shift from '../../models/product';

const initialState = {
  availableShifts: [],
  userShifts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      // console.log("dispatch ", action.userShifts);
      return {
        availableShifts: action.products,
        userShifts: action.userShifts
      };
    case CREATE_PRODUCT:
      
      // id, ownerId, title, imageUrl,  shiftDate, shiftTime, shiftLocation, shiftStatus, bookedBy, description, price
      const newShift = new Shift(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.shiftDate,
        action.productData.shiftTime,
        action.productData.shiftLocation,
        action.productData.shiftStatus,
        action.productData.bookedBy,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableShifts: state.availableShifts.concat(newShift),
        userShifts: state.userShifts.concat(newShift)
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userShifts.findIndex(
        prod => prod.id === action.pid
      );
      // console.log(state.userShifts[productIndex]);
      const updatedShift = new Shift(
        action.pid,
        state.userShifts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.shiftDate,
        action.productData.shiftTime,
        action.productData.shiftLocation,
        state.userShifts[productIndex].shiftStatus,
        state.userShifts[productIndex].bookedBy,
        action.productData.description,
        state.userShifts[productIndex].price
      );
      const updatedUserShifts = [...state.userShifts];
      updatedUserShifts[productIndex] = updatedShift;
      const availableShiftIndex = state.availableShifts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedAvailableShifts = [...state.availableShifts];
      updatedAvailableShifts[availableShiftIndex] = updatedShift;
      return {
        ...state,
        availableShifts: updatedAvailableShifts,
        userShifts: updatedUserShifts
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userShifts: state.userShifts.filter(
          product => product.id !== action.pid
        ),
        availableShifts: state.availableShifts.filter(
          product => product.id !== action.pid
        )
      };
  }
  return state;
};

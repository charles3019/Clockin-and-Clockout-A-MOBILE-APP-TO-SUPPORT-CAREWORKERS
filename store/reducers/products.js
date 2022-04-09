import PRODUCTS from '../../data/dummy-data';
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
  BOOK_SHIFT,
  CANCEL_SHIFT,
  CLOCK_OUT
} from '../actions/products';

import Shift from '../../models/product';

const initialState = {
  availableShifts: [],
  userShifts: [],
  userBookShift: [],
  shiftClocks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      // console.log("dispatch ", action.userShifts);
      return {
        availableShifts: action.products,
        userShifts: action.userShifts,
        userBookShift: action.userBookShift
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
        action.productData.timeStamps,
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
        state.userShifts[productIndex].timeStamps,
        state.userShifts[productIndex].price
      );
      const updatedUserShifts = [...state.userShifts];
      updatedUserShifts[productIndex] = updatedShift;
      const availableShiftIndex = state.availableShifts.findIndex(
        prod => prod.id === action.pid
      );
      const updatedAvailableShifts = [...state.availableShifts];
      updatedAvailableShifts[availableShiftIndex] = updatedShift;

      const userBookShiftIndex = state.userBookShift.findIndex(
        prod => prod.id === action.pid
      );
      const updatedUderBookShifts = [...state.userShifts];
      updatedUderBookShifts[userBookShiftIndex] = updatedShift;
      return {
        ...state,
        availableShifts: updatedAvailableShifts,
        userShifts: updatedUserShifts,
        userBookShift: updatedBookUserShifts
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

      case BOOK_SHIFT:
      const bookedIndex = state.availableShifts.findIndex(
        prod => prod.id === action.pid
      );
      // console.log(state.userShifts[productIndex]);
      console.log(state.availableShifts[bookedIndex].ownerId);
      const book_Shift = new Shift(
        action.pid,
        state.availableShifts[bookedIndex].ownerId,
        state.availableShifts[bookedIndex].title,
        state.availableShifts[bookedIndex].imageUrl,
        state.availableShifts[bookedIndex].shiftDate,
        state.availableShifts[bookedIndex].shiftTime,
        state.availableShifts[bookedIndex].shiftLocation,
        action.productData.shiftStatus,
        action.productData.bookedBy,
        state.availableShifts[bookedIndex].description,
        state.availableShifts[bookedIndex].timeStamps,
        state.availableShifts[bookedIndex].price
      );
      const updatedBookUserShifts = [...state.availableShifts];
      updatedBookUserShifts[bookedIndex] = book_Shift;
           
      const updatedUserBookShifts = [...state.userBookShift];
      updatedUserBookShifts.push(book_Shift);

      const upUserShift = [...state.userShifts];
      const userShiftIndexUpdated = state.userShifts.findIndex(
        prod => prod.id === action.pid
      );
      upUserShift[userShiftIndexUpdated] = book_Shift;
      // updatedUderBookShifts[userBookShiftIndex] = updatedShift;
      return {
        ...state,
        availableShifts: state.availableShifts.filter(
          product => product.id !== action.pid
        ),
        userShifts: upUserShift,
        userBookShift: updatedUserBookShifts
        // availableShifts: bookAvailableShifts,
        
      };

      case CANCEL_SHIFT:
        const cancelIndex = state.userBookShift.findIndex(
          prod => prod.id === action.pid
        );
        // console.log(state.userShifts[productIndex]);
        // console.log(state.availableShifts[cancelIndex].ownerId);
        const cancel_shift = new Shift(
          action.pid,
          state.userBookShift[cancelIndex].ownerId,
          state.userBookShift[cancelIndex].title,
          state.userBookShift[cancelIndex].imageUrl,
          state.userBookShift[cancelIndex].shiftDate,
          state.userBookShift[cancelIndex].shiftTime,
          state.userBookShift[cancelIndex].shiftLocation,
          action.productData.shiftStatus,
          action.productData.bookedBy,
          state.userBookShift[cancelIndex].description,
          state.userBookShift[cancelIndex].timeStamps,
          state.userBookShift[cancelIndex].price
        );
        const cancelAvailableShifts = [...state.availableShifts];
        // updatedCancelUserShifts[cancelIndex] = cancel_shift;
        cancelAvailableShifts.push(cancel_shift);
                
        const cancelUserBookShifts = [...state.userBookShift];
        cancelUserBookShifts[cancelIndex]= cancel_shift;
  
        const cancelUserShifts = [...state.userShifts];
        const cancelUserShiftsIndex = state.userShifts.findIndex(
          prod => prod.id === action.pid
        );
        cancelUserShifts[cancelUserShiftsIndex] = cancel_shift;
        // updatedUderBookShifts[userBookShiftIndex] = updatedShift;
        return {
          ...state,
          availableShifts: cancelAvailableShifts,
          
          // state.availableShifts.filter(
          //   product => product.id !== action.pid
          // ),
          userShifts: cancelUserShifts,
          userBookShift: state.userBookShift.filter(
            product => product.id !== action.pid
          )
          // availableShifts: bookAvailableShifts,
          
        };

        case CLOCK_OUT:
        const outIndex = state.userBookShift.findIndex(
          prod => prod.id === action.pid
        );
        // console.log(state.userShifts[productIndex]);
        // console.log(state.availableShifts[cancelIndex].ownerId);
        const outShift = new Shift(
          action.pid,
          state.userBookShift[outIndex].ownerId,
          state.userBookShift[outIndex].title,
          state.userBookShift[outIndex].imageUrl,
          state.userBookShift[outIndex].shiftDate,
          state.userBookShift[outIndex].shiftTime,
          state.userBookShift[outIndex].shiftLocation,
          action.productData.shiftStatus,
          state.userBookShift[outIndex].bookedBy,
          state.userBookShift[outIndex].description,
          action.productData.timeStamps,
          state.userBookShift[outIndex].price
        );
        const outAvailableShifts = [...state.availableShifts];
        // updatedCancelUserShifts[outIndex] = outShift;

        const outUserBookShifts = [...state.userBookShift];
        outUserBookShifts[outIndex]= outShift;
  
        const outUserShifts = [...state.userShifts];
        const outUserShiftsIndex = state.userShifts.findIndex(
          prod => prod.id === action.pid
        );
        outUserShifts[outUserShiftsIndex] = outShift;
        // updatedUderBookShifts[userBookShiftIndex] = updatedShift;
        return {
          ...state,
          availableShifts: outAvailableShifts,
          userShifts: outUserShifts,
          userBookShift: outUserBookShifts
          // availableShifts: bookAvailableShifts,
          
        };
  }

  return state;
};

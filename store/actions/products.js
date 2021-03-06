import Shift from '../../models/product';
import ShiftStatuses from "../../constants/ShiftStatuses";
import Clocks from '../../models/Clocks';
// import { State } from 'react-native-gesture-handler';
// import { concat } from 'react-native-reanimated';
import ENV from '../../env';
export const CLOCK_IN = 'CLOCK_IN';
export const CLOCK_OUT = 'CLOCK_OUT';
export const SET_CLOCKS = 'SET_CLOCKS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const BOOK_SHIFT = 'BOOK_SHIFT';
export const CANCEL_SHIFT = 'CANCEL_SHIFT';

export const fetchShifts = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        'https://clockin-clockout-default-rtdb.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedShifts = [];

      for (const key in resData) {
        loadedShifts.push(
          new Shift(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].shiftDate,
            resData[key].shiftTime,
            resData[key].shiftLocation,
            resData[key].shiftStatus,
            resData[key].bookedBy,
            resData[key].description,
            resData[key].timeStamps,
            resData[key].price,
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedShifts.filter(prod => prod.bookedBy === "NONE"),
        userShifts: loadedShifts.filter(prod => prod.ownerId === userId),
        userBookShift: loadedShifts.filter(prod => prod.bookedBy === userId)
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const fetchClocks = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(
        'https://clockin-clockout-default-rtdb.firebaseio.com/clocks.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedClocks = [];

      for (const key in resData) {
        loadedClocks.push(
          new Clocks(
            key,
            
          )
        );
      }

      dispatch({
        type: SET_CLOCKS,
        shiftClocks: loadedClocks.filter(prod => prod.bookedBy === "NONE"),
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteShift = productId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://clockin-clockout-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createShift = (title, description, imageUrl,shiftDate, shiftTime, shiftLocation, price ) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const shiftStatus = ShiftStatuses.open;
    const timeStamps = {};
    const bookedBy = "NONE";
    let address;
    if (shiftLocation) {
    const response_map = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ shiftLocation.lat },${shiftLocation.lng}&key=${ENV.googleApiKey}`);
    
      if (!response_map.ok) {
        throw new Error('Something went wrong!');
      }
    
      const resData_map = await response_map.json();
      if (!resData_map.results) {
        throw new Error('Something went wrong!');
      }
    
      address = resData_map.results[0].formatted_address;
    }
    let lat = shiftLocation.lat;
    let lng = shiftLocation.lng;
    shiftLocation = {lat: lat, lng: lng, address: address}
    
    const response = await fetch(
      `https://clockin-clockout-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          shiftDate,
          shiftTime,
          shiftLocation,
          shiftStatus,
          bookedBy,
          timeStamps,
          price,
          ownerId: userId
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        shiftDate,
        shiftTime,
        shiftLocation,
        shiftStatus,
        bookedBy,
        timeStamps,
        price,
        ownerId: userId
      }
    });
  };
};

export const updateShift = (id, title, description, imageUrl, shiftDate, shiftTime, shiftLocation) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    let address;
    if (shiftLocation) {
    const response_map = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ shiftLocation.lat },${shiftLocation.lng}&key=${ENV.googleApiKey}`);
    
      if (!response_map.ok) {
        throw new Error('Something went wrong!');
      }
    
      const resData_map = await response_map.json();
      if (!resData_map.results) {
        throw new Error('Something went wrong!');
      }
    
      address = resData_map.results[0].formatted_address;
    }
    let lat = shiftLocation.lat;
    let lng = shiftLocation.lng;
    shiftLocation = {lat: lat, lng: lng, address: address}
    const response = await fetch(
      `https://clockin-clockout-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          shiftDate,
          shiftTime,
          shiftLocation
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
        shiftDate,
        shiftTime,
        shiftLocation
      }
    });
  };
};

export const bookShift = (id, shiftStatus) => {
  return async (dispatch, getState) => {
    const bookedBy = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      `https://clockin-clockout-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bookedBy,
          shiftStatus
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: BOOK_SHIFT,
      pid: id,
      productData: {
        bookedBy,
        shiftStatus
      }
    });
  };
};


export const cancelShift = (id, shiftStatus) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const bookedBy = "NONE";
    const response = await fetch(
      `https://clockin-clockout-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bookedBy,
          shiftStatus
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: CANCEL_SHIFT,
      pid: id,
      productData: {
        bookedBy,
        shiftStatus
      }
    });
  
  };
};


export const closeShift = (id, timeIn, timeOut, shiftStatus) => {
  return async (dispatch, getState) => {

    const token = getState().auth.token;
    const shift_arr = getState().products.userBookShift;
    const shiftIndex = shift_arr.findIndex(
      prod => prod.id === id
    );

    let oldTime = shift_arr[shiftIndex].timeStamps;
    const timeShift = new Clocks(timeIn, timeOut);
    let timeStamps = shift_arr[shiftIndex].timeStamps;
    if (!oldTime) {
      timeStamps = [];
      timeStamps.push(timeShift);
    }else{
      timeStamps.push(timeShift);
    }
    const response = await fetch(
      `https://clockin-clockout-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          shiftStatus,
          timeStamps
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: CLOCK_OUT,
      pid: id,
      productData: {
        shiftStatus,
        timeStamps
      }
    });
  
  };
};
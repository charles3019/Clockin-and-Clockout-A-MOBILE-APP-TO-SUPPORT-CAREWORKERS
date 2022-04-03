import Shift from '../../models/product';
import ShiftStatuses from "../../constants/ShiftStatuses";
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

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
        // console.log(resData[key]);
        loadedShifts.push(
          // constructor(id, ownerId, title, imageUrl,  shiftDate, shiftTime, shiftLocation, shiftStatus, bookedBy, description, price) {
  
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
            resData[key].price,
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedShifts,
        userShifts: loadedShifts.filter(prod => prod.ownerId === userId)
      });
    } catch (err) {
      // send to custom analytics server
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
    // any async code you want!
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const shiftStatus = ShiftStatuses.open;
    const bookedBy = "NONE";
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
        price,
        ownerId: userId
      }
    });
  };
};

export const updateShift = (id, title, description, imageUrl, shiftDate, shiftTime, shiftLocation) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
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
          shiftLocation,
          // shiftStatus,
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
        shiftLocation,
        // shiftStatus
      }
    });
  };
};

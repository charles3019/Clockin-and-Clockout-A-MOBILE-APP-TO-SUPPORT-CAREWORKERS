import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
// import BookedItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedShift = action.product;
      const prodPrice = addedShift.price;
      const prodTitle = addedShift.title;

      let updatedOrNewBookedItem;

      if (state.items[addedShift.id]) {
        // already have the item in the cart
        updatedOrNewBookedItem = new BookedItem(
          state.items[addedShift.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedShift.id].sum + prodPrice
        );
      } else {
        updatedOrNewBookedItem = new BookedItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedShift.id]: updatedOrNewBookedItem },
        totalAmount: state.totalAmount + prodPrice
      };
    case REMOVE_FROM_CART:
      const selectedBookedItem = state.items[action.pid];
      const currentQty = selectedBookedItem.quantity;
      let updatedBookedItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedBookedItem = new BookedItem(
          selectedBookedItem.quantity - 1,
          selectedBookedItem.productPrice,
          selectedBookedItem.productTitle,
          selectedBookedItem.sum - selectedBookedItem.productPrice
        );
        updatedBookedItems = { ...state.items, [action.pid]: updatedBookedItem };
      } else {
        updatedBookedItems = { ...state.items };
        delete updatedBookedItems[action.pid];
      }
      return {
        ...state,
        items: updatedBookedItems,
        totalAmount: state.totalAmount - selectedBookedItem.productPrice
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal
      };
  }

  return state;
};

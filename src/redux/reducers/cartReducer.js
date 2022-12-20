import {
  ADD_TO_CART,
  ADD_ONE_PRODUCT,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
  FILL_CART,
  FILL_PRODUCTS
} from "../../types";

export const carritoInitialState = {
  products: [],
  cart: [],
};

export function cartReducer(state = carritoInitialState, action){
  switch (action.type) {
    case ADD_TO_CART:
      // let newItem = state.products.find(
      //   (product) => product.id === action.payload
      // );
      
      let newItem = action.payload;
      let itemInCart = state.cart.find((item) => item.id === newItem.id);

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.cantidad + 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, cantidad: 1 }],
          };

    case REMOVE_ALL_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case CLEAR_CART:
      return carritoInitialState;

    case ADD_ONE_PRODUCT:
      console.log(action)
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        ),
      }

    case REMOVE_ONE_FROM_CART:
      let itemToDelete = state.cart.find((item) => item.id === action.payload);

      return itemToDelete.cantidad > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };

    case FILL_CART:
      return {
        ...state,
        cart: action.payload
      };

    case FILL_PRODUCTS:
      
      return {
        ...state,
        products: action.payload
      };
      
    default:
      return state;
  }

}
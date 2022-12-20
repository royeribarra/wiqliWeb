import {
    FILL_PRODUCTS
  } from "../../types";
  
export const productosInitialState = {
  products: []
};

export function productosTiendaReducer(state = productosInitialState, action){
  switch (action.type) {
    case FILL_PRODUCTS:
      
      return {
        ...state,
        products: action.payload
      };
      
    default:
      return state;
  }
}
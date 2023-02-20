import {
    FILL_PRODUCTS
  } from "../../types";
  
export const productosInitialState = {
  productosTienda: []
};

export function productosTiendaReducer(state = productosInitialState, action){
  switch (action.type) {
    case FILL_PRODUCTS:
      
      return {
        ...state,
        productosTienda: action.payload
      };
      
    default:
      return state;
  }
}
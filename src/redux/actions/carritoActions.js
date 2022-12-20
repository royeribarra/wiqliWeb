import {
    ADD_TO_CART,
    ADD_ONE_PRODUCT,
    REMOVE_ONE_FROM_CART,
    REMOVE_ALL_FROM_CART,
    CLEAR_CART,
    FILL_CART,
  } from "../../types";
  
export const addToCart = (data) => ({ type: ADD_TO_CART, payload: data });

export const addOneToProduct = (id) => ({ type: ADD_ONE_PRODUCT, payload: id });
  
export const delFromCart = (id, all = false) =>
    all
      ? { type: REMOVE_ALL_FROM_CART, payload: id }
      : { type: REMOVE_ONE_FROM_CART, payload: id };
  
export const clearCart = () => ({ type: CLEAR_CART });

export const fillCart = (data) => ({ type: FILL_CART, payload: data });
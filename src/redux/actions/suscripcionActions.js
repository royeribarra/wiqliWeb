import {
    S_ADD_TO_CART,
    S_ADD_ONE_PRODUCT,
    S_REMOVE_ONE_FROM_CART,
    S_REMOVE_ALL_FROM_CART,
    S_CLEAR_CART,
    S_FILL_CART,
    S_ADD_TO_CART_EXTRA,
    S_REMOVE_FROM_CART_EXTRA,
    S_CLEAR_CART_EXTRA,
    S_FILL_CART_EXTRA,
    S_SET_PERIODO,
    S_SET_DIA_RECOJO
  } from "../types";
  
export const SaddToCart = (data) => ({ type: S_ADD_TO_CART, payload: data });

export const SaddOneToProduct = (id) => ({ type: S_ADD_ONE_PRODUCT, payload: id });
  
export const SdelFromCart = (id, all = false) =>
    all
      ? { type: S_REMOVE_ALL_FROM_CART, payload: id }
      : { type: S_REMOVE_ONE_FROM_CART, payload: id };
  
export const SclearCart = () => ({ type: S_CLEAR_CART });

export const SfillCart = (data) => ({ type: S_FILL_CART, payload: data });


//////////////////////

export const SaddToExtra = (data) => ({ type: S_ADD_TO_CART_EXTRA, payload: data });
  
export const SdelFromExtra = (id) => ({ type: S_REMOVE_FROM_CART_EXTRA, payload: id });

export const SclearExtra = () => ({ type: S_CLEAR_CART_EXTRA });

export const SfillExtra = (data) => ({ type: S_FILL_CART_EXTRA, payload: data });

///////////////////////

export const SsetPeriodo = (data) => ({ type: S_SET_PERIODO, payload: data });

export const SsetDiaRecojo = (data) => ({ type: S_SET_DIA_RECOJO, payload: data });
import {
    ADD_TO_CART,
    ADD_ONE_PRODUCT,
    REMOVE_ONE_FROM_CART,
    REMOVE_ALL_FROM_CART,
    CLEAR_CART,
    FILL_CART,
    APPLY_COUPON,
    CLEAR_COUPON,
    ADD_TO_CART_EXTRA,
    DEL_FROM_CART_EXTRA,
    FILL_CART_EXTRA,
    CLEAR_CART_EXTRA,
    ASIGN_DELIVERY_COST
  } from "../../types";
  
export const addToCart = (data) => ({ type: ADD_TO_CART, payload: data });

export const addOneToProduct = (id) => ({ type: ADD_ONE_PRODUCT, payload: id });
  
export const delFromCart = (id, all = false) =>
    all
      ? { type: REMOVE_ALL_FROM_CART, payload: id }
      : { type: REMOVE_ONE_FROM_CART, payload: id };
  
export const clearCart = () => ({ type: CLEAR_CART });

export const fillCart = (data) => ({ type: FILL_CART, payload: data });

//cupon
export const applyCoupon = (data) => ({ type: APPLY_COUPON, payload: data });

export const clearCoupon = () => ({ type: CLEAR_COUPON });

///para los productos extras

export const addToCartExtra = (data) => ({ type: ADD_TO_CART_EXTRA, payload: data });

export const delFromCartExtra = (data) => ({ type: DEL_FROM_CART_EXTRA, payload: data });

export const fillCartExtra = (data) => ({ type: FILL_CART_EXTRA, payload: data });

export const clearCartExtra = () => ({ type: CLEAR_CART_EXTRA });

//delivery
export const asingDeliveryCost = (data) => ({ type: ASIGN_DELIVERY_COST, payload: data });
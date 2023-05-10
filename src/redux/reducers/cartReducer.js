import { act } from "react-dom/test-utils";
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
  CLEAR_CART_EXTRA,
  FILL_CART_EXTRA,
  ASIGN_DELIVERY_COST
} from "../../types";

export const carritoInitialState = {
  otrasCarnes: [],
  otrasFrutas: [],
  otrasMenestras: [],
  otrasVerduras: [],
  otrasFrutosSecos: [],
  xtraCart: [],
  cart: [],
  total: 0.00,
  costoDelivery: 0.00,
  totalProductos: 0.00,
  descuentoCupon: 0.00
};

export function cartReducer(state = carritoInitialState, action){ 
  function getTotal (carrito = []){
    let total = carrito.reduce((accumulator, currentValue) => 
      accumulator + (currentValue.precio_unitario * currentValue.cantidad_minima * currentValue.cantidad), 0
    );
    return total;
  };

  function setExpiration()
  {
    const expiration = new Date();
    localStorage.setItem("expiration", expiration);
  }

  function evaluateExpiration()
  {
    const expiration = JSON.parse(localStorage.getItem("expiration"));
    if(expiration)
    {
      const now = new Date();
      if (now - expiration > (12 * 60 * 60 * 1000)) 
      {
        localStorage.removeItem("expiration");
        return null;
      } else {
       return true;
      }
    }
    return null;
  }

  switch (action.type) {
    case ADD_TO_CART:

      let newItem = action.payload;
      let inItem = state.cart.find((item) => item.id === action.payload.id);
      let cartTempAddProduct = [...state.cart, { ...newItem, cantidad: 1 }];

      !inItem ? localStorage.setItem("productos", JSON.stringify(cartTempAddProduct)) 
              : console.log("el producto ya existe");

      setExpiration();

      return {
        ...state,
        cart: cartTempAddProduct,
        totalProductos: getTotal(cartTempAddProduct)
      };

    case REMOVE_ALL_FROM_CART:

      let tempRemoveCart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("productos", JSON.stringify(tempRemoveCart));

      setExpiration();

      return {
        ...state,
        cart: tempRemoveCart,
        totalProductos: getTotal(tempRemoveCart)
      };

    case CLEAR_CART:
      localStorage.setItem("productos", JSON.stringify([]));

      return {
        ...state,
        cart: []
      };

    case ADD_ONE_PRODUCT:

      let cartTempAddOne = state.cart.map((item) =>
                            item.id === action.payload
                              ? { ...item, cantidad: item.cantidad + 1 }
                              : item);
      localStorage.setItem("productos", JSON.stringify(cartTempAddOne));
      
      setExpiration();

      return {
        ...state,
        cart: cartTempAddOne,
        totalProductos: getTotal(cartTempAddOne)
      }

    case REMOVE_ONE_FROM_CART:
      let itemToDelete = state.cart.find((item) => item.id === action.payload);
      let itemMinusOne = state.cart.map((item) =>
                            item.id === action.payload
                            ? { ...item, cantidad: item.cantidad - 1 }
                            : item);
      let cartTempRemove = itemToDelete.cantidad > 1
      ? itemMinusOne
      : state.cart;
      localStorage.setItem("productos", JSON.stringify(cartTempRemove));

      setExpiration();

      return itemToDelete.cantidad > 1 
              ?{
                ...state,
                cart: itemMinusOne,
                totalProductos: getTotal(itemMinusOne)
              } : {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload),
                totalProductos: getTotal(state.cart.filter((item) => item.id !== action.payload))
              };

    case FILL_CART:
      localStorage.setItem("productos", JSON.stringify(action.payload));

      return {
        ...state,
        cart: action.payload,
        totalProductos: getTotal(action.payload)
      };
    
    case APPLY_COUPON:
      
      return {
        ...state,
        descuentoCupon: action.payload.tipo === 1 ? 
          state.totalProductos*parseFloat(action.payload.monto)/100 : 
          action.payload.monto
      };

    case CLEAR_COUPON:
      return {
        ...state,
        descuentoCupon: 0.00
      };

    case ADD_TO_CART_EXTRA:
      let newItemE = action.payload;
      let inItemE = state.xtraCart.find((item) => item.id === action.payload.id);
      let cartTmpAddProductE = [...state.xtraCart, { ...newItemE }];
      
      !inItemE ? localStorage.setItem("xtraCart", JSON.stringify(cartTmpAddProductE)) 
              : console.log("el producto ya existe");

      return {
        ...state,
        xtraCart: cartTmpAddProductE
      };
    
    case DEL_FROM_CART_EXTRA:
      let tmpRemoveCartE = state.xtraCart.filter((item) => item.id !== action.payload);
      localStorage.setItem("xtraCart", JSON.stringify(tmpRemoveCartE));

      return {
        ...state,
        xtraCart: tmpRemoveCartE
      };

    case CLEAR_CART_EXTRA:
      localStorage.setItem("xtraCart", JSON.stringify([]));
      return {
        ...state,
        xtraSubCart: []
      };

    case FILL_CART_EXTRA:
      localStorage.setItem("xtraCart", JSON.stringify(action.payload));
      return {
        ...state,
        xtraSubCart: action.payload
      };

    case  ASIGN_DELIVERY_COST:
      return {
        ...state,
        costoDelivery: action.payload.tarifa
      };

    default:
      return state;
  }

}
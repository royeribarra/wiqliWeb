import {
  ADD_TO_CART,
  ADD_ONE_PRODUCT,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
  FILL_CART,
  APPLY_COUPON,
  CLEAR_COUPON
} from "../../types";

export const carritoInitialState = {
  otrasCarnes: [],
  otrasFrutas: [],
  otrasMenestras: [],
  otrasVerduras: [],
  otrasFrutosSecos: [],
  cart: [],
  total: 0.00,
  costoDelivery: 10.00,
  totalProductos: 0.00,
  descuentoCupon: 0.00
};

export function cartReducer(state = carritoInitialState, action){ 
  function getTotal (carrito = []){
    let total = carrito.reduce((accumulator, currentValue) => 
      accumulator + (currentValue.precio_unitario * currentValue.cantidad), 0
    );
    return total;
  };

  switch (action.type) {
    case ADD_TO_CART:

      let newItem = action.payload;
      let inItem = state.cart.find((item) => item.id === action.payload.id);
      let cartTempAddProduct = [...state.cart, { ...newItem, cantidad: 1 }];

      !inItem ? localStorage.setItem("productos", JSON.stringify(cartTempAddProduct)) 
              : console.log("el producto ya existe");

      return {
        ...state,
        cart: cartTempAddProduct,
        totalProductos: getTotal(cartTempAddProduct)
      };

    case REMOVE_ALL_FROM_CART:

      let tempRemoveCart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("productos", JSON.stringify(tempRemoveCart));
      return {
        ...state,
        cart: tempRemoveCart,
        totalProductos: getTotal(tempRemoveCart)
      };

    case CLEAR_CART:
      return carritoInitialState;

    case ADD_ONE_PRODUCT:

      let cartTempAddOne = state.cart.map((item) =>
                            item.id === action.payload
                              ? { ...item, cantidad: item.cantidad + 1 }
                              : item);
      localStorage.setItem("productos", JSON.stringify(cartTempAddOne));    

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
    default:
      return state;
  }

}
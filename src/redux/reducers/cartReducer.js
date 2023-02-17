import {
  ADD_TO_CART,
  ADD_ONE_PRODUCT,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
  FILL_CART
} from "../../types";

export const carritoInitialState = {
  otrasCarnes: [],
  otrasFrutas: [],
  otrasMenestras: [],
  otrasVerduras: [],
  otrasFrutosSecos: [],
  cart: [],
  total: 0,
  suscripcion:{
    productos: [],
    carnes: [],
    frutas: [],
    menestras: [],
    verduras: [],
    frutosSecos: [],
    total: 0
  }
};

export function cartReducer(state = carritoInitialState, action){
  switch (action.type) {
    case ADD_TO_CART:
      let newItem = action.payload;
      let inItem = state.cart.find((item) => item.id === action.payload.id);

      if(localStorage.getItem("productos"))
      {
        if(!inItem){
          let cartTemp = [...state.cart, { ...newItem, cantidad: 1 }];
          localStorage.setItem("productos", JSON.stringify(cartTemp));
        }
      }else{
        let cartTemp = [...state.cart, { ...newItem, cantidad: 1 }];
        localStorage.setItem("productos", JSON.stringify(cartTemp));
      }

      return {
        ...state,
        cart: [...state.cart, { ...newItem, cantidad: 1 }],
      };

    case REMOVE_ALL_FROM_CART:

      let tempCart = state.cart.filter((item) => item.id !== action.payload);
      if(localStorage.getItem("productos")){
        localStorage.setItem("productos", JSON.stringify(tempCart));
      }
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case CLEAR_CART:
      return carritoInitialState;

    case ADD_ONE_PRODUCT:

      let cartTemp = state.cart.map((item) =>
                        item.id === action.payload
                          ? { ...item, cantidad: item.cantidad + 1 }
                          : item);

      if(localStorage.getItem("productos")){
        localStorage.setItem("productos", JSON.stringify(cartTemp));
      }                    

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

      if(localStorage.getItem("productos")){
        let cartTemp = itemToDelete.cantidad > 1
        ? {
            ...state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };
        localStorage.setItem("productos", JSON.stringify(cartTemp));
      }

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
      
    default:
      return state;
  }

}
import {
    S_ADD_TO_CART,
    S_ADD_ONE_PRODUCT,
    S_REMOVE_ONE_FROM_CART,
    S_REMOVE_ALL_FROM_CART,
    S_CLEAR_CART,
    S_FILL_CART
  } from "../types";
  
  export const suscripcionInitialState = {
    productos: [],
    carnes: [],
    frutas: [],
    menestras: [],
    verduras: [],
    frutosSecos: [],
    total: 0
  };
  
  export function suscripcionReducer(state = suscripcionInitialState, action){
    switch (action.type) {
      case S_ADD_TO_CART:
        let newItem = action.payload;
        let inItem = state.productos.find((item) => item.id === action.payload.id);
  
        if(localStorage.getItem("productos"))
        {
          if(!inItem){
            let cartTemp = [...state.productos, { ...newItem, cantidad: 1 }];
            localStorage.setItem("productos", JSON.stringify(cartTemp));
          }
        }else{
          let cartTemp = [...state.productos, { ...newItem, cantidad: 1 }];
          localStorage.setItem("productos", JSON.stringify(cartTemp));
        }
  
        return {
          ...state,
          productos: [...state.productos, { ...newItem, cantidad: 1 }],
        };
  
      case S_REMOVE_ALL_FROM_CART:
  
        let tempCart = state.productos.filter((item) => item.id !== action.payload);
        if(localStorage.getItem("productos")){
          localStorage.setItem("productos", JSON.stringify(tempCart));
        }
        return {
          ...state,
          productos: state.productos.filter((item) => item.id !== action.payload),
        };
  
      case S_CLEAR_CART:
        return suscripcionInitialState;
  
      case S_ADD_ONE_PRODUCT:
  
        let cartTemp = state.productos.map((item) =>
                          item.id === action.payload
                            ? { ...item, cantidad: item.cantidad + 1 }
                            : item);
  
        if(localStorage.getItem("productos")){
          localStorage.setItem("productos", JSON.stringify(cartTemp));
        }                    
  
        return {
          ...state,
          productos: state.productos.map((item) =>
            item.id === action.payload
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          ),
        }
  
      case S_REMOVE_ONE_FROM_CART:
        let itemToDelete = state.productos.find((item) => item.id === action.payload);
  
        if(localStorage.getItem("productos")){
          let cartTemp = itemToDelete.cantidad > 1
          ? {
              ...state.productos.map((item) =>
                item.id === action.payload
                  ? { ...item, cantidad: item.cantidad - 1 }
                  : item
              ),
            }
          : {
              ...state,
              productos: state.productos.filter((item) => item.id !== action.payload),
            };
          localStorage.setItem("productos", JSON.stringify(cartTemp));
        }
  
        return itemToDelete.cantidad > 1
          ? {
              ...state,
              productos: state.productos.map((item) =>
                item.id === action.payload
                  ? { ...item, cantidad: item.cantidad - 1 }
                  : item
              ),
            }
          : {
              ...state,
              productos: state.productos.filter((item) => item.id !== action.payload),
            };
  
      case S_FILL_CART:
        return {
          ...state,
          productos: action.payload
        };
        
      default:
        return state;
    }
  
  }
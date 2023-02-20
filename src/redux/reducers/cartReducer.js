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
  delivery: 10,
  totalProductos: 0,
  descuento: 0
};

export function cartReducer(state = carritoInitialState, action){
  switch (action.type) {
    case ADD_TO_CART:
      let newItem = action.payload;
      let inItem = state.cart.find((item) => item.id === action.payload.id);
      let cartTempAddProduct = [...state.cart, { ...newItem, cantidad: 1 }];

      !inItem ? localStorage.setItem("productos", JSON.stringify(cartTempAddProduct)) 
              : console.log("el producto ya existe");

      return {
        ...state,
        cart: [...state.cart, { ...newItem, cantidad: 1 }],
        totalProductos: [...state.cart, { ...newItem, cantidad: 1 }].reduce((accumulator, currentValue) => 
          accumulator + (currentValue.precio_unitario * currentValue.cantidad), 0)
      };

    case REMOVE_ALL_FROM_CART:

      let tempCart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("productos", JSON.stringify(tempCart));
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
        totalProductos: (state.cart.filter((item) => item.id !== action.payload)).reduce((accumulator, currentValue) => 
          accumulator + (currentValue.precio_unitario * currentValue.cantidad), 0)
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
        cart: state.cart.map((item) =>
                item.id === action.payload
                  ? { ...item, cantidad: item.cantidad + 1 }
                  : item
              ),
        totalProductos: (state.cart.map((item) =>
                item.id === action.payload
                  ? { ...item, cantidad: item.cantidad + 1 }
                  : item
              )).reduce((accumulator, currentValue) => 
              accumulator + (currentValue.precio_unitario * currentValue.cantidad), 0)
      }

    case REMOVE_ONE_FROM_CART:
      let itemToDelete = state.cart.find((item) => item.id === action.payload);
      let cartTempRemove = itemToDelete.cantidad > 1
      ? {
          ...state,
          car: state.cart.map((item) =>
            item.id === action.payload
              ? { ...item, cantidad: item.cantidad - 1 }
              : item
          ),
          totalProductos: (state.cart.map((item) =>
                  item.id === action.payload
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
                )).reduce((accumulator, currentValue) => 
                accumulator + (currentValue.precio_unitario * currentValue.cantidad), 0)
        }
      : {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload),
          totalProductos: (state.cart.filter((item) => item.id !== action.payload)).reduce((accumulator, currentValue) => 
            accumulator + (currentValue.precio_unitario * currentValue.cantidad), 0),
        };
      localStorage.setItem("productos", JSON.stringify(cartTempRemove));

      return cartTempRemove;

    case FILL_CART:
      return {
        ...state,
        cart: action.payload,
        totalProductos: (action.payload).reduce((accumulator, currentValue) => 
          accumulator + (currentValue.precio_unitario * currentValue.cantidad), 0),
      };
      
    default:
      return state;
  }

}
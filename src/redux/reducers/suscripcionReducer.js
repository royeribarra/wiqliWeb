import {
  S_SET_INFO_SUSCRIPTION,

  S_ADD_TO_CART,
  S_ADD_ONE_PRODUCT,
  S_REMOVE_ONE_FROM_CART,
  S_REMOVE_ALL_FROM_CART,
  S_CLEAR_CART,
  S_FILL_CART,
  
  S_ADD_TO_CART_EXTRA,
  S_CLEAR_CART_EXTRA,
  S_REMOVE_FROM_CART_EXTRA,
  S_FILL_CART_EXTRA,
  S_SET_PERIODO,
  S_SET_DIA_RECOJO
} from "../types";
  
export const suscripcionInitialState = {
  xtraSubCart: [],
  subCart: [],
  totalProductos: 0.00,
  periodo: 1,
  diaRecojo: 2,
  datosTarjeta:{
    numeroTarjeta: '',
    tipoBanco: '',
    nombreTarjeta: '',
    fechaVencimiento: '',
    cvv: ''
  },
  suscripcionId: null
};
  
export function suscripcionReducer(state = suscripcionInitialState, action){
  function getTotal (carrito = [])
  {
    let total = carrito.reduce((accumulator, currentValue) => 
      accumulator + (currentValue.precio_unitario * currentValue.cantidad), 0
    );
    return total;
  };

  switch (action.type) {

    case S_SET_INFO_SUSCRIPTION:
      localStorage.setItem("subProductos", JSON.stringify(action.payload.subCart));
      localStorage.setItem("xtraSubCart", JSON.stringify(action.payload.xtraSubCart));
      return {
        ...state,
        suscripcionId: action.payload.id,
        xtraSubCart: action.payload.xtraSubCart,
        subCart: action.payload.subCart,
        diaRecojo: action.payload.diaEntrega,
        periodo: action.payload.periodo,
        totalProductos: getTotal(action.payload.subCart)
      };
    case S_ADD_TO_CART:

    let newItem = action.payload;
    let inItem = state.subCart.find((item) => item.productoId === action.payload.id);
    let cartTempAddProduct = [...state.subCart, { ...newItem, cantidad: 1, productoId:  action.payload.id}];

    !inItem ? localStorage.setItem("subProductos", JSON.stringify(cartTempAddProduct)) 
            : console.log("el producto ya existe");

    return {
      ...state,
      subCart: cartTempAddProduct,
      totalProductos: getTotal(cartTempAddProduct)
    };

  case S_REMOVE_ALL_FROM_CART:

    let tempRemoveCart = state.subCart.filter((item) => item.productoId !== action.payload);
    localStorage.setItem("subProductos", JSON.stringify(tempRemoveCart));
    return {
      ...state,
      subCart: tempRemoveCart,
      totalProductos: getTotal(tempRemoveCart)
    };

  case S_CLEAR_CART:
    localStorage.setItem("subProductos", JSON.stringify([]));
    return {
      ...state,
      subCart: []
    };

  case S_ADD_ONE_PRODUCT:

    let cartTempAddOne = state.subCart.map((item) =>
                          item.productoId === action.payload
                            ? { ...item, cantidad: parseFloat(item.cantidad) + 1 }
                            : item);
    localStorage.setItem("subProductos", JSON.stringify(cartTempAddOne));    

    return {
      ...state,
      subCart: cartTempAddOne,
      totalProductos: getTotal(cartTempAddOne)
    }

  case S_REMOVE_ONE_FROM_CART:
    let itemToDelete = state.subCart.find((item) => item.productoId === action.payload);
    let itemMinusOne = state.subCart.map((item) =>
                          item.productoId === action.payload
                          ? { ...item, cantidad: item.cantidad - 1 }
                          : item);
    let cartTempRemove = itemToDelete.cantidad > 1
    ? itemMinusOne
    : state.subCart;
    localStorage.setItem("subProductos", JSON.stringify(cartTempRemove));

    return itemToDelete.cantidad > 1 
            ?{
              ...state,
              subCart: itemMinusOne,
              totalProductos: getTotal(itemMinusOne)
            } : {
              ...state,
              subCart: state.subCart.filter((item) => item.productoId !== action.payload),
              totalProductos: getTotal(state.subCart.filter((item) => item.productoId !== action.payload))
            };

  case S_FILL_CART:
    localStorage.setItem("subProductos", JSON.stringify(action.payload));
    return {
      ...state,
      subCart: action.payload,
      totalProductos: getTotal(action.payload)
    };

    //para los extras
  case S_ADD_TO_CART_EXTRA:
    let newItemE = action.payload;
    let inItemE = state.xtraSubCart.find((item) => item.id === action.payload.id);
    let cartTmpAddProductE = [...state.xtraSubCart, { ...newItemE }];
    
    !inItemE ? localStorage.setItem("xtraSubCart", JSON.stringify(cartTmpAddProductE)) 
            : console.log("el producto ya existe");

    return {
      ...state,
      xtraSubCart: cartTmpAddProductE
    };

  case S_REMOVE_FROM_CART_EXTRA:

    let tmpRemoveCartE = state.xtraSubCart.filter((item) => item.id !== action.payload);
    localStorage.setItem("xtraSubCart", JSON.stringify(tmpRemoveCartE));
    return {
      ...state,
      xtraSubCart: tmpRemoveCartE
    };

  case S_CLEAR_CART_EXTRA:
    localStorage.setItem("xtraSubCart", []);
    return {
      ...state,
      xtraSubCart: []
    };

  case S_FILL_CART_EXTRA:
    localStorage.setItem("xtraSubCart", JSON.stringify(action.payload));
    return {
      ...state,
      xtraSubCart: action.payload
    };
      
  case S_SET_PERIODO:
    return {
      ...state,
      periodo: action.payload
    };

  case S_SET_DIA_RECOJO:
    return {
      ...state,
      diaRecojo: action.payload
    };
  default:
    return state;
  }

}
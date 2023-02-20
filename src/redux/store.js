import {createStore, combineReducers, applyMiddleware} from "redux";
import { reducer as toastrReducer } from 'react-redux-toastr';
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
// ***** REFUCERS *****
import spinner from "./reducers/spinnerReducer";
import routeReducer from "./reducers/routeReducer";
import { cartReducer } from "./reducers/cartReducer";
import { productosTiendaReducer } from "./reducers/productosTiendaReducer";
import loaderReducer from "./reducers/loaderReducer";
import userLogedReducer from "./reducers/userLogedReducer";
import { suscripcionReducer } from "./reducers/suscripcionReducer";

const reducer = combineReducers({   
    spinner,
    user: userLogedReducer,
    routeReducer,
    loader: loaderReducer,
    toastr: toastrReducer,
    cart: cartReducer,
    suscripcion: suscripcionReducer,
    productos: productosTiendaReducer
});

export default createStore(reducer, {},
    applyMiddleware(logger, thunk, promise)
);


import {createStore, combineReducers, applyMiddleware} from "redux";
import { reducer as toastrReducer } from 'react-redux-toastr';
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
// ***** REFUCERS *****
import spinner from "./reducers/spinnerReducer";
import routeReducer from "./reducers/routeReducer";
import user from "./reducers/userLogedReducer";
import { cartReducer } from "./reducers/cartReducer";
import { productosTiendaReducer } from "./reducers/productosTiendaReducer";

const reducer = combineReducers({   
    spinner,
    user,
    routeReducer,
    toastr: toastrReducer,
    cart: cartReducer,
    productos: productosTiendaReducer
});

export default createStore(reducer, {},
    applyMiddleware(logger, thunk, promise)
);


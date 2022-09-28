import {createStore, combineReducers, applyMiddleware} from "redux";
import { reducer as toastrReducer } from 'react-redux-toastr';
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
// ***** REFUCERS *****
import spinner from "./reducers/spinnerReducer";
import routeReducer from "./reducers/routeReducer";

const reducer = combineReducers({   
    spinner,
    routeReducer,
    toastr: toastrReducer 

});

export default createStore(reducer, {},
    applyMiddleware(logger, thunk, promise)
);


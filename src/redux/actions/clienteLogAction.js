import { 
    LOGIN, 
    LOGOUT, 
    SET_INFO_CLIENTE,
    SET_CUPON_CLIENTE,
    SET_TOTAL_REFERIDOS_CLIENTE
} from "../types";

export const login = () => ({ type: LOGIN });

export const setInfoCliente = (data) => ({ type: SET_INFO_CLIENTE, payload: data });

export const setCuponCliente = (data) => ({ type: SET_CUPON_CLIENTE, payload: data });

export const setTotalReferidosCliente = (data) => ({ type: SET_TOTAL_REFERIDOS_CLIENTE, payload: data });
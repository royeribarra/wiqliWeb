import { 
    LOGIN, 
    LOGOUT, 
    SET_INFO_CLIENTE,
    SET_CUPON_CLIENTE,
    SET_TOTAL_REFERIDOS_CLIENTE
} from "../types";

export const userInitialState = {
    isLoged: false,
    infoUser: {
        name: '',
        father_lastname: '',
        phone: '',
        email: '',
        address: '',
        referencia: '',
        isSuscrito: false,
        billetera: {
            saldo: 0
        }
    },
    codigoUser: '',
    descuentoReferidos: 0
};

function userLogedReducer(state = userInitialState, action)
{
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoged: true
            };
        case LOGOUT:
            return {
                ...state,
                isLoged: false
            };
        case SET_INFO_CLIENTE:
            return {
                ...state,
                infoUser: action.payload
            };
        case SET_CUPON_CLIENTE:
            return {
                ...state,
                codigoUser: action.payload
            };
        case SET_TOTAL_REFERIDOS_CLIENTE:
            return {
                ...state,
                descuentoReferidos: action.payload
            };
        default:
            return state;
    }
};

export default userLogedReducer;
import {
    SET_CONFIGURATION
  } from "../types";

export const configurationInitialState = {
    id: 1,
    montoDescuento: 0.00,
    montoMinimoCompraReferido: 100.00,
    montoMinimoEnvioCodigo: 0.00,
    tipoDescuento: 1
};

export default function configurationReducer(state = configurationInitialState, action)
{
    switch(action.type)
    {
        case SET_CONFIGURATION:
            return {
                ...state,
                showLoader: true,
            };
        default:
            return state;
    }
}
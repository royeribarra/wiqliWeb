import { 
    SET_CONFIGURATION
} from "../types";

export const setConfiguration = (data) => ({ type: SET_CONFIGURATION, payload: data });

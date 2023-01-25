import { toastr } from "react-redux-toastr";
import LogService from "../../servicios/logService";
import StorageService from "../../servicios/storageService";

export function login(values) {
    return dispatch => {
        const logService = new LogService();
        const storageServicce = new StorageService(); 
       
        logService.oauthCliente(values)
            .then(({data}) => {
                if(data.status === false){
                    toastr.error(data.message)
                    
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 2000);
                }
                if(data.status){
                    storageServicce.setItemObject('tknData', data);
                    logService.getAuthInfo(data.access_token).then(({data}) => {
                        storageServicce.setItemObject('authUser', data)
                        storageServicce.setItem('type', 2)
                        dispatch({
                            type: "LOGIN",
                            payload: data
                         });
    
                         dispatch({
                            type: "HIDE",
                            payload: false
                        });
    
                        window.location.href = '/';
                    },
                    (err)=> {
                        dispatch({
                            type: "HIDE",
                            payload: false
                        });
                    })
                }
                
            }, (err) => {
                dispatch({
                    type: "HIDE",
                    payload: false
                });
            });
    }
}

export function setAge(age) {
    return {
        type: "SET_AGE",
        payload: age
    };
}
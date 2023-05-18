import { useNavigate } from "react-router-dom";
import { fillCart } from "../redux/actions/carritoActions";

export class ExpiracionService
{
    comprobarExpiracion() {
        
        const expiration = localStorage.getItem("expiration");
        if(expiration)
        {
            const history = useNavigate();
            const exp2 = new Date(expiration)
            const now = new Date();
            if ((now.getTime() - exp2.getTime()) > (12 * 60 * 60 * 1000)) 
            { 
                localStorage.removeItem("expiration");
                dispatch(fillCart([]));
                history(`/`);
            }
        }
    }
}
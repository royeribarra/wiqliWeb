import axios from "axios";

export class CuponService
{
    activarCupon(codigo) {
        return axios.get(`${this.url}`);
    }
}
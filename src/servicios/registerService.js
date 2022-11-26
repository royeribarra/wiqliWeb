import axios from "axios";

export class RegistroService
{
    registro(data) {
        return axios.post(`${process.env.REACT_APP_BASE_PATH}/cliente/registro`, data);
    }

    verificarCorreo(codigo)
    {
        return axios.get(`${process.env.REACT_APP_BASE_PATH}/verificar-correo/${codigo}`);
    }
}
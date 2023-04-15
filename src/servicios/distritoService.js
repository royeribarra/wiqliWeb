import axios from "axios";

export class DistritoService
{
    getDistritos() {
        return axios.get(`${process.env.REACT_APP_BASE_PATH}/distritos/todos`);
    }
}
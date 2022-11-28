import axios from "axios";
import { MainService } from "./mainService";

export class UsuarioService extends MainService {
  constructor(url) {
    super(url);
  }

  getInformacionUsuario() {
    return axios.get(`${this.url}/profiles`, this.options);
  }

  realizarPedido() {
    return axios.post(`${this.url}/sedes`, this.options);
  }

  actualizarInformacionPersonal()
  {
    return axios.get(`${this.url}/update-state/${id}`, this.options);
  }
}
  
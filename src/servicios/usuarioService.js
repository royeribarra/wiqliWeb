import axios from "axios";
import { MainService } from "./mainService";

export class UsuarioService extends MainService {
  constructor(url) {
    super(url);
  }

  getInformacionUsuario() {
    return axios.get(`${this.url}/profiles`, this.options);
  }

  realizarPedido(data) {
    console.log(this.options)
    return axios.post(`${this.url}/crear-pedido`, data, this.options);
  }

  actualizarInformacionPersonal(id)
  {
    return axios.get(`${this.url}/update-state/${id}`, this.options);
  }
}
  
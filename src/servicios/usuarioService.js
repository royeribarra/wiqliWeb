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
    return axios.post(`${this.url}/crear-pedido`, data, this.options);
  }

  obtenerProductosUltimoPedido() {
    return axios.get(`${this.url}`, this.options);
  }

  obtenerTotalReferidos() {
    return axios.get(`${this.url}`, this.options);
  }

  obtenerCodigoCuponDescuento() {
    return axios.get(`${this.url}`, this.options);
  }

  getInfoUser() {
    return axios.get(`${this.clearUrl}/usuario/informacion`, this.options);
  }
  
  actualizarInformacionPersonal(id)
  {
    return axios.get(`${this.url}/update-state/${id}`, this.options);
  }
}
  
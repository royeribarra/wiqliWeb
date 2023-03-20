import axios from "axios";
import { MainService } from "./mainService";

export class SuscripcionService extends MainService {
  constructor(url) {
    super(url);
  }

  crearSuscripcion(data) {
    return axios.post(`${this.clearUrl}/cliente/crear-suscripcion`, data, this.options);
  }

  editarProductosSuscripcion(data) {
    return axios.post(`${this.clearUrl}/cliente/editar-productos-suscripcion`, data, this.options);
  }

  editarPeriodoSuscripcion(data) {
    return axios.post(`${this.clearUrl}/cliente/editar-periodo-suscripcion`, data, this.options);
  }

  editarDatosTarjetaSuscripcion(data) {
    return axios.post(`${this.clearUrl}/cliente/editar-datos-tarjeta-suscripcion`, data, this.options);
  }

  cancelarSuscripcion() {
    return axios.get(`${this.clearUrl}/cliente/suscripcion/cancelar`, this.options);
  }
}
  
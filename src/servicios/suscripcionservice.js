import axios from "axios";
import { MainService } from "./mainService";

export class SuscripcionService extends MainService {
  constructor(url) {
    super(url);
  }

  crearSuscripcion(data) {
    return axios.post(`${this.clearUrl}/cliente/crear-suscripcion`, data, this.options);
  }
}
  
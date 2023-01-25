import axios from "axios";
import { MainService } from "./mainService";

export class SuscripcionService extends MainService {
  constructor(url) {
    super(url);
  }

  crearSuscripcion(data) {
    console.log(this.url);
    return axios.post(`${this.clearUrl}/cliente/crear-suscripcion`, data, this.options);
  }
}
  
import React from "react";
import './agregarOtro.css';
import { Form } from "react-bootstrap";
import agregar from "../../images/agregar.png"


function AgregarOtro() {
  return (
    <div>
    <h5>Agregar otro producto (opcional)</h5>
    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="tituloForm">Nombre</Form.Label>
        <Form.Control className="inputForm" type="text" placeholder="producto" />
        <Form.Label className="tituloForm">Cantidad</Form.Label>
        <Form.Control className="inputForm" type="text" placeholder="1 kilo" />
    </Form.Group>
    <div>
        <img 
        src={agregar}
        alt="fresa"
        />
      <button className="botonAgregarMasProductos" type="submit">
        Agregar más
      </button>
    </div>
    </div>
  );
}

export default AgregarOtro;
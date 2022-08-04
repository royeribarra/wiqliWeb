import React from "react";
import './agregarOtro.css';
import { Form } from 'antd';
import agregar from "../../images/agregar.png"
import TextArea from "antd/lib/input/TextArea";


function AgregarOtro() {
  return (
    <div>
      <h5>Agregar otro producto (opcional)</h5>
      <Form>
      <div className="itemForm">
              <Form.Item 
                label="Nombre de producto"
                name="productoAdicionalNombre" 
              >
                <TextArea rows={1} placeholder="Kiwi" />
              </Form.Item>
      </div>
      <div className="itemForm">
              <Form.Item 
                label="Peso o cantidad"
                name="productoAdicionalCantidad" 
              >
                <TextArea rows={1} placeholder="1 Kilo" />
              </Form.Item>
      </div>
      </Form>
      <div>
        <img 
          src={agregar}
          alt="agregar más productos wiqli"
        />
        <button className="botonAgregarMasProductos" type="submit">
          Agregar más
        </button>
      </div>
    </div>
  );
}

export default AgregarOtro;
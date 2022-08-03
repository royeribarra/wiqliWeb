import React, { useState } from "react";
import { Accordion, Form, Card, Button } from "react-bootstrap";

import quitar from "../../images/quitar.png"
import mas from "../../images/menos.png"
import menos from "../../images/mas.png"


function ProductoComponente({data, agregarProducto, quitarProducto}) 
{
  const[tipoComponente, setTipoComponente] = useState(1);
  const agregarCarrito = () => {
    setTipoComponente(2);
    agregarProducto(data);
  }

  const quitarCarrito = () => {
    setTipoComponente(1);
    quitarProducto(data);
  }

  return(
    <div className="productCard">
      <div className="imagenProducto">
        <img
          src=""
          alt="fresa"
        />
      </div>
      {
        tipoComponente === 1 &&
        <Card className="descripcionProducto" onClick={agregarCarrito}>
          <div className="datosProducto">
            <h5>{data.nombre}</h5>
            <p></p>
            <p>S/{data.precio_unitario} x {data.unidad.nombre}</p>
          </div>
          <Form.Check type="checkbox" label="" />
        </Card>
      }
      
      {
        tipoComponente === 2 &&
        <div>
        <Card className="descripcionProducto" onClick={quitarCarrito}>
          <div className="datosProducto">
            <div>
            <h5>{data.nombre}</h5>
            <img
            src={quitar}
            />
            </div>
            <p></p>
            <p>S/{data.precio_unitario} x {data.unidad.nombre}</p>
          </div>
          </Card>
          <div>
          <p>X</p>
          </div>
          <div>
            <img 
            src={mas}
            alt="Comprar productos Wiqli"
            />
            <p>{data.cantidad}</p>
            <img
            src={menos}
            alt="Comprar productos Wiqli"
            />
          </div>          

        </div>
      }
    </div>
  );
}

export default ProductoComponente;
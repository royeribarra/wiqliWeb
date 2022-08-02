import React, { useState } from "react";
import { Accordion, Form, Card, Button } from "react-bootstrap";

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
        <Card className="descripcionProducto" onClick={quitarCarrito}>
          <div className="datosProducto">
            <h5>{data.nombre}</h5>
            <p></p>
            <p>S/{data.precio_unitario} x {data.unidad.nombre}</p>
          </div>
          <p>X</p>
          <Button>Soy otro</Button>
        </Card>
        
      }
    </div>
  );
}

export default ProductoComponente;
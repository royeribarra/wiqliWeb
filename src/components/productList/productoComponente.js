import React, { useState } from "react";
import { Accordion, Form, Card, Button } from "react-bootstrap";

import quitar from "../../images/quitar.png"
import mas from "../../images/menos.png"
import menos from "../../images/mas.png"


function ProductoComponente({data, agregarProducto, quitarProducto, disminuirUnidades, aumentarUnidades}) 
{
  const[cantidad, setCantidad] = useState(1);
  const[tipoComponente, setTipoComponente] = useState(1);

  const agregarCarrito = () => {
    setTipoComponente(2);
    agregarProducto(data);
  }

  const quitarCarrito = () => {
    setTipoComponente(1);
    quitarProducto(data);
  }

  const agregarCantidadProducto = () => {
    setCantidad(cantidad + 1);
    aumentarUnidades(data);
  }

  const disminuiCantidadProducto = () => {
    if(cantidad === 1){
      console.log("La cantidad mínima a comprar es 1.")
    }else{
      setCantidad(cantidad - 1);
      disminuirUnidades(data);
    }
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
            <p>S/{data.precio_unitario} x {data.unidad.abreviatura}
            {
              data.cantidad_minima !== 1 &&
              ` (Aprox S/ ${parseFloat(data.cantidad_minima*data.precio_unitario).toFixed(2)})`
            }</p>
            
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
            <p>S/{data.precio_unitario} x {data.unidad.abreviatura}</p>
          </div>
          </Card>
          <div>
            <p>X</p>
          </div>
          <div>
            <img
              src={menos}
              alt="Comprar productos Wiqli"
              onClick={agregarCantidadProducto}
              style={{cursor: "pointer"}}
            />
            <p>{cantidad}</p>
            <img
              src={mas}
              alt="Comprar productos Wiqli"
              onClick={disminuiCantidadProducto}
              style={{cursor: "pointer"}}
            />
          </div>
        </div>
      }
    </div>
  );
}

export default ProductoComponente;
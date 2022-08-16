import React, { useEffect, useState } from "react";
import { Accordion, Form, Card, Button } from "react-bootstrap";

import quitar from "../../images/quitar.png"
import mas from "../../images/menos.png"
import menos from "../../images/mas.png"
import fresa from "../../images/fresa.jpg"


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
    }else{
      setCantidad(cantidad - 1);
      disminuirUnidades(data);
    }
  }

  useEffect(() => {
    if(sessionStorage.getItem('productos')){
      let productosStorage = JSON.parse(sessionStorage.getItem('productos'));
      productosStorage.forEach(producto => {
        if(producto.id === data.id)
        {
          setTipoComponente(2);
          setCantidad(producto.cantidad);
        } 
      });
    }
  }, [data]);

  return(
    <div className="productCard">
      <div className="imagenProducto">
        <img
          src={data.imagen}
          alt={data.nombre}
        />
      </div>
      {
        tipoComponente === 1 &&
        <Card className="descripcionProducto" onClick={agregarCarrito}>
          <div className="datosProducto">
            <h5>{data.nombre}</h5>
            <p>{data.cantidad_minima === 1 ? '' : `Unidad de aprox ${data.cantidad_minima} ${data.unidad.abreviatura}`}</p>
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
        <div className="estructuraProductoAgregado">
        <Card className="descripcionProductoAgregado" onClick={quitarCarrito}>
          <div className="datosProducto">
            <div className="primerSegmentoProducto">
            <h5>{data.nombre}</h5>
            <div className="contenedorEliminar">
            <img
            src={quitar}
            />
            </div>
            </div>
            <p>{data.cantidad_minima === 1 ? '' : `Unidad de aprox ${data.cantidad_minima} ${data.unidad.abreviatura}`}</p>
            <p>S/{data.precio_unitario} x {data.unidad.abreviatura}</p>
          </div>
          </Card>
          <div>
            <p className="multiplicadorPrecio">x</p>
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
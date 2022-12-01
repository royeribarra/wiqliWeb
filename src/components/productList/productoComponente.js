import React, { useEffect, useState } from "react";
import { Form, Card } from "react-bootstrap";

import quitar from "../../images/quitar.png"
import mas from "../../images/menos.png"
import menos from "../../images/mas.png"


function ProductoComponente({data, agregarProducto, quitarProducto, disminuirUnidades, aumentarUnidades, renderizarNuevamente}) 
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
  }, [data, renderizarNuevamente]);

  return(
    <div className="productCard">
      <div className="imagenProducto">
        <img
          src={`${process.env.REACT_APP_BASE_PATH}/wiqli/`+data.imagen}
          alt={`comprar ` + data.nombre}
        />
      </div>
      {
        tipoComponente === 1 &&
        <Card className="descripcionProducto" onClick={agregarCarrito}>
          <div className="datosProducto">
            <h5>{data.nombre}</h5>
            <p style={{ color: "#BA3B46", fontSize: "12px" }}>{data.disponibilidad_limitada ? 'Sujeto a disponiblidad' : ''}</p>
            <p style={{ fontSize: "0.9rem" }}>{data.cantidad_minima === "1.00" ? '' : `Unidad de aprox ${data.cantidad_minima} ${data.unidad.abreviatura}`}</p>
            <p><span style={{ color: "#3681B8", fontWeight: "500" }}>S/{data.precio_unitario} x {data.unidad.abreviatura}</span>
            {
              data.cantidad_minima !== "1.00" &&
              <span style={{ color: "#3681B8", fontWeight: "500" }}>
                {
                  ` (Aprox S/ ${parseFloat(data.cantidad_minima*data.precio_unitario).toFixed(2)})`
                }
              </span>
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
              alt="eliminar producto carrito"
            />
            </div>
            </div>
            <p style={{ fontSize: "0.9rem" }}>{data.cantidad_minima === "1.00" ? '' : `Unidad de aprox ${data.cantidad_minima} ${data.unidad.abreviatura}`}</p>
            <p><span style={{ color: "#3681B8", fontWeight: "500" }}>S/{data.precio_unitario} x {data.unidad.abreviatura}</span></p>
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
import React, { useEffect, useState } from "react";
import { Form, Card } from "react-bootstrap";

import quitar from "../../images/quitar.png"
import mas from "../../images/menos.png"
import menos from "../../images/mas.png"
import { useDispatch, useSelector } from "react-redux";
import { 
  addToCart, 
  addOneToProduct, 
  delFromCart,
} from "../../redux/actions/carritoActions";
import "./productoComponente.css";

function ProductoComponente({
  data, agregarProducto, quitarProducto, disminuirUnidades, aumentarUnidades, renderizarNuevamente
}) 
{
  const state = useSelector((state) => state);
  const { cart } = state.cart;
  const dispatch = useDispatch();

  const[cantidad, setCantidad] = useState(1);
  const[tipoComponente, setTipoComponente] = useState(1);

  const agregarCarrito = () => {
    setTipoComponente(2);
    dispatch(addToCart(data));
  }

  const quitarCarrito = () => {
    setTipoComponente(1);
    dispatch(delFromCart(data.id, true));
  }

  const agregarCantidadProducto = () => {
    setCantidad(cantidad + 1);
    dispatch(addOneToProduct(data.id));
  }

  const disminuiCantidadProducto = () => {
    if(cantidad === 1){
      quitarCarrito();
    }else{
      setCantidad(cantidad - 1);
      dispatch(delFromCart(data.id));
    }
  }

  useEffect(() => {
    let existeProducto = cart.find((item) => item.id === data.id);
    if(existeProducto)
    {
      setCantidad(existeProducto.cantidad);
      setTipoComponente(2);
    }else{
      setTipoComponente(1);
      setCantidad(1);
    }
  }, [data, renderizarNuevamente, cart]);

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
            <p className="parrafoDisponibilidad">
              {data.disponibilidad_limitada ? 'Sujeto a disponiblidad' : ''}
            </p>
            <p className="parrafoCantidad">
              {data.cantidad_minima === "1.00" ? '' : `Unidad de aprox ${data.cantidad_minima} ${data.unidad.abreviatura}`}
            </p>
            <p>
              <span className="precioProducto">
                S/{data.precio_unitario} x {data.unidad.abreviatura}
              </span>
            {
              data.cantidad_minima !== "1.00" &&
              <span className="precioProducto">
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
            <p className="parrafoCantidad">
              {data.cantidad_minima === "1.00" ? '' : `Unidad de aprox ${data.cantidad_minima} ${data.unidad.abreviatura}`}
            </p>
            <p>
              <span className="precioProducto">
                S/{data.precio_unitario} x {data.unidad.abreviatura}
              </span>
            </p>
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
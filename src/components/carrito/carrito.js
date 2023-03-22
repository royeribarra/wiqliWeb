import React, { useEffect, useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMinus } from 'react-icons/ai';
import { HiPlus } from 'react-icons/hi';
import { Button } from "antd";
import { toastr } from "react-redux-toastr";
import { useNavigate } from "react-router-dom";
import {
  addOneToProduct,
  delFromCart,
  fillCart
} from "../../redux/actions/carritoActions";
import "./carrito.css";

function Carrito({showCarrito, setShowCarrito})
{
  let history = useNavigate();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { totalProductos, cart } = state.cart;

  const handleClose = () => setShowCarrito(false);

  const cargarCarritoFromLocalStorage = (productosStorage) => {
    dispatch(fillCart(productosStorage));
  };

  const agregarUnidadProducto = (id) => {
    dispatch(addOneToProduct(id));
  };

  const quitarUnidadProducto = (producto) => {
    if(producto.cantidad === 1){
      dispatch(delFromCart(producto.id, true));
    }else{
      dispatch(delFromCart(producto.id));
    }
  };

  const eliminarProducto = (id) => {
    dispatch(delFromCart(id, true));
  };

  const goToFormularioDatos = () => {
    if(totalProductos === 0){
      toastr.error("Debes agregar al menos un producto para pasar a la siguiente sección.");
      
    }else{
      localStorage.setItem('productos', JSON.stringify(cart));
      history(`/datos`);
    }
  }

  useEffect(()=> {
    if(localStorage.getItem("productos"))
    {
      let productosStorage = JSON.parse(localStorage.getItem("productos"));
      cargarCarritoFromLocalStorage(productosStorage);
    }
  }, []);

  return(
    <Offcanvas show={showCarrito} onHide={handleClose} scroll={true} backdrop={true}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Lista de productos</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="cartStyles">
            <div className="headCarrito">
              <p className="tituloCarrito">Producto</p>
              <p className="tituloCarrito">Precio</p>
              <p className="tituloCarrito">Cantidad</p>
              <p className="tituloCarrito">Subtotal</p>
            </div>
            <div>
            {
                cart.map((product)=>
                  <div className="bodyCarrito" key={product.id}>
                      <div className="cuerpoImagenCarrito">
                        <p className="textoCarrito">{product.nombre}</p>
                        <div className="imgCartDiv">
                          <img 
                            className="imgCart"
                            src={`${process.env.REACT_APP_BASE_PATH}/wiqli/`+product.imagen}
                            alt={`comprar ` + product.nombre} />
                        </div>
                      </div>

                      <div>
                        <p className="textoCarrito">
                          {parseFloat(product.precio_unitario * product.cantidad_minima).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="selectorCantidad">
                          <HiPlus onClick={()=> agregarUnidadProducto(product.id)} />
                            <div style={{ margin: "8px" }}>
                                <p>{product.cantidad}</p> 
                            </div>
                          <AiOutlineMinus onClick={()=> quitarUnidadProducto(product)} />
                      </div>
                      <div className="textoCarrito">
                        <p>{parseFloat(product.cantidad * product.precio_unitario * product.cantidad_minima).toFixed(2)}</p>
                      </div>
                  </div>
                  )
                }
            </div>
            <hr />
            <div>
              <div className="bodyCarrito">
                <div></div>
                <div></div>
                <div>Total</div>
                <div><p>{parseFloat(totalProductos).toFixed(2)}</p></div>
                
              </div>
              {
                totalProductos > 0 && 
                <div style={{ marginTop: "30px", display: "flex", justifyContent: "center"}}>
                <Button onClick={goToFormularioDatos} className='botonDeSiguiente letraWhite'>
                  Siguiente
                </Button>
              </div>
              }
              
            </div>
      </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Carrito;
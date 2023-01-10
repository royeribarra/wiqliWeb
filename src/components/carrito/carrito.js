import React, { useEffect, useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import {
  addOneToProduct,
  delFromCart,
  fillCart
} from "../../redux/actions/carritoActions";
import "./carrito.css";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiFillMinusCircle, AiFillPlusCircle, AiOutlineMinus } from 'react-icons/ai';
import { HiPlus } from 'react-icons/hi';
import { Button } from "antd";
import { toastr } from "react-redux-toastr";
import { useNavigate } from "react-router-dom";


function Carrito({showCarrito, setShowCarrito})
{
  let history = useNavigate();
  const state = useSelector((state) => state);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const { cart } = state.cart;

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
    if(total === 0){
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

  useEffect(()=> {
    let totalNew = 0;
    cart.forEach(product => {
      totalNew += product.precio_unitario * product.cantidad;
    });
    setTotal(totalNew)
  }, [cart]);

  return(
    <Offcanvas show={showCarrito} onHide={handleClose} scroll={true} backdrop={true}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Lista de productos</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div class="cartStyles">
            <div className="headCarrito">
              <p className="tituloCarrito">Producto</p>
              <p className="tituloCarrito">Precio</p>
              <p className="tituloCarrito">Cantidad</p>
              <p className="tituloCarrito">Subtotal</p>
            </div>
            <div>
            {
                cart.map((product)=>
                  <div className="bodyCarrito">
                      <div className="cuerpoImagenCarrito">
                        <p className="textoCarrito">{product.nombre}</p>
                        <div class="imgCartDiv">
                          <img 
                            className="imgCart"
                            src={`${process.env.REACT_APP_BASE_PATH}/wiqli/`+product.imagen}
                            alt={`comprar ` + product.nombre} />
                        </div>
                      </div>

                      <div>
                        <p class="textoCarrito">{product.precio_unitario}</p>
                      </div>
                      
                      <div class="selectorCantidad">
                          <HiPlus onClick={()=> agregarUnidadProducto(product.id)} />
                            <div style={{ margin: "8px" }}>
                                <p>{product.cantidad}</p> 
                            </div>
                          <AiOutlineMinus onClick={()=> quitarUnidadProducto(product)} />
                      </div>
                      <div class="textoCarrito">
                        <p>{parseFloat(product.cantidad * product.precio_unitario).toFixed(2)}</p>
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
                <div><p>{parseFloat(total).toFixed(2)}</p></div>
                
              </div>
              {
                total > 0 && 
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
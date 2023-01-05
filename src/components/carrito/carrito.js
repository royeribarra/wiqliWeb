import React, { useEffect } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import {
  addOneToProduct,
  delFromCart,
  fillCart
} from "../../redux/actions/carritoActions";
import "./carrito.css";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';

function Carrito({showCarrito, setShowCarrito})
{
  const state = useSelector((state) => state);
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
        <div class="cartStyles">
            <div className="headCarrito">
              <p className="tituloCarrito">Producto</p>
              <p className="tituloCarrito">Precio</p>
              <p className="tituloCarrito">Cantidad</p>
              <p className="tituloCarrito">Total</p>
            </div>


            <div className="bodyCarrito">

            {
                  cart.map((product)=>
                  <div>

                      <div class="imgCartDiv">
                        <img 
                          className="imgCart"
                          src={`${process.env.REACT_APP_BASE_PATH}/wiqli/`+product.imagen}
                          alt={`comprar ` + product.nombre} />
                        <h5 className="textoCarrito">{product.nombre}</h5>
                      </div>

                      <div >
                        <p class="textoCarrito">{product.precio_unitario}</p>
                      </div>
                      
                      <div class="selectorCantidad">
                          <AiFillPlusCircle onClick={()=> agregarUnidadProducto(product.id)} />
                            <div>
                                <p>{product.cantidad}</p> 
                            </div>
                          <AiFillMinusCircle onClick={()=> quitarUnidadProducto(product)} />
                      </div>
                      <div class="textoCarrito">
                        <p>{parseFloat(product.cantidad * product.precio_unitario).toFixed(2)}</p>
                      </div>
                  </div>
                  )
                }
                
            </div>

      </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Carrito;
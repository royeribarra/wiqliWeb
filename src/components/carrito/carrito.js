import React, { useEffect, useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { 
  addToCart, 
  addOneToProduct, 
  delFromCart, 
  clearCart,
  fillCart
} from "../../redux/actions/carritoActions";
import "./carrito.css";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';

function Carrito({showCarrito, setShowCarrito})
{
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { products, cart } = state.cart;

  const handleClose = () => setShowCarrito(false);

  const cargarCarritoFromLocalStorage = (productosStorage) => {
    dispatch(fillCart(productosStorage));
  };

  const verCarrito = () => {
    console.log(cart);
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
      {/* <button onClick={verCarrito}>ver carrito</button> */}
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Lista de productos</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div class="col-lg-12">
          <div class="shoping__cart__table">
            <table className="tablaCarrito">
              <thead className="headCarrito">
                <tr>
                  <th class="shoping__product tituloCarrito">Producto</th>
                  <th className="tituloCarrito">Precio</th>
                  <th className="tituloCarrito">Cantidad</th>
                  <th className="tituloCarrito">Total</th>
                  <th className="tituloCarrito">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {
                  cart.map((product)=>
                    <tr>
                      <td class="shoping__cart__item inputCarrito">
                        <img 
                          src={`${process.env.REACT_APP_BASE_PATH}/wiqli/`+product.imagen}
                          alt={`comprar ` + product.nombre} />
                        <h5 className="textoCarrito">{product.nombre}</h5>
                      </td>
                      <td class="shoping__cart__price inputCarrito textoCarrito">
                        {product.precio_unitario}
                      </td>
                      <td class="shoping__cart__quantity inputCarrito textoCarrito">
                        
                        <div class="quantity">
                          <AiFillPlusCircle onClick={()=> agregarUnidadProducto(product.id)} />
                            <div class="pro-qty">
                                <input type="text" value={product.cantidad} />
                            </div>
                          <AiFillMinusCircle onClick={()=> quitarUnidadProducto(product)} />
                        </div>
                        
                      </td>
                      <td class="shoping__cart__total inputCarrito textoCarrito">
                        {parseFloat(product.cantidad * product.precio_unitario).toFixed(2)}
                      </td>
                      <td class="shoping__cart__item__close inputCarrito textoCarrito">
                        <span class="icon_close"></span>
                        <AiFillDelete onClick={()=> eliminarProducto(product.id)} />
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
      </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Carrito;
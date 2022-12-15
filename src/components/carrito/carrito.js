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

  useEffect(()=> {
    // axios
    // .get(`${process.env.REACT_APP_BASE_PATH}/wiqli/productos/todos`)
    // .then(({ data }) => {
    //   dispatch(fillCart(productosStorage));
    // });

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
            <table>
              <thead>
                <tr>
                  <th class="shoping__product">Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {
                  cart.map((product)=>
                    <tr>
                      <td class="shoping__cart__item">
                        <img src="img/cart/cart-1.jpg" alt="" />
                        <h5>{product.nombre}</h5>
                      </td>
                      <td class="shoping__cart__price">
                        {product.precio_unitario}
                      </td>
                      <td class="shoping__cart__quantity">
                        
                        <div class="quantity">
                          <AiFillPlusCircle />
                            <div class="pro-qty">
                                <input type="text" value={product.cantidad} />
                            </div>
                          <AiFillMinusCircle />
                        </div>
                        
                      </td>
                      <td class="shoping__cart__total">
                        {parseFloat(product.cantidad * product.precio_unitario).toFixed(2)}
                      </td>
                      <td class="shoping__cart__item__close">
                        <span class="icon_close"></span>
                        <AiFillDelete />
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
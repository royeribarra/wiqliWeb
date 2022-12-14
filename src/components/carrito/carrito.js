import React, { useEffect, useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import "./carrito.css";

function Carrito({showCarrito, setShowCarrito})
{
  const handleClose = () => setShowCarrito(false);
  const [productosLocalStorage, setProductosLocalStorage] = useState([]);

  useEffect(()=> {
    if(localStorage.getItem("productos"))
    {
      let productosStorage = JSON.parse(localStorage.getItem("productos"));
      setProductosLocalStorage(productosStorage);
    }
    
  }, []);

  return(
    <Offcanvas show={showCarrito} onHide={handleClose} scroll={true} backdrop={true}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Lista de compras</Offcanvas.Title>
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  productosLocalStorage.map((producto)=>
                    <tr>
                      <td class="shoping__cart__item">
                        <img src="img/cart/cart-1.jpg" alt="" />
                        <h5>{producto.nombre}</h5>
                      </td>
                      <td class="shoping__cart__price">
                        {producto.precio_unitario}
                      </td>
                      <td class="shoping__cart__quantity">
                        <div class="quantity">
                            <div class="pro-qty">
                                <input type="text" value={producto.cantidad} />
                            </div>
                        </div>
                      </td>
                      <td class="shoping__cart__total">
                        {producto.cantidad * producto.precio_unitario}
                      </td>
                      <td class="shoping__cart__item__close">
                        <span class="icon_close"></span>
                      </td>
                    </tr>
                  )
                }
                {/* <tr>
                  <td class="shoping__cart__item">
                    <img src="img/cart/cart-1.jpg" alt="" />
                    <h5>Vegetable’s Package</h5>
                  </td>
                  <td class="shoping__cart__price">
                    $55.00
                  </td>
                  <td class="shoping__cart__quantity">
                    <div class="quantity">
                        <div class="pro-qty">
                            <input type="text" value="1" />
                        </div>
                    </div>
                  </td>
                  <td class="shoping__cart__total">
                    $110.00
                  </td>
                  <td class="shoping__cart__item__close">
                    <span class="icon_close"></span>
                  </td>
                </tr>
                <tr>
                  <td class="shoping__cart__item">
                    <img src="img/cart/cart-2.jpg" alt="" />
                    <h5>Fresh Garden Vegetable</h5>
                  </td>
                  <td class="shoping__cart__price">
                    $39.00
                  </td>
                  <td class="shoping__cart__quantity">
                    <div class="quantity">
                        <div class="pro-qty">
                            <input type="text" value="1" />
                        </div>
                    </div>
                  </td>
                  <td class="shoping__cart__total">
                    $39.99
                  </td>
                  <td class="shoping__cart__item__close">
                    <span class="icon_close"></span>
                  </td>
                </tr>
                <tr>
                  <td class="shoping__cart__item">
                    <img src="img/cart/cart-3.jpg" alt="" />
                    <h5>Organic Bananas</h5>
                  </td>
                  <td class="shoping__cart__price">
                    $69.00
                  </td>
                  <td class="shoping__cart__quantity">
                    <div class="quantity">
                        <div class="pro-qty">
                            <input type="text" value="1" />
                        </div>
                    </div>
                  </td>
                  <td class="shoping__cart__total">
                    $69.99
                  </td>
                  <td class="shoping__cart__item__close">
                    <span class="icon_close"></span>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
      </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Carrito;
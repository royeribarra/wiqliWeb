import Card from 'antd/lib/card/Card';
import React from 'react';
import quitar from "../../images/quitar.png"
import './productList';


function ProductoAdicional() 
{
  return (
    <div>
        <h3>Productos adicionales</h3>
        <Card className="descripcionProducto descripcionProductoAdicional">
          <div className="datosProducto nuevoProductoAdicional">
            <h5>Kiwi</h5>
            <p>1kg</p>
            <div className="eliminarProductoAgregado">
                  <div className="botonBorrarProductoAgregado" >
                  <img
                    src={quitar}
                    alt="eliminar producto carrito otro"
                  />
                  <p className="botonAgregarMasProductos">Quitar</p>
                  </div>
            </div>
          </div>
          </Card>
    </div>
  );
}
  
export default ProductoAdicional;
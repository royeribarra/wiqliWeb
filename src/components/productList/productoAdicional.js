import Card from 'antd/lib/card/Card';
import React from 'react';
import { useDispatch } from 'react-redux';
import quitar from "../../images/quitar.png"
import { SdelFromExtra } from '../../redux/actions/suscripcionActions';
import './productList';


function ProductoAdicional({ 
  id, nombre, cantidad, tipo, eliminarProductoStorage, tipoLista
}) 
{
  const dispatch = useDispatch();
  const quitarProducto = () => {
    if(tipoLista === 2)
    {
      dispatch(SdelFromExtra(id));
    }
    eliminarProductoStorage(id, tipo);
  }
  
  return (
    <div>
      <Card className="descripcionProductoAdicional descripcionProductoAgregadoAdicional">
        <div className="datosProducto nuevoProductoAdicional">
          <h5>{nombre}</h5>
          <p>{cantidad}</p>
          <div className="eliminarProductoAgregado" onClick={quitarProducto}>
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
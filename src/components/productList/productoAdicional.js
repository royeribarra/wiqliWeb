import Card from 'antd/lib/card/Card';
import React from 'react';
import { Container } from "react-bootstrap"
import './productList';


function ProductoAdicional() 
{
  return (
    <div className="gradienteMedio">
      <div className="baseMorada">
        <Container className="contenedorSimple">
        <h3>Productos adicionales</h3>
        <Card className="descripcionProducto descripcionProductoAdicional">
          <div className="datosProducto productoAdicional">
            <h5>Kiwi</h5>
            <p>1kg</p>
            <p>Precio por definir</p>
          </div>
          </Card>
        </Container>
      </div>
    </div>
  );
}
  
export default ProductoAdicional;
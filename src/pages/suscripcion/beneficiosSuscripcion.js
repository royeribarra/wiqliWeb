import React from 'react';
import { Container } from "react-bootstrap";
import logo from "../../images/logo.png"

function BeneficiosSuscripcion() 
{
  return (
    <div className="gradienteMedio">
    
        <Container className="contenedorSimple">
          
            <h2 className="tituloResaltante">¡Beneficios de ser suscriptor!</h2>
            <h5 className="tituloEnunciativo">Tener los productos de primera clase.</h5>
            <p className="textoDisclaimer">Recuerda que podría haber una mínima variación final en el precio según el peso de los productos vendidos por unidad al peso.</p>
            <p className="textoDisclaimer">El pago del pedido se realizará cuando este sea entregado y
             con cualquier medio de pago</p>
            <h3 className="mensajeFinalDestacado">Estaremos aquí para todas tus compras semanales</h3>
            <h3 className="mensajeFinalDestacado">A partir de ahora, solo planea tu</h3>
            <img
              src={logo}
              className="logoDestacado"
              alt="logo wiqli"
            />
        </Container>

    </div>

  );
}
  
export default BeneficiosSuscripcion;
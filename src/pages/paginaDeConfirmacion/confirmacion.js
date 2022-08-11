import React, { useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import './confirmacion.css';
import logo from "../../images/logo.png"


function Confirmacion() 
{


  return (
    <div className="gradienteMedio">
    
        <Container className="contenedorSimple">
          
            <h2 className="tituloResaltante">¡Muchas gracias por la confianza!</h2>
            <h5 className="tituloEnunciativo">Te enviaremos un correo con la confirmación y el detalle de tu pedido.</h5>
            <p className="textoDisclaimer">Recuerda que podría haber una mínima variación final en el precio según el peso de los productos vendidos por unidad al peso.</p>
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
  
export default Confirmacion;
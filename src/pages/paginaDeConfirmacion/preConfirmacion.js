import React from 'react';
import { Container } from "react-bootstrap";
import './confirmacion.css';
import logo from "../../images/logo.png"


function PreConfirmacion() 
{
  return (
    <div className="gradienteMedio">
    
        <Container className="contenedorSimple">
          
            <h2 className="tituloResaltante">¡Muchas gracias por registrarte en Wiqli!</h2>
            <h5 className="tituloEnunciativo">Te enviaremos un link de confirmación a tu correo.</h5>
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
  
export default PreConfirmacion;
import React from 'react';
import { Container } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

import logo from "../../images/logo.png"

function ConfirmacionSuscripcion() 
{
  return (
    <div className="gradienteMedio">
      <Container className="contenedorSimple">
        <h2 className="tituloResaltante">¡Tu suscripción se realizó con éxito!</h2>
        <h5>Te enviamos un correo con la información y el detalle de tu suscripción.</h5>
        
        <h5 className="tituloEnunciativo">¡Recuerda!</h5>
        <p className="textoDisclaimer">
          1. Te notificaremos a tu correo electrónico, para que puedas validar la lista de productos que te enviaremos.
        </p>
        <p className="textoDisclaimer">
          2. En caso desees modificar la lista de productos, podrás hacerlo desde tu cuenta o desde el siguiente enlace: 
          <NavLink to="/editar-suscripcion" style={{ color: "black"}}><u> modificar lista</u></NavLink>
        </p>
        <p className="textoDisclaimer">
          3. Se realizará el cobro de tu tarjeta un día antes del día de entrega de tus productos.
        </p>
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
  
export default ConfirmacionSuscripcion;
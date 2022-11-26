import React, { useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import './confirmacion.css';
import logo from "../../images/logo.png"
import { useParams, useNavigate } from 'react-router-dom';
import { RegistroService } from '../../servicios/registerService';

function ConfirmacionCorreo() 
{
  const registroService = new RegistroService();
  let history = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const params = useParams();

  

  useEffect(() => {
    if (params.codigo) {
      registroService.verificarCorreo(params.codigo).then(({data})=> {
        if(data.state === 200){
          setConfirmed(true);
        }
      });
    }
  }, [] );

  return (
    <div className="gradienteMedio">
      <Container className="contenedorSimple">
        <h2 className="tituloResaltante">¡Gracias por confirmar tu correo en Wiqli!</h2>
        <h5 className="tituloEnunciativo">Ahora puedes usar tu cuenta.</h5>
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
  
export default ConfirmacionCorreo;
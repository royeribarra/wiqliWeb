import React from 'react';
import { Container } from "react-bootstrap";
import { Outlet } from 'react-router-dom';
import "./suscripcion.css";


function Suscripcion({tipo}) 
{
  return (
    <div className="baseWiqliForm">
      <Container className="contenedorSimple">
        <Outlet />
      </Container>
    </div>
  );
}
  
export default Suscripcion;
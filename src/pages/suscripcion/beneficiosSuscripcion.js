import React from 'react';
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Button } from 'antd';
import logo from "../../images/logo.png"

function BeneficiosSuscripcion() 
{
  return (
    <div>
      <h2 className="tituloPrincipal">Suscríbete y obtén beneficios exclusivos.</h2>
      <ul>
        <li>Olvídate de las compras.</li>
        <li>Solo actualiza tu pedido.</li>
        <li>Calidad premium.</li>
        <li>Productos frescos.</li>
        <li>Garantía máxima (si algo no te gustó te lo cambiamos).</li>
        <li>Flexibilidad: cada domingo te recordamos tu pedido por si quieres modificarlo.</li>
        <li>Regalo: Muestras de nuevos productos.</li>
      </ul>
      
      <NavLink to="/crear-suscripcion/seleccion-productos">
        <Button type="primary" className="botonCopiado btnEditar">
          ¡Empezar!
        </Button>
      </NavLink>
    </div>
  );
}
  
export default BeneficiosSuscripcion;
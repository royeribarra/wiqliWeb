import React from 'react';
import { NavLink } from "react-router-dom";
import { Button } from 'antd';

function BeneficiosSuscripcion({suscripcion}) 
{
  return (
    <div>
      {
        suscripcion === 1 &&
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
      }
      {
        suscripcion === 2 &&
        <div>
          <h2 className="tituloPrincipal">¿Deseas editar tu lista de pedido?</h2>
          <p>¡Recuerda!</p>
          <p>Si tienes cualquier duda, puedes contactarnos o escribirnos, estaremos encantados de ayudarte.</p>
          <p>¿Qué deseas cambiar?</p>
          <div>
            <NavLink to="/editar-suscripcion/seleccion-productos">
              <Button type="primary" className="botonCopiado btnEditar">
                Mis productos
              </Button>
            </NavLink>
          </div>
          <div>
            <NavLink to="/editar-suscripcion/seleccion-periodo">
              <Button type="primary" className="botonCopiado btnEditar">
                La recurrencia
              </Button>
            </NavLink>
          </div>
          <div>
            <NavLink to="/editar-suscripcion/metodo-pago">
              <Button type="primary" className="botonCopiado btnEditar">
                Datos de pago
              </Button>
            </NavLink>
          </div>
        </div>
      }
    </div>
  );
}
  
export default BeneficiosSuscripcion;
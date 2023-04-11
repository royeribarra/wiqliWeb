import React from 'react';
import { NavLink } from "react-router-dom";
import { Button } from 'antd';
import "./suscripcion.css";

import compras from "../../images/compras.svg";
import actualiza from "../../images/actualiza.svg";
import premium from "../../images/premium.svg";
import fresco from "../../images/fresco.svg";
import cambio from "../../images/cambio.svg";
import flexible from "../../images/flexible.svg";
import regalo from "../../images/regalo.svg";
import adaptabilidad from "../../images/adaptabilidad.svg";

function BeneficiosSuscripcion({suscripcion}) 
{
  return (
    <div>
      {
        suscripcion === 1 &&
        <div>
          <h2 className="tituloPrincipal">Suscríbete y obtén beneficios exclusivos.</h2>
          <div className='beneficiosSuscripcion'>
            <div clasname="beneficioSuscripcion">
            <img
            src={compras}
            height="50"
            className="imgBeneficio"
            alt="Beneficios Wiqli"
            />
            <p className='textoBeneficioSuscripcion'>Olvídate de las compras.</p>
            </div>

            <div clasname="beneficioSuscripcion">
            <img
            src={actualiza}
            height="50"
            className="imgBeneficio"
            alt="Beneficios Wiqli"
            />
            <p className='textoBeneficioSuscripcion'>Solo actualiza tu pedido.</p>
            </div>

            <div clasname="beneficioSuscripcion">
            <img
            src={premium}
            height="50"
            className="imgBeneficio"
            alt="Beneficios Wiqli"
            />
            <p className='textoBeneficioSuscripcion'>Calidad premium.</p>
            </div>

            <div clasname="beneficioSuscripcion">
            <img
            src={fresco}
            height="50"
            className="imgBeneficio"
            alt="Beneficios Wiqli"
            />
            <p className='textoBeneficioSuscripcion'>Productos aún más frescos.</p>
            </div>

            <div clasname="beneficioSuscripcion">
            <img
            src={cambio}
            height="50"
            className="imgBeneficio"
            alt="Beneficios Wiqli"
            />
            <p className='textoBeneficioSuscripcion'>Garantía máxima (si no es premium lo cambiamos).</p>
            </div>

            <div clasname="beneficioSuscripcion">
            <img
            src={flexible}
            height="50"
            className="imgBeneficio"
            alt="Beneficios Wiqli"
            />
            <p className='textoBeneficioSuscripcion'>Flexibilidad (Cambia tu pedido cuando quieras).</p>
            </div>

            <div clasname="beneficioSuscripcion">
            <img
            src={regalo}
            height="50"
            className="imgBeneficio"
            alt="Beneficios Wiqli"
            />
            <p className='textoBeneficioSuscripcion'>Regalos y muestras de nuevos productos.</p>
            </div>

            <div clasname="beneficioSuscripcion">
            <img
            src={adaptabilidad}
            height="50"
            className="imgBeneficio"
            alt="Beneficios Wiqli"
            />
            <p className='textoBeneficioSuscripcion'>Adaptabilidad (programa tu propia recurrencia)</p>
            </div>

          </div>
          
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
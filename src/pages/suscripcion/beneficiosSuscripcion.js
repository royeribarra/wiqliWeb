import React from 'react';
import { Container } from "react-bootstrap";
import logo from "../../images/logo.png"

function BeneficiosSuscripcion() 
{
  return (
    <div className="gradienteMedio">
    
        <Container className="contenedorSimple">
          
            <h2 className="tituloResaltante">¡Beneficios de ser suscriptor!</h2>

            <p>Olvídate de las compras.</p>
            <p>Solo actualiza tu pedido.</p>
            <p>Calidad premium.</p>
            <p>Productos frescos.</p>
            <p>Garantía máxima (si algo no te gustó te lo cambiamos).</p>
            <p>Flexibilidad.</p>
            <p>5% de descuento en categoría carnes.</p>
            <p>Regalo: Muestras de nuevos productos.</p>
            
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
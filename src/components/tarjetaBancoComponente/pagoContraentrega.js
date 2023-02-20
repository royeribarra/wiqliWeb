import React from "react";
import miniCash from '../../images/miniCash.png';
import miniPlin from '../../images/miniPlin.png';
import miniYape from '../../images/miniYape.png';

function PagoContraentrega()
{
  return(
    <div className="imagenesEleccionPago">
      <img className="imagenEleccionPago" alt='Pago en cash Wiqli'src={miniCash}></img>
      <img className="imagenEleccionPago" alt='Pago con Plin Wiqli'src={miniPlin}></img>
      <img className="imagenEleccionPago" alt='Pago con Yape Wiqli'src={miniYape}></img>
    </div>
  );
}

export default PagoContraentrega;
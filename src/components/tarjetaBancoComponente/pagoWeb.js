import React from "react";
import miniAmex from '../../images/miniAmex.png';
import miniMastercard from '../../images/miniMastercard.png';
import miniVisa from '../../images/miniVisa.png';

function PagoWeb()
{
  return(
    <div className="imagenesEleccionPago">
      <img className="imagenEleccionPago" alt='Pago con Visa Wiqli'src={miniVisa}></img>
      <img className="imagenEleccionPago" alt='Pago con Mastercard Wiqli'src={miniMastercard}></img>
      <img className="imagenEleccionPago" alt='Pago con American Express Wiqli'src={miniAmex}></img>
    </div>
  );
}

export default PagoWeb;
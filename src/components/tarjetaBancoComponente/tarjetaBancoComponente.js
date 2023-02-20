import React from "react";
import Jcb from '../../assets/images/jcb.svg';
import DinnersClub from '../../assets/images/dinners-club.svg';
import MasterCard from '../../assets/images/master-card.svg';
import Visa from '../../assets/images/visa.svg';
import AmericanExpress from '../../assets/images/symbol.svg';
import Discover from '../../assets/images/symbols.svg';
import "./tarjetaBancoComponente.css";

function TarjetaBancoComponente({ tipoBanco })
{
  return(
    <div className="contenedorTarjetasAceptadas ">
      <div className="tarjetasAceptadas">
        <img 
          src={Jcb} 
          className={tipoBanco === "JCB" ? "opacidad-normal tarjetaUsada" : "opacidad-aplicada tarjetaUsada"} 
          alt="JCB"
        />
        <img 
          src={DinnersClub} 
          className={tipoBanco === "DINERS" ? "opacidad-normal tarjetaUsada" : "opacidad-aplicada tarjetaUsada"} 
          alt='DINERS'
        />
        <img 
          src={MasterCard} 
          className={tipoBanco === "MASTERCARD" ? "opacidad-normal tarjetaUsada" : "opacidad-aplicada tarjetaUsada"} 
          alt="MASTERCARD"
        />
        <img 
          src={Visa} 
          className={tipoBanco === "VISA" ? "opacidad-normal tarjetaUsada" : "opacidad-aplicada tarjetaUsada"} 
          alt="VISA"  
        />
        <img 
          src={Discover} 
          className={tipoBanco === "DISCOVER" ? "opacidad-normal tarjetaUsada" : "opacidad-aplicada tarjetaUsada"} 
          alt="DISCOVER"
        />
        <img 
          src={AmericanExpress} 
          className={tipoBanco === "AMEX" ? "opacidad-normal tarjetaUsada" : "opacidad-aplicada tarjetaUsada"} 
          alt="AMEX"
        />
      </div>
    </div>
  );
}

export default TarjetaBancoComponente;
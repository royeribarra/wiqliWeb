import React from "react";
import { useSelector } from "react-redux";
import "./resumen.css";

function Resumen({
  aplicaCupon
})
{
  const state = useSelector((state) => state);
  const { total, delivery, totalProductos, descuento } = state.cart;
  const { infoUser } = state.user;
  return(
    <div className="desgloseTotal">
      <div className="totalesAPagar">
        <h6 className="tituloCampo">Productos</h6>
        <h6 className="datoCampo">S/ {parseFloat(totalProductos).toFixed(2)}</h6>
      </div>
      <div className="totalesAPagar">
        <h6 className="tituloCampo">Delivery</h6>
        <h6 className="datoCampo">S/ {parseFloat(delivery).toFixed(2)}</h6>
      </div>
      {
        infoUser.billetera.saldo > 0 &&
          <div className="totalesAPagar" >
            <h6 className="tituloCampo">Billetera</h6>
            <h6 className="datoCampo">- S/ {parseFloat(infoUser.billetera.saldo).toFixed(2)}</h6>
          </div>
      }
      {
        aplicaCupon && 
          <div className="totalesAPagar" >
            <h6 className="tituloCampo">Descuento</h6>
            <h6 className="datoCampo">- S/ {parseFloat(descuento).toFixed(2)}</h6>
          </div>
      }
      <hr></hr>
      <div className="totalesAPagar">
        <h6 className="tituloCampo">Total</h6>
        <h6 className="datoCampo">
          S/ {parseFloat(totalProductos + delivery).toFixed(2)}
        </h6>
      </div>
    </div>
  );
}

export default Resumen;
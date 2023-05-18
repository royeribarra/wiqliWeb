import React from "react";
import { PayUService } from "../../servicios/payUService";
import { Button } from "antd";

function PayU() {
    const payUService = new PayUService();

    const verMetodos = () =>{
        payUService.verMetodosDePago().then(response => {
            const paymentMethods = response.data;
            console.log('Medios de pago:', paymentMethods);
        })
        .catch(error => {
            console.log('Error al consultar los medios de pago:', error);
        });
    }
  return (
      <div className="loaderContainer">
        <Button onClick={verMetodos}>
            Ver Metodo de pago
        </Button>
        <p>Probando metodos de pago de PayU</p>
      </div>
  );
}

export default PayU;
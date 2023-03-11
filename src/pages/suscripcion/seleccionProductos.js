import React, { useState } from "react";
import { MdProductionQuantityLimits } from 'react-icons/md';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { FaAmazonPay } from 'react-icons/fa';
import { Affix, Select, Steps } from "antd";
import 'antd/lib/steps/style/css';
import ListaProductosSuscripcion from "./listaProductosSuscripcion";
import carrito from "../../images/carritoCompras.png"
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { NavLink, useNavigate } from "react-router-dom";
import siguiente from "../../images/siguiente.png";

const { Option } = Select;
const { Step } = Steps;

function SeleccionProductos()
{
  let history = useNavigate();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { totalProductos } = state.suscripcion;

  const goToSelectDate = () => {
    if(totalProductos === 0){
      toastr.error("Debes agregar al menos un producto para pasar a la siguiente sección.");
      
    }else{
      history(`/crear-suscripcion/seleccion-periodo`);
    }
  }

  return (
    <div>
      <Steps
        responsive={false}
        items={[
          {
            title: 
              <NavLink to="/crear-suscripcion/seleccion-productos">
              <p style={{color: "black", fontSize: "14px"}}>Productos</p>
              </NavLink>,
            status: 'process',
            icon: <NavLink to="/crear-suscripcion/seleccion-productos"><MdProductionQuantityLimits /></NavLink>
          },
          {
            title: 
              <NavLink to="/crear-suscripcion/seleccion-periodo">
              <p style={{color: "black", fontSize: "14px"}}>Recurrencia</p>
              </NavLink>,
            status: 'wait',
            icon: <NavLink to="/crear-suscripcion/seleccion-periodo"><AiOutlineFieldTime /></NavLink>
          },
          {
            title: 
              <NavLink to="/crear-suscripcion/metodo-pago">
              <p style={{color: "black", fontSize: "14px"}}>Pago</p>
              </NavLink>,
            status: 'wait',
            icon: <NavLink to="/crear-suscripcion/metodo-pago"><FaAmazonPay /></NavLink>
          },
        ]}
      />
      {/* <Steps current={2} responsive={false}>
        <Step title="" status="process" />
        <Step title="" status="process" />
        <Step title="" status="wait" />
      </Steps> */}
      <div className='listaDeProductos'>
        <h5>Elige los productos que deseas recibir en cada periodo.</h5>
        <ListaProductosSuscripcion />
      </div>
      <Affix offsetBottom={40} onChange={(affixed) => console.log(affixed)}>
        <div className='contenedorBotones'>
          <div className='botonDeSiguiente'>
            <div className='botonOrdenado'>
              <img
                src={carrito}
                height="30"
                className="logoNav"
                alt="wiqli"
                style={{ cursor:"pointer" }}
              />
              <p className='textoDePrecio'>S/ {parseFloat(totalProductos).toFixed(2)}</p>
            </div>
          </div>
          <div className='botonDeSiguiente' onClick={goToSelectDate} style={{ cursor:"pointer" }}>
            <div className='botonOrdenado'>
              <div className='clickASiguiente'>
                <p className='textoDePrecio'>Siguiente</p>
                <img 
                  src={siguiente}
                  alt="wiqli compras semanales"
                />
              </div>
            </div>
          </div>
        </div>
      </Affix>
    </div>
  );
}

export default SeleccionProductos;
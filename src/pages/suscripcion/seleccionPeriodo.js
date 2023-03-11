import React, { useState } from "react";
import { Radio, Select, Steps } from "antd";
import { Container } from "react-bootstrap";
import { MdProductionQuantityLimits } from 'react-icons/md';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { FaAmazonPay } from 'react-icons/fa';
import 'antd/lib/steps/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/radio/style/css';
import siguiente from "../../images/siguiente.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SsetDiaRecojo, SsetPeriodo } from "../../redux/actions/suscripcionActions";

const { Option } = Select;

function SeleccionPeriodo()
{
  let history = useNavigate();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { diaRecojo, periodo } = state.suscripcion;

  const onChangeDiaRecojo = ({ target: { value } }) => {
    dispatch(SsetDiaRecojo(value));
  };

  const onChangePeriodo = (e) => {
    dispatch(SsetPeriodo(e));
  };

  const goToPago = () => {
    history(`/crear-suscripcion/metodo-pago`);
  };

  return (
    <div>
      <Steps
        responsive={false}
        items={[
          {
            title: 
              <NavLink to="/crear-suscripcion/seleccion-productos">
              <p style={{color: "black", fontSize: "12px"}}>Productos</p>
              </NavLink>,
            status: 'finish',
            icon: <NavLink to="/crear-suscripcion/seleccion-productos"><MdProductionQuantityLimits /></NavLink>
          },
          {
            title: 
              <NavLink to="/crear-suscripcion/seleccion-periodo">
              <p style={{color: "black", fontSize: "12px"}}>Recurrencia</p>
              </NavLink>,
            status: 'process',
            icon: <NavLink to="/crear-suscripcion/seleccion-periodo"><AiOutlineFieldTime /></NavLink>
          },
          {
            title: 
              <NavLink to="/crear-suscripcion/metodo-pago">
              <p style={{color: "black", fontSize: "12px"}}>Pago</p>
              </NavLink>,
            status: 'wait',
            icon: <NavLink to="/crear-suscripcion/metodo-pago"><FaAmazonPay /></NavLink>
          },
        ]}
      />
      <h5 className="tituloEnunciativo">Enviar pedido cada:</h5>
      <div style={{ margin: "10px 0px", paddingBottom: "5px", display: "flex", justifyContent: "center"}}>
        <div style={{margin: "5px"}}>
          <Select aria-label="Default select example" defaultValue={periodo} onChange={onChangePeriodo}>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
            <Option value={3}>4</Option>
          </Select>
        </div>
        <div style={{margin: "5px", fontSize: "18px"}}>
          <p>Semanas</p>
        </div>
      </div>
      <h6 className="tituloEnunciativo">Quiero recibir mi pedido el día:</h6>
      <div style={{ margin: "10px 0px", paddingTop: "5px"}}>
      
        <Radio.Group onChange={onChangeDiaRecojo} defaultValue={diaRecojo}>
          <Radio value={1}>Martes</Radio>
          <Radio value={2}>Miércoles</Radio>
        </Radio.Group>
      </div>
      <div className='contenedorBotones'>
        <div className='botonDeSiguiente' onClick={goToPago} style={{ cursor:"pointer" }}>
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
    </div>
  );
}

export default SeleccionPeriodo;
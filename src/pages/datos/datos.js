import React, { useState } from "react";
import { Container } from "react-bootstrap"
import { Spin } from 'antd';
import atras from "../../images/atras.png";
import './datos.css';
import { NavLink } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../components/loader/loader";
import FormDatos from "./formDatos";

function Datos() 
{
  const [blockPage, setBlockPage] = useState(false);
  
  return (
    <Spin spinning={blockPage}>
      <div className="baseWiqliForm">
        <Container>
          <div className={ blockPage ? "" : "loaderInvisible"}>
            <Loader></Loader>
          </div>
          <div className="cabeceraDatos">
            <NavLink to="/" >
                <img 
                src={atras}
                alt="compra en Wiqli con la mejor calidad y precio"
                />
            </NavLink>
            <h4>Datos de entrega</h4>
          </div>
          <FormDatos setBlockPage={setBlockPage} />
        </Container>
      </div>
    </Spin>
  );
}
  
export default Datos;
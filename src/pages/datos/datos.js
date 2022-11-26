import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import { Form, Input, Button, Spin } from 'antd';
import atras from "../../images/atras.png";
import './datos.css';
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../components/loader/loader";
import subDays from "date-fns/subDays";
import { toastr } from "react-redux-toastr";
import FormDatos from "./formDatos";

function Datos() 
{
  const [form] = Form.useForm();
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
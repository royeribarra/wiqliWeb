import React, { useState, useRef } from 'react';
import { Container, Nav } from "react-bootstrap";
import { Form, Input, Button, Radio, Space, Tour } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from "../../components/loader/loader";
import { toastr } from 'react-redux-toastr';
import DatePicker from "react-datepicker";
import Cleave from 'cleave.js/react';

import Jcb from '../../assets/images/jcb.svg';
import DinnersClub from '../../assets/images/dinners-club.svg';
import MasterCard from '../../assets/images/master-card.svg';
import Visa from '../../assets/images/visa.svg';
import AmericanExpress from '../../assets/images/symbol.svg';
import Discover from '../../assets/images/symbols.svg';
import { SuscripcionService } from '../../servicios/suscripcionservice';
import { showLoader } from '../../redux/actions/loaderActions';
import { useDispatch } from 'react-redux';
import { EllipsisOutlined } from '@ant-design/icons';
import ListaProductosSuscripcion from './listaProductosSuscripcion';
import "./suscripcion.css";


function CreacionSuscripcion() 
{
  let history = useNavigate();
  const dispatch = useDispatch();
  const suscripcionService = new SuscripcionService();
  
  const [form] = Form.useForm();
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [messageError, setMessageError] = useState();
  const [fechaVencimientoTarjeta, setFechaVencimientoTarjeta] = useState(new Date());
  const [tipoBanco, setTipoBanco] = useState();
  const [openTourSuscripcion, setOpenTourSuscripcion] = useState(false);
  
  const steps = [
    {
      title: 'Elige tu pedido base',
      placement: 'bottom',
      description: <div className='listaDeProductosSuscripcion'><ListaProductosSuscripcion /></div>,
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: 'Selecciona tu día de entrega',
      description: 'Save your changes.',
      placement: 'bottom',
      target: () => ref2.current,
    },
    {
      title: 'Bríndanos tu información',
      description: 'Click to see other actions.',
      placement: 'bottom',
      target: () => ref3.current,
    },
  ];

  const onChangeBank = (type) => {
    setTipoBanco(type.toUpperCase());
    form.setFieldsValue({
      tipoBanco: type.toUpperCase()
    });
  }

  const onFinish = (values) => {
    //dispatch(showLoader());
    let datos = {
      ...values,
      metodoPago: tipoBanco
    };
    //setBlockPage(true);
    try {
      suscripcionService.crearSuscripcion(datos).then(({data})=> {
        console.log(data);
        toastr.success(data.message)
        dispatch(showLoader(false));
      });
    } catch (error) {
      toastr.error("Hubo un error, comunícate con Wiqli, por favor.");
      dispatch(showLoader(false));
    }
  };

  const goToSelectPeriod = () => {
    history('crear-suscripcion/seleccionar-periodo')
  };

  return (
    <div className="baseWiqliForm">
      <Container className="contenedorSimple">
        <Outlet />
      </Container>
    </div>
  );
}
  
export default CreacionSuscripcion;
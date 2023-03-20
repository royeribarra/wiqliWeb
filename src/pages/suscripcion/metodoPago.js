import React, { useState, useEffect } from "react";
import { Form, Select, Steps, Input, Button } from "antd";
import { MdProductionQuantityLimits } from 'react-icons/md';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { FaAmazonPay } from 'react-icons/fa';
import TarjetaBancoComponente from "../../components/tarjetaBancoComponente/tarjetaBancoComponente";
import Cleave from 'cleave.js/react';
import DatePicker from "react-datepicker";
import siguiente from "../../images/siguiente.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SuscripcionService } from "../../servicios/suscripcionservice";
import { SclearCart, SclearExtra } from "../../redux/actions/suscripcionActions";
import { showLoader } from "../../redux/actions/loaderActions";
import { UsuarioService } from "../../servicios/usuarioService";
import StorageService from "../../servicios/storageService";
import { setInfoCliente } from "../../redux/actions/clienteLogAction";
import { toastr } from "react-redux-toastr";

const { Option } = Select;

function MetodoPago({suscripcion})
{
  const suscripcionService = new SuscripcionService();
  const storageService = new StorageService();
  const usuarioService = new UsuarioService();
  const state = useSelector((state) => state);
  let history = useNavigate();
  const dispatch = useDispatch();
  const { xtraSubCart, subCart, totalProductos, diaRecojo, periodo } = state.suscripcion;
  const [form] = Form.useForm();
  const [tipoBanco, setTipoBanco] = useState();
  const [messageError, setMessageError] = useState("");
  const [suscripcionId, setSuscripcionId] = useState(false);
  const [fechaVencimientoTarjeta, setFechaVencimientoTarjeta] = useState(new Date());

  const onChangeBank = (type) => {
    setTipoBanco(type.toUpperCase());
    form.setFieldsValue({
      tipoBanco: type.toUpperCase()
    });
  }

  const onFinish = (values) => {
    dispatch(showLoader());
    let data = {
      ...values,
      productos: subCart,
      productosExtra: xtraSubCart,
      totalProductos: totalProductos,
      diaRecojo: diaRecojo,
      periodo: periodo,
      suscripcionId: suscripcionId,
      datosTarjeta: {
        numeroTarjeta: values.numeroTarjeta,
        fechaVencimiento: values.fechaVencimiento,
        cvv: values.cvv,
        nombreTarjeta: values.nombreTarjeta,
        tipoBanco: values.tipoBanco,
        dni: values.dni
      }
    }
    let query = suscripcion === 1 ? 
      suscripcionService.crearSuscripcion(data) : 
      suscripcionService.editarDatosTarjetaSuscripcion(data);

    query.then(({data})=> {
      if(data.state){
        toastr.success(data.message);
      }
      if(!data.state){
        setMessageError(data.message);
      }
    }).then(()=> {
      usuarioService.getInfoUser().then(({data})=> {
        dispatch(setInfoCliente(data));
      });
    }).then(()=> {
      dispatch(showLoader(false));
      if(suscripcion === 1)
      {
        history(`/confirmacion-suscripcion`);
      }
      if(suscripcion ===2)
      {
        history(`/editar-suscripcion`);
      }

      
    })
    .catch(error => {
      dispatch(showLoader(false));
      setMessageError("Ocurrió un error en el servidor, por favor comunícate con Wiqli.");
    });
  };

  const crearSuscripcion = () => {
  };

  const editarSuscripcion = () => {

  };

  useEffect(()=> {
    form.resetFields();
  }, []);

  useEffect(()=> {
    usuarioService.getProductosSuscripcion().then(({data})=> {
      setSuscripcionId(data.id)
    });
  }, []);

  return (
    <div>
      {
        suscripcion === 1 &&
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
              ,
            },
            {
              title: 
                <NavLink to="/crear-suscripcion/seleccion-periodo">
                <p style={{color: "black", fontSize: "12px"}}>Recurrencia</p>
                </NavLink>,
              status: 'finish',
              icon: <NavLink to="/crear-suscripcion/seleccion-periodo"><AiOutlineFieldTime /></NavLink>
            },
            {
              title: 
                <NavLink to="/crear-suscripcion/metodo-pago">
                <p style={{color: "black", fontSize: "12px"}}>Pago</p>
                </NavLink>,
              status: 'process',
              icon: <NavLink to="/crear-suscripcion/metodo-pago"><FaAmazonPay /></NavLink>
            },
          ]}
        />
      }
      {
        suscripcion === 2 &&
        <h4><u>Modifica los datos de tu tarjeta</u></h4>
      }
      <h5 className="tituloEnunciativo">Ingresa tu tarjeta para la suscripción</h5>
          
      <div className="contenedorPagos contenedorMiniSeccion">
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          scrollToFirstError
        >
          <div className="pasarelaDePago">
            <div className="inputDataPago">
              <Form.Item 
                label="Dni" 
                name="dni"
                rules={[{ required: true, message: 'Por favor ingresa tu número de DNI.' }]} 
              >
                <Input className="form-control" placeholder="Ejm. 70019407" minLength={8} maxLength={8} />
              </Form.Item>
              <Form.Item 
                label="Número de tarjeta" 
                name="numeroTarjeta"
                rules={[{ required: true, message: 'Por favor ingresa el número de tarjeta' }]} 
              >
                <Cleave
                  className='ant-input'
                  placeholder="4111 1111 1111 1111"
                  options={{creditCard: true, onCreditCardTypeChanged: (type) => onChangeBank(type) }}
                />
              </Form.Item>
              <Form.Item 
                label="" 
                name="tipoBanco"
                hidden={true}
              >
              </Form.Item>
              <TarjetaBancoComponente tipoBanco={tipoBanco} />
            </div>
            <div className="inputGrande">
              <Form.Item
                label="Nombre en la tarjeta"
                name="nombreTarjeta"
                rules={[{ required: true, message: 'Ingresa el nombre que figura en la tarjeta' }]}                
              >
                <Input className="form-control" placeholder="JUAN GARCÍA"  />
              </Form.Item>
            </div>
            <div className="inputsMedianos">
              <div className="inputMediano">
                <Form.Item 
                  name="fechaVencimiento" 
                  label="Fecha de vencimiento" 
                  rules={[{ required: true, message: 'Selecciona una fecha' }]}
                >
                  <DatePicker 
                    selected={fechaVencimientoTarjeta}
                    dateFormat="MM/yyyy"
                    onChange={(date) => setFechaVencimientoTarjeta(date)}
                    showMonthYearPicker
                  />
                </Form.Item>
              </div>
              <div className="inputMediano">
                <Form.Item 
                  name="cvv" 
                  label="CVV" 
                  rules={[
                    { required: true, message: 'Ingrese el cvv por favor.' }
                  ]} 
                >
                  <Input maxLength={4} minLength={3} placeholder="Ingrese el CVV" style={{ width: "100%"}} />
                </Form.Item>
              </div>
            </div>
          </div>
          <Form.Item>
            <Button className='botonDeSiguiente' type="primary" htmlType="submit">
              <div className='botonOrdenado'>
                <div className='clickASiguiente'>
                  <p>Crear Suscripción</p>
                  <img 
                    src={siguiente}
                    alt="wiqli compras semanales"
                  />
                </div>
              </div>
            </Button>
          </Form.Item>
        </Form>
      </div>
      {
        <p>{messageError}</p>
      }
    </div>
  );
}

export default MetodoPago;
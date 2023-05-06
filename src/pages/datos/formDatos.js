import React, { useState, useEffect } from "react";
import { Form, Input, Button, Radio, Select } from 'antd';
import subDays from "date-fns/subDays";
import DatePicker from "react-datepicker";
import { toastr } from "react-redux-toastr";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cleave from 'cleave.js/react';

import { UsuarioService } from "../../servicios/usuarioService";

import Resumen from "./resumen";
import TarjetaBancoComponente from "../../components/tarjetaBancoComponente/tarjetaBancoComponente";
import PagoContraentrega from "../../components/tarjetaBancoComponente/pagoContraentrega";
import PagoWeb from "../../components/tarjetaBancoComponente/pagoWeb";
import { 
  clearCart,
  applyCoupon,
  clearCoupon,
  clearCartExtra,
  asingDeliveryCost
} from "../../redux/actions/carritoActions";
import { showLoader } from "../../redux/actions/loaderActions";
import DistritoComponente from "./distritoComponente";
import { DistritoService } from "../../servicios/distritoService";

const { TextArea } = Input;

function FormDatos()
{
  let history = useNavigate();
  const distritoService = new DistritoService();
  const state = useSelector((state) => state);
  const { descuentoCupon, costoDelivery, totalProductos, cart, xtraCart, distrito } = state.cart;
  const { isLoged, infoUser } = state.user;
  const { montoMinimoCompraReferido } = state.configuracion;
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [messageError, setMessageError] = useState();
  const [tipoBanco, setTipoBanco] = useState();
  const [tipoPago, setTipoPago] = useState(1);
  const [aplicaCupon, setAplicaCupon] = useState(false);
  const [hour, setHour] = useState(10);
  const [day, setDay] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [fechaVencimientoTarjeta, setFechaVencimientoTarjeta] = useState(new Date());
  const [dateOfWeekSelected, setDateOfWeekSelected] = useState();
  const [distritos, setDistritos] = useState([]);

  const [cliente, setCliente] = useState({
    apellidos: '', correo: '', direccion: '', fecha_recojo: '', nombres: '',
    observacion: '', referencia: '', telefono: '', distrito: ''
  });

  const onFinish = (values) => {
    dispatch(showLoader());
    let data = {
      productos: cart,
      productosExtra: xtraCart,
      cliente: cliente,
      cupon: aplicaCupon,
      codigoCupon: values.codigoCupon,
      descuento: descuentoCupon,
      costoDelivery: costoDelivery,
      total: totalProductos + costoDelivery - descuentoCupon,
      saldoBilletera: infoUser.billetera.saldo,
      datosTarjeta: {
        numeroTarjeta: values.numeroTarjeta,
        fechaVencimiento: values.fechaVencimiento,
        cvv: values.cvv,
        nombreTarjeta: values.nombreTarjeta,
        tipoBanco: values.tipoBanco
      }
    }
    if(isLoged){
      const userService = new UsuarioService("usuario");
      userService.realizarPedido(data)
      .then(({ data }) => {
        if(data.state){
          dispatch(showLoader(false));
          dispatch(clearCart());
          dispatch(clearCartExtra());
          history(`/confirmacion`);
        }else if(!data.state){
          dispatch(showLoader(false));
          setMessageError(data.message);
        }
      }).catch(error => {
        dispatch(showLoader(false));
        setMessageError("Ocurrió un error en el servidor, por favor comunícate con Wiqli.");
      });
     }else if(!isLoged){
      axios
      .post(`${process.env.REACT_APP_BASE_PATH}/wiqli/crear-pedido`, data)
      .then(({ data }) => {
        if(data.state){
          dispatch(showLoader(false));
          localStorage.clear();
          history(`/confirmacion`);
        }else if(!data.state){
          dispatch(showLoader(false));
          setMessageError(data.message);
        }
      }).catch(error => {
        dispatch(showLoader(false));
        setMessageError("Ocurrió un error en el servidor, por favor comunícate con Wiqli.");
      });
    }
  }

  const validarCupon = () => {
    let url = `${process.env.REACT_APP_BASE_PATH}/wiqli/verificar-cupon`;
    let cupon = form.getFieldValue('codigoCupon');
    let correo = form.getFieldValue('correo');
    if(cupon && correo)
    {
      axios.get(`${url}/${cupon}/${correo}`).then(({data}) => {
        if(data.state && totalProductos >= montoMinimoCompraReferido)
        {
          setAplicaCupon(true);
          data.tipo === 1 ? 
            dispatch(applyCoupon({monto: data.monto, tipo: 1})) : 
            dispatch(applyCoupon({monto: data.monto, tipo: 2}));
          toastr.success("Cupón agregado correctamente.");
        }
        else if(!data.state){
          setAplicaCupon(false);
          toastr.error(data.message);
        }
        else if(!(totalProductos >= montoMinimoCompraReferido)){
          setAplicaCupon(false);
          toastr.error(`Los cupones solo son válidos para una compra mayor o igual a ${montoMinimoCompraReferido}.`);
        } else{
          setAplicaCupon(false);
          toastr.error("El cupón no existe o ya fue usado.");
        }
      });
    }else if(!cupon){
      toastr.error("Por favor ingrese un código de descuento.");
    }else if(!correo){
      toastr.error("Por favor ingrese un correo electrónico.");
    }
  }

  const modificarCupon = () => {
    setAplicaCupon(false);
  }

  const filterDate = (date) => {
    return date.getDay() !== 0 && date.getDay() !== 3 && date.getDay() !== 4 && date.getDay() !== 5 && date.getDay() !== 6;
  }

  const onChangeDate = (date) => {
    setStartDate(date);
    setDateOfWeekSelected(date.getDay());
  }

  const guardarFormInStorage = (changedValues, allValues) => {
    if(changedValues.cvv || changedValues.fechaVencimiento || changedValues.nombreTarjeta || changedValues.numeroTarjeta){

    }else{
      
      if(changedValues.correo){
        setAplicaCupon(false);
        form.setFieldsValue({
          codigoCupon: '',
          correo: changedValues.correo.replace(/ /g, "")
        });
      }
      let newCliente = {
        ...allValues,
        correo: allValues.correo.replace(/ /g, ""),
        fecha_recojo: allValues.fecha_recojo ? (allValues.fecha_recojo.toLocaleString('en-GB').replace('/', '-')).replace('/', '-').substr(0, 10) : ''
      };
      localStorage.setItem('cliente', JSON.stringify(newCliente));
      setCliente(newCliente);
    }
  }

  const onChangeBank = (type) => {
    setTipoBanco(type.toUpperCase());
    form.setFieldsValue({
      tipoBanco: type.toUpperCase()
    });
  }

  const onChangeTipoPago = (e) => {
    setTipoPago(Number(e.target.value));
  };

  const asignarDistrito = (valor) => {
    if(localStorage.getItem('cliente')){
      let clienteStorage = JSON.parse(localStorage.getItem('cliente'));
      setCliente(
        {...clienteStorage,
          distrito: valor
        }
      );
      localStorage.setItem('cliente', JSON.stringify({...clienteStorage,
        distrito: valor
      }));
    }
    form.setFieldsValue({
      distrito: valor
    });
  }

  const changueDistrito = (value, values) => {
    console.log(value)
    console.log(values)
    dispatch(asingDeliveryCost({
      distrito: value,
      tarifa: values.tarifa*1
    }));
  };

  useEffect(()=> {
    distritoService.getDistritos().then(({data})=> {
      setDistritos(data)
    });
  }, []);

  useEffect(() => {
    if(!(cart.length > 0))
    {
      history(`/`);
    }
  }, []);

  useEffect(() => {
    if(localStorage.getItem('cliente')){
      let clienteStorage = JSON.parse(localStorage.getItem('cliente'));
      form.setFieldsValue({
        ...clienteStorage,
        tipoPago: 1
      });
      setCliente(
        {...clienteStorage,
          tipoPago: 1
        }
      );
    }
  }, []);

  useEffect(() => {
    const dayOfWeekDigit = new Date().getDay();
    setDay(dayOfWeekDigit);
    const d = new Date();
    let hour = d.getHours();
    setHour(hour);
  }, []);

  useEffect(()=> {
    dispatch(clearCoupon());
  }, []);

  return(
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      scrollToFirstError
      onValuesChange={guardarFormInStorage}
      initialValues={
        {
          apellidos: infoUser.father_lastname,
          correo: infoUser.email,
          direccion: infoUser.address,
          fecha_recojo: '',
          nombres: infoUser.name,
          observacion: '',
          referencia: infoUser.referencia,
          telefono: infoUser.phone,
          tipoPago: tipoPago,
        }
      }
    >
      <div className="grupoForm">
        <div className="itemForm">
          <Form.Item
            className="labelProductoAdicional"
            label="Nombres"
            name="nombres"
            rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}                
          >
            <Input className="form-control" placeholder="Nombres"  />
          </Form.Item>
        </div>
        <div className="itemForm">
          <Form.Item
            className="labelProductoAdicional"
            label="Apellidos"
            name="apellidos"
            rules={[{ required: true, message: 'Por favor ingresa tus apellidos' }]}                
          >
            <Input className="form-control" placeholder="Apellidos"  />
          </Form.Item>
        </div>
        <div className="itemForm">
          <Form.Item
            className="labelProductoAdicional"
            name="telefono"
            label="Número"
            rules={[
              { required: true, message: 'Por favor ingresa tu celular' }
            ]}                
          >
            <Input className="form-control" placeholder="Ej. 939784580" maxLength={11} minLength={6} />
          </Form.Item>
        </div>
        <div className="itemForm">
          <Form.Item
            className="labelProductoAdicional"
            name="correo"
            label="Correo de contacto"
            rules={[
              { required: true, message: 'Por favor ingresa tu correo' },
              { type: 'email', message: 'No es un E-mail válido.'},
            ]}                
          >
            <Input className="form-control" placeholder="Ej. nombre@mail.com" disabled={isLoged} />
          </Form.Item>
        </div>
        <div className="itemForm">
          <Form.Item
            className="labelProductoAdicional"
            name="direccion"
            label="Dirección de entrega" 
            rules={[{ required: true, message: 'Por favor ingresa tu Dirección' }]}
          >
            <Input className="form-control" placeholder="Avenida/Calle" />
          </Form.Item>
        </div>
        <div className="itemForm">
          <Form.Item
            className="labelProductoAdicional"
            name="distrito"
            label="Distrito" 
            rules={[{ required: true, message: 'Por favor seleccione su distrito' }]}
          >
            {/* <DistritoComponente asignarDistrito={asignarDistrito} /> */}
            <Select onChange={changueDistrito} placeholder="Seleccionar">
              <Select.Option key={99} value={99} tarifa={15.00}>
                Otro distrito
              </Select.Option>
              {
                distritos.map((distrito) =>
                  <Select.Option key={distrito.id} value={distrito.id} tarifa={distrito.tarifa}>
                    {distrito.nombre}
                  </Select.Option>
                )
              }
            </Select>
          </Form.Item>
        </div>
        <div className="itemForm">
          <Form.Item
            className="labelProductoAdicional"
            name="referencia"
            label="Detalle de dirección"        
          >
            <Input className="form-control" placeholder="N° de dpto./of..." />
          </Form.Item>
        </div>
        <div className="itemForm">
          <Form.Item
            name="fecha_recojo" 
            label="Fecha de entrega" 
            rules={[{ required: true, message: 'Selecciona una fecha' }]}
            className="selector-fecha labelProductoAdicional"
          >
            <DatePicker
              placeholderText="Elige tu fecha."
              selected={startDate}
              filterDate={filterDate}
              onChange={onChangeDate}
              minDate={
                (day === 0 && hour > 20) ? subDays(new Date(), -4) : 
                (day === 1  || day === 2 ? subDays(new Date(), -2) : subDays(new Date(), -1))
              }
              dateFormat='dd-MM-yyyy'
            />
          </Form.Item>
        </div>
        <div className="itemForm">
          <Form.Item 
            className="labelProductoAdicional"
            label="Anotaciones adicionales"
            name="observacion"
            rules={[{ required: false }]}
          >
            <TextArea rows={3} placeholder="Anotaciones adicionales" />
          </Form.Item>
        </div>
      </div>
      <div>
        <div className="contenedorMiniSeccion">
          <div className="miniSeccion" >
            <h6 className="tituloMiniSeccion">Agregar cupón de descuento</h6>
            {
              aplicaCupon ?
              (<>
                <Form.Item 
                  label="Cupón agregado con éxito."
                  name="codigoCupon"
                  rules={[{ required: false }]}
                >
                </Form.Item>
                <Button type="primary" className="botonFinal" onClick={modificarCupon}>
                  Modificar
                </Button>
              </>) :
              (<>
                <Form.Item 
                  name="codigoCupon"
                  rules={[{ required: false }]}
                >
                  <Input className="form-control"  placeholder="Ingresa tu cupón de referido." />
                </Form.Item>
                <Button type="primary" className="botonFinal" onClick={validarCupon}>
                  Agregar
                </Button>
              </>)
            }
          </div>
        </div>
        <h3 className="mensajeFinalDestacado">Total de pedido:</h3>
          <Resumen
            aplicaCupon={aplicaCupon}
          />
        <div className="contenedorMiniSeccion">
          <div className="miniSeccion" >
            <h5 className="tituloMiniSeccion">Selecciona tu medio de pago</h5>
            <Form.Item label="" name="tipoPago" onChange={onChangeTipoPago}>
              <Radio.Group className="eleccionesDePago">
                <div className="eleccionDeMedioDePago">
                  <Radio className="eleccionPago" value={2}>Pago Web</Radio>
                  <PagoWeb />
                </div>
                <div className="eleccionDeMedioDePago">
                  <Radio className="eleccionPago" value={1}>Contraentrega</Radio>
                  <PagoContraentrega />
                </div>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
        {
          tipoPago === 2 &&
          <div className="contenedorPagos contenedorMiniSeccion">
            <div className="pasarelaDePago">
              <div className="inputDataPago">
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
          </div>
        }
        
        {
          dateOfWeekSelected === 0 &&
          <p className="mensajeFinalDestacado">Entregaremos tu pedido entre las 6pm y 10pm.</p>
        }
        {
          dateOfWeekSelected === 1 &&
          <p className="mensajeFinalDestacado">Entregaremos tu pedido entre las 9am y 12pm.</p>
        }
        {
          <p>{messageError}</p>
        }
        <h6 className="textoDisclaimer">
          Recuerda que pueden haber algunas variaciones en el precio por peso o productos adicionales solicitados
        </h6>
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="botonFinal">
          Enviar pedido
        </Button>
      </Form.Item>
    </Form>
  );
}
export default FormDatos;
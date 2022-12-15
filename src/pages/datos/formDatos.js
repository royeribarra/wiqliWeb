import React, { useState, useEffect } from "react";
import { Form, Input, Button, Radio } from 'antd';
import subDays from "date-fns/subDays";
import DatePicker from "react-datepicker";
import { toastr } from "react-redux-toastr";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UsuarioService } from "../../servicios/usuarioService";
import StorageService from "../../servicios/storageService";
import {Buffer} from 'buffer';
import Cleave from 'cleave.js/react';


import Jcb from '../../assets/images/jcb.svg';
import DinnersClub from '../../assets/images/dinners-club.svg';
import MasterCard from '../../assets/images/master-card.svg';
import Visa from '../../assets/images/visa.svg';
import AmericanExpress from '../../assets/images/symbol.svg';
import Discover from '../../assets/images/symbols.svg';
import miniAmex from '../../images/miniAmex.png';
import miniCash from '../../images/miniCash.png';
import miniMastercard from '../../images/miniMastercard.png';
import miniPlin from '../../images/miniPlin.png';
import miniVisa from '../../images/miniVisa.png';
import miniYape from '../../images/miniYape.png';


const { TextArea } = Input;

function FormDatos({ setBlockPage })
{
  let history = useNavigate();
  
  const storageService = new StorageService();
  const [form] = Form.useForm();
  const [isLoged, setIsLoged] = useState(false);
  const [messageError, setMessageError] = useState();
  const [tipoBanco, setTipoBanco] = useState();
  const [tipoPago, setTipoPago] = useState(1);
  const [descuento, setDescuento] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalProductos, setTotalProductos] = useState(0);
  const [delivery, setDelivery] = useState(10);
  const [aplicaCupon, setAplicaCupon] = useState(false);
  const [hour, setHour] = useState(10);
  const [day, setDay] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [fechaVencimientoTarjeta, setFechaVencimientoTarjeta] = useState(new Date());
  const [dateOfWeekSelected, setDateOfWeekSelected] = useState();
  const [productos, setProductos] = useState([]);
  const [cliente, setCliente] = useState({
    apellidos: '', correo: '', direccion: '', fecha_recojo: '', nombres: '',
    observacion: '', referencia: '', telefono: ''
  });
  const [configuracion, setConfiguracion] = useState(
    {
      id: 1,
      monto_descuento: 0.00,
      monto_minimo_compra_referido: 100.00,
      monto_minimo_envio_codigo: 0.00,
      tipo_descuento: 1
    }
  );

  const onFinish = (values) => {
    setBlockPage(true);
    let data = {
      productos: productos,
      otrosFrutas: localStorage.getItem('otrasFrutas'),
      otrosVerduras: localStorage.getItem('otrasVerduras'),
      otrosCarnes: localStorage.getItem('otrasCarnes'),
      otrosMenestras: localStorage.getItem('otrasMenestras'),
      cliente: cliente,
      cupon: aplicaCupon,
      codigoCupon: values.descuento,
      descuento: descuento,
      total: total + delivery,
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
          setBlockPage(false);
          localStorage.clear();
          history(`/confirmacion`);
        }else if(!data.state){
          setBlockPage(false);
          setMessageError(data.message);
        }
      }).catch(error => {
        setBlockPage(false);
        setMessageError("Ocurrió un error en el servidor, por favor comunícate con Wiqli.");
      });
     }else if(!isLoged){
      axios
      .post(`${process.env.REACT_APP_BASE_PATH}/wiqli/crear-pedido`, data)
      .then(({ data }) => {
        if(data.state){
          setBlockPage(false);
          localStorage.clear();
          history(`/confirmacion`);
        }else if(!data.state){
          setBlockPage(false);
          setMessageError(data.message);
        }
      }).catch(error => {
        setBlockPage(false);
        setMessageError("Ocurrió un error en el servidor, por favor comunícate con Wiqli.");
      });
    }
  }

  const calcularTotal = () => {
    let total = 0;
    productos.forEach((producto) => {
      if(producto.cantidad_minima === 1){
        total += producto.cantidad * producto.precio_unitario
      }else{
        total += producto.cantidad * (producto.precio_unitario*producto.cantidad_minima)
      }
    });
    setTotalProductos(total);
    setTotal(total);
  }

  const validarCupon = () => {
    let url = `${process.env.REACT_APP_BASE_PATH}/wiqli/verificar-cupon`;
    let cupon = form.getFieldValue('descuento');
    let correo = form.getFieldValue('correo');
    if(cupon && correo)
    {
      axios.get(`${url}/${cupon}/${correo}`).then(({data}) => {
        if(data.state && totalProductos >= configuracion.monto_minimo_compra_referido)
        {
          setAplicaCupon(true);
          if(data.tipo === 1){
            setDescuento(totalProductos*parseFloat(data.monto)/100);
            setTotal(totalProductos - (totalProductos*parseFloat(data.monto)/100));
          }else if(data.tipo === 2)
          {
            setTotal(totalProductos - parseFloat(data.monto));
            setDescuento(parseFloat(data.monto));
          }
          toastr.success("Cupón agregado correctamente.");
        }
        else if(!data.state){
          setAplicaCupon(false);
          toastr.error(data.message);
        }
        else if(!(totalProductos >= configuracion.monto_minimo_compra_referido)){
          setAplicaCupon(false);
          toastr.error(`Los cupones solo son válidos para una compra mayor o igual a ${configuracion.monto_minimo_compra_referido}.`);
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
    return date.getDay() !== 2 && date.getDay() !== 3 && date.getDay() !== 4 && date.getDay() !== 5 && date.getDay() !== 6;
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
        setDescuento(0);
        form.setFieldsValue({
          descuento: ''
        });
      }
      let newVallues = allValues;
      if(newVallues.fecha_recojo){
        allValues.fecha_recojo = (newVallues.fecha_recojo.toLocaleString('en-GB').replace('/', '-')).replace('/', '-').substr(0, 10);
      }
      localStorage.setItem('cliente', JSON.stringify(allValues));
      setCliente(allValues);
    }
    
  }

  const onChangeBank = (type) => {
    setTipoBanco(type.toUpperCase());
    form.setFieldsValue({
      tipoBanco: type.toUpperCase()
    });
  }

  const onChangeTipoPago = (e) => {
    setTipoPago(e.target.value);
  };

  useEffect(() => {
    calcularTotal();
  }, [productos]);

  useEffect(() => {
    if(localStorage.getItem('productos')){
      setProductos(JSON.parse(localStorage.getItem('productos')));
    }else{
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
      setCliente(JSON.parse(localStorage.getItem('cliente')));
    }
  }, []);

  useEffect(() => {
    const dayOfWeekDigit = new Date().getDay();
    setDay(dayOfWeekDigit);
    const d = new Date();
    let hour = d.getHours();
    setHour(hour);
  },[]);

  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_BASE_PATH}/wiqli/configuracion`).then(({data})=> {
      setConfiguracion(data);
    });
  },[]);

  useEffect(()=>{
    const token = localStorage.getItem("tknData");
    if(token){
      const tknData = JSON.parse(Buffer.from(storageService.getItemObject("tknData"), 'base64'));
      if(tknData.status){
        const userService = new UsuarioService("usuario/informacion");
        userService.getInfoUser().then(({data})=> {
          form.setFieldsValue({
            'nombres': data.name,
            'apellidos': data.father_lastname,
            'telefono': data.phone,
            'correo': data.email,
            'direccion': data.address,
            'referencia': data.referencia
          })
        });
        setIsLoged(true);
      }else{
        setIsLoged(false);
      }
    }
  }, []);

  return(
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      onValuesChange={guardarFormInStorage}
      initialValues={
        {
          apellidos: cliente.apellidos,
          correo: cliente.correo,
          direccion: cliente.direccion,
          fecha_recojo: cliente.fecha_recojo,
          nombres: cliente.nombres,
          observacion: cliente.observacion,
          referencia: cliente.referencia,
          telefono: cliente.telefono,
          tipoPago: tipoPago
        }
      }
    >
      <div className="grupoForm">
        <div className="itemForm">
          <Form.Item
            label="Nombres"
            name="nombres"
            rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}                
          >
            <Input className="form-control" placeholder="Nombres"  />
          </Form.Item>
        </div>
        <div className="itemForm">
          <Form.Item
            label="Apellidos"
            name="apellidos"
            rules={[{ required: true, message: 'Por favor ingresa tus apellidos' }]}                
          >
            <Input className="form-control" placeholder="Apellidos"  />
          </Form.Item>
        </div>
        <div className="itemForm">
          <Form.Item
            name="telefono"
            label="Número"
            rules={[{ required: true, message: 'Por favor ingresa tu celular' }]}                
          >
            <Input className="form-control" placeholder="Ej. 939784580" />
          </Form.Item>
        </div>
        <div className="itemForm">
          <Form.Item
            name="correo"
            label="Correo de contacto"
            rules={[{ required: true, message: 'Por favor ingresa tu correo' }]}                
          >
            <Input className="form-control" placeholder="Ej. nombre@mail.com" disabled={isLoged} />
          </Form.Item>
        </div>
        <div className="itemForm">
          <Form.Item
            name="direccion"
            label="Dirección de entrega" 
            rules={[{ required: true, message: 'Por favor ingresa tu Dirección' }]}
          >
            <Input className="form-control" placeholder="Avenida/Calle" />
          </Form.Item>
        </div>
        <div className="itemForm">
          <Form.Item
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
            className="selector-fecha"
          >
            <DatePicker
              selected={startDate}
              filterDate={filterDate}
              onChange={onChangeDate}
              placeholderText="Entrega: domingo o lunes."
              minDate={
                (day === 6 && hour > 18) || day === 0 ? subDays(new Date(), -4) : subDays(new Date(), -1)
              }
              dateFormat='dd-MM-yyyy'
            />
          </Form.Item>
        </div>
        <div className="itemForm">
          <Form.Item 
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
            !aplicaCupon && 
            <>
              <Form.Item 
                name="descuento"
                rules={[{ required: false }]}
              >
                <Input className="form-control"  placeholder="Ingresa tu cupón de referido." />
              </Form.Item>
              <Button type="primary" className="botonFinal" onClick={validarCupon}>
                Agregar
              </Button>
            </>
          }
          {
            aplicaCupon && 
            <>
              <Form.Item 
                label="Cupón agregado con éxito."
                name="descuento"
                rules={[{ required: false }]}
              >
              </Form.Item>
              <Button type="primary" className="botonFinal" onClick={modificarCupon}>
                Modificar
              </Button>
            </>
          }
        
        </div>
        </div>
        <h3 className="mensajeFinalDestacado">Total de pedido:</h3>
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
            aplicaCupon && 
              <div className="totalesAPagar" >
                <h6 className="tituloCampo">Descuento</h6>
                <h6 className="datoCampo">- S/ {parseFloat(descuento).toFixed(2)}</h6>
              </div>
          }
          <hr></hr>
          <div className="totalesAPagar">
            <h6 className="tituloCampo">Total</h6>
            <h6 className="datoCampo">S/ {parseFloat(total + delivery).toFixed(2)}</h6>
          </div>
        </div>
        <div className="contenedorMiniSeccion" >
          <div className="miniSeccion" >
          <h5 className="tituloMiniSeccion">Selecciona tu medio de pago</h5>
          <Form.Item label="" name="tipoPago" onChange={onChangeTipoPago}>
            <Radio.Group className="eleccionesDePago">
              <div className="eleccionDeMedioDePago">
              <Radio className="eleccionPago" value={2}>Pago Web</Radio>
              <div className="imagenesEleccionPago">
                <img className="imagenEleccionPago" alt='Pago con Visa Wiqli'src={miniVisa}></img>
                <img className="imagenEleccionPago" alt='Pago con Mastercard Wiqli'src={miniMastercard}></img>
                <img className="imagenEleccionPago" alt='Pago con American Express Wiqli'src={miniAmex}></img>
              </div>
              </div>
              <div className="eleccionDeMedioDePago">
              <Radio className="eleccionPago" value={1}>Contraentrega</Radio>
              <div className="imagenesEleccionPago">
                <img className="imagenEleccionPago" alt='Pago en cash Wiqli'src={miniCash}></img>
                <img className="imagenEleccionPago" alt='Pago con Plin Wiqli'src={miniPlin}></img>
                <img className="imagenEleccionPago" alt='Pago con Yape Wiqli'src={miniYape}></img>
              </div>
              </div>
              
            </Radio.Group>
          </Form.Item>
          </div>
        </div>
        {
          tipoPago == 2 &&
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
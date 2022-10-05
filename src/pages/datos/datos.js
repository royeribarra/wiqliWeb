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

const { TextArea } = Input;

function Datos() 
{
  const [startDate, setStartDate] = useState(new Date());
  let history = useNavigate();
  const [form] = Form.useForm();
  const [messageError, setMessageError] = useState();
  const [minDate, setMinDate] = useState(subDays(new Date(), 0));
  const [hour, setHour] = useState(10);
  const [day, setDay] = useState();
  const [dateOfWeekSelected, setDateOfWeekSelected] = useState();
  const [total, setTotal] = useState(0);
  const [productos, setProductos] = useState([]);
  const [cliente, setCliente] = useState({
    apellidos: '', correo: '', direccion: '', fecha_recojo: '', nombres: '',
    observacion: '', referencia: '', telefono: ''
  });
  const [blockPage, setBlockPage] = useState(false);

  const onFinish = (values) => {
    setBlockPage(true);
    let data = {
      productos: productos,
      otrosFrutas: sessionStorage.getItem('otrasFrutas'),
      otrosVerduras: sessionStorage.getItem('otrasVerduras'),
      otrosCarnes: sessionStorage.getItem('otrasCarnes'),
      otrosMenestras: sessionStorage.getItem('otrasMenestras'),
      cliente: cliente
     }
    axios
    .post(`${process.env.REACT_APP_BASE_PATH}/wiqli/crear-pedido`, data)
    .then(({ data }) => {
      if(data.state){
        setBlockPage(false);
        sessionStorage.clear();
        history(`/confirmacion`);
      }
    }).catch(error => {
      setMessageError("Ocurrió un error en el servidor, por favor comunícate con Repo.");
    });
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
    setTotal(total);
  }

  const guardarFormInStorage = (changedValues, allValues) => {
    let newVallues = allValues;
    if(newVallues.fecha_recojo){
      allValues.fecha_recojo = (newVallues.fecha_recojo.toLocaleString('en-GB').replace('/', '-')).replace('/', '-').substr(0, 10);
    }
    sessionStorage.setItem('cliente', JSON.stringify(allValues));
    setCliente(allValues);
  }

  const filterDate = (date) => {
    return date.getDay() !== 2 && date.getDay() !== 3 && date.getDay() !== 4 && date.getDay() !== 5 && date.getDay() !== 6;
  }

  const onChangeDate = (date) => {
    setStartDate(date);
    setDateOfWeekSelected(date.getDay());
  }

  useEffect(() => {
    calcularTotal();
  }, [productos]);

  useEffect(() => {
    if(sessionStorage.getItem('productos')){
      setProductos(JSON.parse(sessionStorage.getItem('productos')));
    }else{
      history(`/`);
    }
  }, []);

  useEffect(() => {
    if(sessionStorage.getItem('cliente')){
      let clienteStorage = JSON.parse(sessionStorage.getItem('cliente'));
      form.setFieldsValue(clienteStorage);
      setCliente(JSON.parse(sessionStorage.getItem('cliente')));
    }
  }, []);

  useEffect(() => {
    const dayOfWeekDigit = new Date().getDay();
    setDay(dayOfWeekDigit);
    const d = new Date();
    let hour = d.getHours();
    setHour(hour);
  },[])

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
                telefono: cliente.telefono 
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
                  <Input className="form-control" placeholder="Ej. nombre@mail.com" />
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
                      (day === 6 && hour > 18) || day === 6 ? subDays(new Date(), -4) : subDays(new Date(), -1)
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
              <h3 className="mensajeFinalDestacado">Total de pedido:</h3>
              <div className="desgloseTotal">
                <div className="totalesAPagar">
                  <h6 className="tituloCampo">Productos</h6>
                  <h6 className="datoCampo">S/ {parseFloat(total).toFixed(2)}</h6>
                </div>
                <div className="totalesAPagar">
                  <h6 className="tituloCampo">Delivery</h6>
                  <h6 className="datoCampo">S/10.00</h6>
                </div>
                <hr></hr>
                <div className="totalesAPagar">
                  <h6 className="tituloCampo">Total</h6>
                  <h6 className="datoCampo">S/ {parseFloat(total + 10).toFixed(2)}</h6>
                </div>
              </div>
              {
                dateOfWeekSelected === 0 &&
                <p className="mensajeFinalDestacado">Entregaremos tu pedido entre las 6pm y 10pm.</p>
              }
              {
                dateOfWeekSelected === 1 &&
                <p className="mensajeFinalDestacado">Entregaremos tu pedido entre las 9am y 12pm.</p>
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
        </Container>
      </div>
    </Spin>
  );
}
  
export default Datos;
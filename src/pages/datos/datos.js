import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap"
import { Form, Input, Select, Button, Spin } from 'antd';
import atras from "../../images/atras.png";
import './datos.css';
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const { Option } = Select;
const { TextArea } = Input;

function Datos() 
{


  const [startDate, setStartDate] = useState(new Date());


  let history = useNavigate();
  const [form] = Form.useForm();
  const [messageError, setMessageError] = useState();
  const [total, setTotal] = useState(0);
  const [productos, setProductos] = useState([]);
  const [blockPage, setBlockPage] = useState(false);

  const onFinish = (values) => {
    console.log(values)
    setBlockPage(true);
    const fieldsValue = {
      ...values,
      'fecha_recojo': values['fecha_recojo'].toLocaleDateString()
    };
    let data = {
      productos: productos,
      otrosFrutas: localStorage.getItem('otrosFrutas'),
      otrosVerduras: localStorage.getItem('otrosVerduras'),
      otrosCarnes: localStorage.getItem('otrosCarnes'),
      otrosMenestras: localStorage.getItem('otrosMenestras'),
      cliente: fieldsValue
     }
    axios
    .post(`${process.env.REACT_APP_BASE_PATH}/wiqli/crear-pedido`, data)
    .then(({ data }) => {
      if(data.state){
        setBlockPage(false);
        localStorage.clear();
        history(`/confirmacion`);
      }
    }).catch(error => {
      setMessageError("Ocurrió un error en el servidor, por favor comunícate con Repo.");
    });
    
  }

  const calcularTotal = () => {
    let total = 0;
    productos.forEach((producto) => {
      total += producto.cantidad * producto.precio_unitario
    })
    setTotal(total);
  }

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

  return (
    <Spin spinning={blockPage}>
      <div className="baseWiqliForm">
        <Container className="contenedorDatos">
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
                  label="Dirección de recojo" 
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
                  label="Fecha de recojo" 
                  rules={[{ required: true, message: 'Selecciona una fecha' }]}
                  className="selector-fecha"
                >
                  <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  filterDate={date => date.getDay() === 0}
                  placeholderText="Por ahora solo entregamos los domingos"
                  minDate={new Date()}
                  dateFormat='dd/MM/yyyy'
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
              <h6 className="textoDisclaimer">Recuerda que pueden haber algunas variaciones en el precio por peso o productos adicionales solicitados</h6>
            </div>
            {/* <NavLink to="/confirmacion">
              <Button type="primary" htmlType="submit" className="botonDeSiguiente">
                Enviar pedido
              </Button>
            </NavLink> */}
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
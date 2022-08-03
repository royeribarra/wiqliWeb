import React, { useEffect, useState } from "react";
import { Container, Nav } from "react-bootstrap"
import { Form, Input, Select, DatePicker, Button } from 'antd';
import atras from "../../images/atras.png"
import './datos.css';
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";

const { Option } = Select;
const { TextArea } = Input;

function Datos() 
{
  let history = useNavigate();
  const [form] = Form.useForm();
  const [messageError, setMessageError] = useState();
  const[total, setTotal] = useState(0);

  const onFinish = (values) => {
    
    console.log(values);
    let data = {
      productos: localStorage.getItem('productos'),
      cliente: values
     }
    const productos = localStorage.getItem('productos');
    axios
    .post(`${process.env.REACT_APP_BASE_PATH}/crear-pedido`, data)
    .then(({ data }) => {
      console.log(data);
      if(data.state){
        localStorage.clear();
        history(`/confirmacion`);
      }
    }).catch(error => {
      setMessageError("Ocurrió un error en el servidor, por favor comunícate con Repo.");
    });
    
  }

  const calcularTotal = () => {
    let productos = JSON.parse(localStorage.getItem('productos'));
    let total = 0;
    productos.forEach((producto) => {
      total += producto.cantidad * producto.precio_unitario
    })
    setTotal(total);
  }

  useEffect(() => {
    calcularTotal();
  }, [])

  return (
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
                <Input className="form-control" placeholder="Ej. wiqli@contacto.pe" />
              </Form.Item>
            </div>
            <div className="itemForm">
              <Form.Item
                name="direccion"
                label="Dirección de recojo" 
                rules={[{ required: true, message: 'Por favor ingresa tu Dirección' }]}
              >
                <Input className="form-control" placeholder="Av. Aurelio Miroquesada 117" />
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
                  placeholder="Seleccionar una fecha"
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </div>
            <div className="itemForm">
              <Form.Item 
                label="Anotaciones adicionales"
                name="observacion" 
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
  );
}
  
export default Datos;
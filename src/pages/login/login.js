import React from 'react';
import { Container } from "react-bootstrap";
import { Form, Input, Button, Spin } from 'antd';
import './login.css';
import logo from "../../images/logo.png"


function Login() 
{
  return (
    <div className="gradienteMedio">
    
        <Container className="contenedorSimple">
        <div>
        <h2 className="tituloPrincipal">Inicia Sesión</h2>
        <Form>
        <div className="itemForm">
                <Form.Item
                  name="correo"
                  label="Correo electrónico"
                  rules={[{ required: true, message: 'Por favor ingresa tu correo' }]}                
                >
                  <Input className="form-control" placeholder="Ej. nombre@mail.com" />
                </Form.Item>
        </div>
        <div className="itemForm">
                <Form.Item
                  name="password"
                  label="Contraseña"
                  rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}                
                >
                  <Input className="form-control" placeholder="**********" />
                </Form.Item>
        </div>
        <Form.Item>
            <Button type="primary" htmlType="submit" className="botonFinal botonLogin">
                Enviar pedido
            </Button>
        </Form.Item>

        </Form>
        </div>

        </Container>

    </div>

  );
}
  
export default Login;
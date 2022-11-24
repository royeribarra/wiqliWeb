import React from 'react';
import { Container } from "react-bootstrap";
import './registro.css';
import { Form, Input, Button, Spin } from 'antd';
import facebook from "../../images/logoFacebook.png";
import google from "../../images/logoGmail.png";
import apple from "../../images/logoApple.png";
import logo from "../../images/logo.png"


function Registro() 
{
  return (
    <div className="gradienteMedio">
    
        <Container className="contenedorSimple">
        <h2 className="tituloPrincipal">Regístrate y obtén más beneficios</h2>
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
                  label="Ingresa una contraseña"
                  rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}                
                >
                  <Input className="form-control" placeholder="**********" />
                </Form.Item>
        </div>
        <div className="itemForm">
                <Form.Item
                  name="password"
                  label="Ingresa tu contraseña nuevamente"
                  rules={[{ required: true, message: 'Las contraseñas deben coincidir'}]}                
                >
                  <Input className="form-control" placeholder="**********" />
                </Form.Item>
        </div>
        <Form.Item>
            <Button type="primary" htmlType="submit" className="botonFinal botonLogin">
                Registrarme
            </Button>
        </Form.Item>

        </Form>
        <p className='signoO'>ó</p>
        <div className='opcionesDeSesion'>
            <div className='cardOpcionDeSesion'>
                <img className='logoSesion' src={google}></img>
                <p>Registrarme con Google</p>
            </div>
            <div className='cardOpcionDeSesion'>
                <img className='logoSesion' src={apple}></img>
                <p>Registrarme con Apple</p>
            </div>
            <div className='cardOpcionDeSesion'>
                <img className='logoSesion' src={facebook}></img>
                <p>Registrarme con Facebook</p>
            </div>
        </div>
        </Container>

    </div>

  );
}
  
export default Registro;
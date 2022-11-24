import React from 'react';
import { Container } from "react-bootstrap";
import { Form, Input, Button, Spin } from 'antd';
import './login.css';
import logo from "../../images/logo.png"
import facebook from "../../images/logoFacebook.png";
import google from "../../images/logoGmail.png";
import apple from "../../images/logoApple.png";


function Login() 
{
  return (
    <div className="gradienteMedio">
    
        <Container className="contenedorDeForm contenedorSimple">
        <div>
            <h2 className="tituloPrincipal">Inicia Sesión</h2>
            <div>
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
                        Iniciar sesión
                    </Button>
                </Form.Item>
                </Form>
            </div>
            <p className='signoO'>ó</p>
            <div className='opcionesDeSesion'>
                <div className='cardOpcionDeSesion'>
                    <img className='logoSesion' src={google}></img>
                    <p>Inicia sesión con Google</p>
                </div>
                <div className='cardOpcionDeSesion'>
                    <img className='logoSesion' src={apple}></img>
                    <p>Inicia sesión con Apple</p>
                </div>
                <div className='cardOpcionDeSesion'>
                    <img className='logoSesion' src={facebook}></img>
                    <p>Inicia sesión con Facebook</p>
                </div>

            </div>
        </div>

        </Container>

    </div>

  );
}
  
export default Login;
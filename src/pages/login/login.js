import React from 'react';
import { Container } from "react-bootstrap";
import { Form, Input, Button, Spin } from 'antd';
import './login.css';
import facebook from "../../images/logoFacebook.png";
import google from "../../images/logoGmail.png";
import apple from "../../images/logoApple.png";
import LogService from '../../servicios/logService';
import { login } from '../../redux/actions/clienteLogAction';
import { toogleSpinner } from '../../redux/actions/spinnerActions';
import { connect } from 'react-redux';

const Login = ({loginCliente}) =>
{
  const logService = new LogService();
  const onFinish = (values) => {
    loginCliente(values);
  };

  return (
    <div className="gradienteMedio">
      <Container className="contenedorDeForm contenedorSimple">
        <div>
          <h2 className="tituloPrincipal">Inicia Sesión</h2>
          <div>
            <Form
              onFinish={onFinish}
            >
              <div className="itemForm">
                <Form.Item
                    name="email"
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
                  <Input.Password className="form-control input-padre" />
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
  
const mapStateToProps = (state) => {
  return {
    spinnerDisplay: state.spinner.display
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    loginCliente: (values) => {
      dispatch(login(values));
    },
    toogleSpinner: (display) => {
      dispatch(toogleSpinner(display));
    }
  }
}

export default connect(mapStateToProps, mapDispatchProps)(Login);
import React from 'react';
import { Container } from "react-bootstrap";
import { Form, Input, Button } from 'antd';
import './login.css';
import { useDispatch } from 'react-redux';
import LogService from '../../servicios/logService';
import StorageService from '../../servicios/storageService';
import { toastr } from 'react-redux-toastr';
import { login } from "../../redux/actions/clienteLogAction";
import { showLoader } from '../../redux/actions/loaderActions';

const Login = () =>
{
  const dispatch = useDispatch();
  const logService = new LogService();
  const storageServicce = new StorageService();

  const onFinish = (values) => {
    dispatch(showLoader());
    logService.oauthCliente(values).then(({data}) => {
      if(data.status === false){
        toastr.error(data.message);
        setTimeout(() => {
            window.location.reload(false);
        }, 2000);
      }
      if(data.status){
        storageServicce.setItemObject('tknData', data);
        logService.getAuthInfo(data.access_token).then(({data}) => {
          storageServicce.setItemObject('authUser', data);
          storageServicce.setItem('type', 2);
          dispatch(login());
          dispatch(showLoader(false));
          window.location.href = '/';
        },
        (err)=> {
          dispatch(showLoader(false));
        })
      }
    }, (err) => {
        dispatch(showLoader(false));
    });
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
          {/* <p className='signoO'>ó</p>
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
          </div> */}
        </div>
      </Container>
    </div>
  );
}
  

export default Login;
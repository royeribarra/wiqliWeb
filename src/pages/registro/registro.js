import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import './registro.css';
import { Form, Input, Button } from 'antd';
import { RegistroService } from '../../servicios/registerService';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader/loader";
import { toastr } from 'react-redux-toastr';

function Registro() 
{
  let history = useNavigate();
  const registroService = new RegistroService();
  const [blockPage, setBlockPage] = useState(false);

  const onFinish = (values) => {
    setBlockPage(true);
    registroService.registro(values).then(({data})=> {
      if(data.state){
        setBlockPage(false);
        history(`/registro-completo`);
      }else if(!data.state){
        setBlockPage(false);
        toastr.error(data.message);
      }
    });
  };

  return (
    <div className="gradienteMedio">
      <Container className="contenedorSimple">
        <div className={ blockPage ? "" : "loaderInvisible"}>
          <Loader></Loader>
        </div>
        <h2 className="tituloPrincipal">Regístrate y obtén más beneficios</h2>
        <Form
          onFinish={onFinish}
        >
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
              name="email"
              label="Correo electrónico"
              rules={[
                {
                  type: 'email', message: 'No es un correo válido.'
                },
                { required: true, message: 'Por favor ingresa tu correo.' }
              ]}                
            >
              <Input className="form-control" placeholder="Ej. nombre@mail.com" />
            </Form.Item>
          </div>
          <div className="itemForm">
            <Form.Item
              name="password"
              label="Ingresa una contraseña"
              hasFeedback
              rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}                
            >
              <Input.Password className="form-control" />
            </Form.Item>
          </div>
          <div className="itemForm">
            <Form.Item
              name="password_confirmation"
              label="Ingresa tu contraseña nuevamente"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Por favor confirma tu contraseña.',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Las contraseñas deben coincidir.'));
                  },
                }),
              ]}
            >
              <Input.Password className="form-control" />
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="botonFinal botonLogin">
              Registrarme
            </Button>
          </Form.Item>
        </Form>
        {/* <p className='signoO'>ó</p>
        <div className='opcionesDeSesion'>
          <div className='cardOpcionDeSesion'>
            <img className='logoSesion' src={google} alt="google"></img>
            <p>Registrarme con Google</p>
          </div>
          <div className='cardOpcionDeSesion'>
            <img className='logoSesion' src={apple} alt="apple"></img>
            <p>Registrarme con Apple</p>
          </div>
          <div className='cardOpcionDeSesion'>
            <img className='logoSesion' src={facebook} alt="facebook"></img>
            <p>Registrarme con Facebook</p>
          </div>
        </div> */}
      </Container>
    </div>
  );
}
  
export default Registro;
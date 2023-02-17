import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import { Form, Input, Button, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/loader/loader";
import { toastr } from 'react-redux-toastr';
import DatePicker from "react-datepicker";
import Cleave from 'cleave.js/react';

import Jcb from '../../assets/images/jcb.svg';
import DinnersClub from '../../assets/images/dinners-club.svg';
import MasterCard from '../../assets/images/master-card.svg';
import Visa from '../../assets/images/visa.svg';
import AmericanExpress from '../../assets/images/symbol.svg';
import Discover from '../../assets/images/symbols.svg';
import { SuscripcionService } from '../../servicios/suscripcionservice';
import { showLoader } from '../../redux/actions/loaderActions';
import { useDispatch } from 'react-redux';


function CreacionSuscripcion() 
{
  let history = useNavigate();
  const dispatch = useDispatch();
  const suscripcionService = new SuscripcionService();
  const [form] = Form.useForm();
  const [messageError, setMessageError] = useState();
  const [fechaVencimientoTarjeta, setFechaVencimientoTarjeta] = useState(new Date());
  const [tipoBanco, setTipoBanco] = useState();

  const onChangeBank = (type) => {
    setTipoBanco(type.toUpperCase());
    form.setFieldsValue({
      tipoBanco: type.toUpperCase()
    });
  }

  const onFinish = (values) => {
    dispatch(showLoader());
    let datos = {
      ...values,
      metodoPago: tipoBanco,
    };
    //setBlockPage(true);
    try {
      suscripcionService.crearSuscripcion(datos).then(({data})=> {
        console.log(data);
        dispatch(showLoader(false));
      });
    } catch (error) {
      toastr.error("Hubo un error, comunícate con Wiqli, por favor.");
      dispatch(showLoader(false));
    }
  };

  return (
    <div className="baseWiqliForm">
      <Container className="contenedorSimple">
        <h2 className="tituloPrincipal">Suscríbete y obtén beneficios exclusivos.</h2>
        <Form
          layout="vertical"
          onFinish={onFinish}
        >
            <div className="grupoForm">
              <div className="pasarelaDePago">
                <div className="inputDataPago">
                  <Form.Item 
                    label="Dni" 
                    name="dni"
                    rules={[{ required: true, message: 'Por favor ingresa tu número de DNI.' }]} 
                  >
                    <Input className="form-control" placeholder="Ejm. 70019407" minLength={8} maxLength={8} />
                  </Form.Item>
                  <Form.Item 
                    label="Número de tarjeta" 
                    name="numeroTarjeta"
                    rules={[{ required: true, message: 'Por favor ingresa el número de tarjeta.' }]} 
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
            {
              <p>{messageError}</p>
            }
          <Form.Item>
            <Button type="primary" htmlType="submit" className="botonFinal">
              Suscríbete
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </div>
  );
}
  
export default CreacionSuscripcion;
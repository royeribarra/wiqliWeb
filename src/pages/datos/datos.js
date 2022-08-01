import React from "react";
import { Container } from "react-bootstrap"
import logo from "../../images/logo.png"
import './home.css';
import ProductList from "../../components/productList/productList";


function Datos() 
{
  return (
      <div className="baseMorada">
        <Container className="contenedorSimple">
        <Form 
                    method="post" 
                    layout="vertical"
                    onFinish={onFinish}
                    form={form}
                    initialValues={{
                      departamento: 'Lima',
                      provincia: 'Lima',
                      distrito: '',
                      referencia: ''
                    }}
                  >
                    <div className="row gx-5">
                      <div className="col-md-6">
                        <Form.Item
                          label="Nombres"
                          name="nombres"
                          rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}                
                        >
                          <Input className="form-control" placeholder="Nombres"  />
                        </Form.Item>
                      </div>
                      <div className="col-md-6">
                        <Form.Item
                          label="Apellidos"
                          name="apellidos"
                          rules={[{ required: true, message: 'Por favor ingresa tus apellidos' }]}                
                        >
                          <Input className="form-control" placeholder="Apellidos"  />
                        </Form.Item>
                      </div>
                    </div>
                    <div>
                      <label>Dirección de recojo</label>
                    </div>
                    <div className="row gx-5">
                      <div className="col-md-6">
                        <Form.Item
                          name={"departamento"}
                          label="Ciudad"
                        >
                          <Select>
                            <Option value="Lima">Lima</Option>
                          </Select>
                        </Form.Item>
                      </div>
                      <div className="col-md-6">
                        <Form.Item
                          name="distrito"
                          label="Distrito"
                          rules={[{ required: true, message: 'Por favor selecciona tu distrito' }]}   
                        > 
                          <SelectorDistritoComponent asignarDistrito={asignarDistrito} />
                        </Form.Item>
                      </div>
                    </div>
                    <Form.Item
                      label="Dirección"
                      name="direccion"
                      rules={[{ required: true, message: 'Por favor ingresa tu dirección' }]} 
                    >
                      <GooglePlacesAutocomplete
                        apiKey="AIzaSyBq2h5I8wpxJdQoGtSIVYPbBfCXkA4_vTk"
                        selectProps={{
                          value,
                          onChange: obtenerDireccion,
                        }}
                      />
                    </Form.Item>
                    <Map
                      containerElement= {<div style={{ height: `400px` }} />}
                      mapElement={<div style={{ height: `100%` }} />}
                      loadingElement = { <p>Cargando</p> }
                      latitud={latitud}
                      longitud={longitud}
                      indicarPosicion = {indicarPosicion}
                      enviarDatos = {enviarDatos}
                    />
                    <br />
                    <Form.Item
                      name="referencia"
                      label="Referencia"        
                    >
                      <Input className="form-control" placeholder="N° de dpto./of..." />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Correo"
                      rules={[{ required: true, message: 'Por favor ingresa tu correo' }]}                
                    >
                      <Input className="form-control" placeholder="Correo" />
                    </Form.Item>
                    <div className="row gx-5">
                      <div className="col-md-6">
                        <Form.Item
                          name="celular"
                          label="Celular"
                          rules={[{ required: true, message: 'Por favor ingresa tu celular' }]}                
                        >
                          <Input className="form-control" placeholder="Celular" />
                        </Form.Item>
                      </div>
                      <div className="col-md-6">
                        <Form.Item
                          name="dni"
                          label="DNI"
                          rules={[{ required: true, message: 'Por favor ingresa tu DNI' }]}                
                        >
                          <Input className="form-control" placeholder="DNI" />
                        </Form.Item>
                      </div>
                    </div>
                    <Form.Item 
                      name="fecha" 
                      label="Fecha de recojo" 
                      rules={[{ required: true, message: 'Selecciona una fecha' }]}
                      className="selector-fecha"
                    >
                      <DatePicker
                        placeholder="Seleccionar una fecha"
                        format="YYYY-MM-DD"
                        disabledDate={disabledDate}
                      />
                    </Form.Item>
                    <p>
                      Horario 
                      {gestion.tipo_servicio === 2 ? ' 12:00pm a 6:00pm' : ' 9:00 am - 1:00 pm'}
                    </p>
                    {
                      gestion.tipo_servicio === 2 && 
                      <h6 style={{color:"red", fontSize: "70%"}}><i>Tu cambio express solo será recogido al día siguiente si lo solicitas después de las 12:00 pm</i></h6>
                    }
                    <Button type="primary" htmlType="submit" style={{borderRadius: "28px"}} className="btn btn-repo fw-500 mb-3 mb-sm-0">
                      Proceder a pagar
                    </Button>
                  </Form>
        </Container>
      </div>

  );
}
  
export default Datos;
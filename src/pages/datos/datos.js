import React from "react";
import { Container } from "react-bootstrap"
import { Form, Input, Select, DatePicker, Button } from 'antd';
import logo from "../../images/logo.png"
import './datos.css';
import ProductList from "../../components/productList/productList";

const { Option } = Select;
const { TextArea } = Input;
function Datos() 
{
  const [form] = Form.useForm();
  const onFinish = () => {

  }

  return (
    <div className="baseMorada">
      <Container className="contenedorSimple">
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <div className="row">
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
            <div className="col-md-6">
              <Form.Item
                name="celular"
                label="Número"
                rules={[{ required: true, message: 'Por favor ingresa tu celular' }]}                
              >
                <Input className="form-control" placeholder="Ej. 939784580" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="email"
                label="Correo de contacto"
                rules={[{ required: true, message: 'Por favor ingresa tu correo' }]}                
              >
                <Input className="form-control" placeholder="Ej. wiqli@contacto.pe" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="direccion"
                label="Dirección de recojo"        
              >
                <Input className="form-control" placeholder="Av. Aurelio Miroquesada 117" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="referencia"
                label="Detalle de dirección"        
              >
                <Input className="form-control" placeholder="N° de dpto./of..." />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item 
                name="fecha" 
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
            <div className="col-md-6">
              <Form.Item label="Anotaciones adicionales">
                <TextArea rows={4} placeholder="anotaciones adicionales" />
              </Form.Item>
            </div>
          </div>
          <Button type="primary" htmlType="submit">
            Proceder a pagar
          </Button>
        </Form>
      </Container>
    </div>
  );
}
  
export default Datos;
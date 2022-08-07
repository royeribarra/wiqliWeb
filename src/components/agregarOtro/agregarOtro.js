import React from "react";
import './agregarOtro.css';
import { Form, Select, Input, Button, Space  } from 'antd';
import agregar from "../../images/agregar.png"
import quitar from "../../images/quitar.png"
import TextArea from "antd/lib/input/TextArea";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
function AgregarOtro({ form, title, nombre}) 
{
  const sights = {
    Beijing: ['Tiananmen', 'Great Wall'],
    Shanghai: ['Oriental Pearl', 'The Bund'],
  };

  const onFinish = (e, values) => {
    console.log(e)
    console.log('Received values of form:', values);
    console.log(form.getFieldsValue())
  };

  return (
    <div>
      <h5>{title} (opcional)</h5>
      <Form
        form={form}
        onFinish={onFinish}
      >
        <Form.List name={nombre}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline productoAdicionalAgregado">
                  <div className="eliminarProductoAgregado">
                  <div onClick={() => remove(field.name)} className="botonBorrarProductoAgregado" >
                  <img
                  src={quitar}
                  />
                  <p className="botonAgregarMasProductos">Quitar</p>
                  </div>
                  </div>
                  <div className="detallesDeProductoAgregado">
                  <div className="itemForm">
                    <Form.Item 
                      label="Nombre de producto"
                      name={[field.name, 'productoAdicionalNombre']}
                    >
                      <TextArea rows={1} placeholder="Kiwi" />
                    </Form.Item>
                  </div>
                  <div className="itemForm">
                    <Form.Item 
                      label="Peso o cantidad"
                      name={[field.name, 'productoAdicionalCantidad']}
                    >
                      <TextArea rows={1} placeholder="1 Kilo" />
                    </Form.Item>
                  </div>
                  </div>
                </Space>
              ))}
              <Form.Item>
                
                <Button 

                  type="dashed" 
                  onClick={() => add()} block 
                  className="botonAgregarMasProductos"
                >
                  <div className="contenedorBotonAgregarNuevo">
                  <img
                  src={agregar}
                  />
                  <p className="botonAgregarMasProductos">Agregar otro producto</p>
                  </div>
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
}

export default AgregarOtro;
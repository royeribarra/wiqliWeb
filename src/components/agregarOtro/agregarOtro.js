import React from "react";
import './agregarOtro.css';
import { Form, Select, Input, Button, Space  } from 'antd';
import agregar from "../../images/agregar.png"
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
                <Space key={field.key} align="baseline">
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
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button 
                  type="dashed" 
                  onClick={() => add()} block icon={<PlusOutlined />}
                  className="botonAgregarMasProductos"
                >
                  Agregar
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
import React, { useEffect } from "react";
import './agregarOtro.css';
import { Form, Button, Space  } from 'antd';
import agregar from "../../images/agregar.png"
import check from "../../images/check.png"
import TextArea from "antd/lib/input/TextArea";
function AgregarOtroProducto({ title, nombre, agregarProductoStorage}) 
{
  const [form] = Form.useForm();
  const onFinish = (e, values) => {
  };

  const add = () => {
    let values = form.getFieldsValue();
    let producto = {nombre: values.productoAdicionalNombre, cantidad: values.productoAdicionalCantidad, id: Math.floor(Math.random() * 1000)};
    if(!values.productoAdicionalCantidad || !values.productoAdicionalNombre){
      return;
    }
    agregarProductoStorage(producto, nombre);
    
    form.setFieldsValue({
      productoAdicionalNombre: '',
      productoAdicionalCantidad: ''
    });
  }

  const remove = () => {
  }

  useEffect(()=> {
    if(sessionStorage.getItem(nombre)){
      let productosStorage = JSON.parse(sessionStorage.getItem(nombre));
      sessionStorage.setItem(nombre, JSON.stringify(productosStorage));
    }else{
      sessionStorage.setItem(nombre, JSON.stringify([]));
    }
  }, []);

  return (
    <div>
      <h5>{title} (opcional)</h5>
      <Form
        form={form}
        onFinish={onFinish}
      >
        <Space align="baseline productoAdicionalAAgregar">
          <div className="detallesDeProductoAgregado">
            <div className="itemForm">
              <Form.Item 
                label="Nombre de producto"
                name={['productoAdicionalNombre']}
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa un nombre!',
                  },
                ]}
              >
                <TextArea rows={1} placeholder="Kiwi" />
              </Form.Item>
            </div>
            <div className="itemForm">
              <Form.Item 
                label="Peso o cantidad"
                name={['productoAdicionalCantidad']}
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa una cantidad!',
                  },
                ]}
              >
                <TextArea rows={1} placeholder="1 Kilo" />
              </Form.Item>
            </div>
          </div>
          <div className="agregarProductoAdicional" onClick={add}>
            <div className="botonBorrarProductoAgregado" >
              <img
                src={check}
                alt="eliminar producto carrito otro"
              />
              <p className="botonAgregarMasProductos">Agregar</p>
            </div>
          </div>
        </Space>
      <Form.Item>
        <Button 
          type="dashed" 
          onClick={() => add()} block 
          className="botonAgregarMasProductos"
        >
          <div className="contenedorBotonAgregarNuevo">
          <img
            src={agregar}
            alt="agregar producto carrito otro"
          />
          <p className="botonAgregarMasProductos">Agregar otro producto</p>
          </div>
        </Button>
      </Form.Item>
      </Form>
    </div>
  );
}

export default AgregarOtroProducto;
import React, { useEffect } from "react";
import './agregarOtro.css';
import { Form, Space  } from 'antd';
import check from "../../images/check.png"
import TextArea from "antd/lib/input/TextArea";
import { toastr } from "react-redux-toastr";
import { useDispatch } from "react-redux";
import { SaddToExtra } from "../../redux/actions/suscripcionActions";

function AgregarOtroProducto({ 
  title, nombre, agregarProductoStorage, tipoLista, categoriaId
}) 
{
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const add = () => {
    let values = form.getFieldsValue();
    let producto = {
      nombre: values.productoAdicionalNombre, 
      cantidad: values.productoAdicionalCantidad, 
      id: Math.floor(Math.random() * 1000),
      categoriaId: categoriaId
    };
    if(!values.productoAdicionalCantidad || !values.productoAdicionalNombre){
      toastr.error("Por favor ingresa un nombre y cantidad.");
      return;
    }

    if(tipoLista === 2)
    {
      dispatch(SaddToExtra(producto));
    }
    
    //agregarProductoStorage(producto, nombre);
    
    form.setFieldsValue({
      productoAdicionalNombre: '',
      productoAdicionalCantidad: ''
    });
  }

  useEffect(()=> {
    if(localStorage.getItem(nombre)){
      let productosStorage = JSON.parse(localStorage.getItem(nombre));
      localStorage.setItem(nombre, JSON.stringify(productosStorage));
    }else{
      localStorage.setItem(nombre, JSON.stringify([]));
    }
  }, []);

  return (
    <div>
      <h5>{title} (opcional)</h5>
      <Form
        form={form}
      >
        <Space align="baseline productoAdicionalAAgregar">
          <div className="detallesDeProductoAgregado">
            <div className="itemForm">
              <Form.Item 
                className="labelProductoAdicional"
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
                className="labelProductoAdicional"
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
      </Form>
    </div>
  );
}

export default AgregarOtroProducto;
import React, { useEffect, useState } from 'react';
import { Affix, Button, Form } from 'antd';
import { Container } from "react-bootstrap"
import logo from "../../images/logo.png"
import siguiente from "../../images/siguiente.png"
import './home.css';
import ProductList from "../../components/productList/productList";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

function Home() 
{
  let history = useNavigate();
  const[productos, setProductos] = useState([]);
  const[productosCarrito, setProductosCarrito] = useState([]);
  const[total, setTotal] = useState(0);

  const [formOtrosFrutas] = Form.useForm();
  const [formOtrosVerduras] = Form.useForm();
  const [formOtrosCarnes] = Form.useForm();
  const [formOtrosMenestras] = Form.useForm();

  const getProductos = () => {
    axios
    .get(`${process.env.REACT_APP_BASE_PATH}/wiqli/productos/todos`)
    .then(({ data }) => {
      console.log(data);
      setProductos(data);
    });
  }

  const agregarProducto = (producto) => {
    producto.cantidad = 1;
    let new_productos = [...productosCarrito];
    let result = new_productos.find(
      (el) => el.id === producto.id
    );
    if(!result){
      new_productos.push(producto);
      setProductosCarrito(new_productos);
    }
  }

  const quitarProducto = (producto) => {
    let new_productos = [...productosCarrito];
    const index = new_productos.findIndex(
      (el) => el.id === producto.id
    );
    new_productos.splice(index, 1);
    setProductosCarrito(new_productos);
  }

  const aumentarUnidades = (producto) => {
    let new_productos = [...productosCarrito];
    const index = new_productos.findIndex(
      (el) => el.id === producto.id
    );
    new_productos[index].cantidad += 1;
    setProductosCarrito(new_productos);
  }

  const disminuirUnidades = (producto) => {
    let new_productos = [...productosCarrito];
    const index = new_productos.findIndex(
      (el) => el.id === producto.id
    );
    new_productos[index].cantidad -= 1;
    setProductosCarrito(new_productos);
  }

  const goToFormularioDatos = () => {
    console.log(productosCarrito);
    console.log(formOtrosFrutas.getFieldsValue())
    console.log(formOtrosVerduras.getFieldsValue())
    console.log(formOtrosCarnes.getFieldsValue())
    console.log(formOtrosMenestras.getFieldsValue())
    localStorage.setItem('productos', JSON.stringify(productosCarrito));
    localStorage.setItem('otrosFrutas', JSON.stringify(formOtrosFrutas.getFieldsValue()));
    localStorage.setItem('otrosVerduras', JSON.stringify(formOtrosVerduras.getFieldsValue()));
    localStorage.setItem('otrosCarnes', JSON.stringify(formOtrosCarnes.getFieldsValue()));
    localStorage.setItem('otrosMenestras', JSON.stringify(formOtrosMenestras.getFieldsValue()));
    history(`/datos`);
  }

  const calcularTotal = () => {
    let total = 0;
    productosCarrito.forEach((producto) => {
      total += producto.cantidad * producto.precio_unitario
    })
    setTotal(total);
  }

  useEffect(() => {
    getProductos();
  }, [])

  useEffect(() => {
    calcularTotal();
  }, [productosCarrito])

  return (
    <div className="gradienteMedio">
      <div className="baseMorada">
        <Container className="contenedorSimple">
          <div className="baseLanding">
            <img
              src={logo}
              className="logoNav"
              alt="wiqli"
            />
            <h2 className="tituloPrincipal">¡Haz las compras sin moverte de donde estás con la mejor calidad del mercado!</h2>
            <h5 className="tituloEnunciativo">¡Solo llena el formulario de abajo y listo!</h5>
            <h5 className="tituloEnunciativo">Pagas cuando te entreguemos tus productos</h5>
          </div>
          <div>
            <ProductList 
              productos={productos} 
              agregarProducto={agregarProducto}
              quitarProducto={quitarProducto}
              aumentarUnidades={aumentarUnidades}
              disminuirUnidades={disminuirUnidades}
              formOtrosFrutas={formOtrosFrutas}
              formOtrosVerduras={formOtrosVerduras}
              formOtrosCarnes={formOtrosCarnes}
              formOtrosMenestras={formOtrosMenestras}
            />
          </div>
          <Affix offsetBottom={40} onChange={(affixed) => console.log(affixed)}>
            {/* <NavLink to="/datos"> */}
              <Button className='botonDeSiguiente' onClick={goToFormularioDatos}>
                <div className='botonOrdenado'>
                  <p className='textoDePrecio'>(S/ {parseFloat(total).toFixed(2)})</p>
                  <div className='clickASiguiente'>
                    <p>Siguiente</p>
                    <img 
                      src={siguiente}
                      alt="wiqli compras semanales"
                    />
                  </div>
                </div>
              </Button>
            {/* </NavLink> */}
          </Affix>
        </Container>
      </div>
    </div>
  );
}
  
export default Home;
import React, { useEffect, useState } from 'react';
import { Affix, Button, Form } from 'antd';
import { Container } from "react-bootstrap";
import logo from "../../images/logo.png";
import visa from "../../images/visa.png";
import mastercard from "../../images/mastercard.jpg";
import amex from "../../images/amex.jpg";
import plin from "../../images/plin.png";
import yape from "../../images/yape.png";
import sol from "../../images/sol.png";
import siguiente from "../../images/siguiente.png";
import './home.css';
import ProductList from "../../components/productList/productList";
import { useNavigate } from "react-router-dom";
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

  const getProductoStorage = () => {
    if(sessionStorage.getItem('productos')){
      let productosStorage = JSON.parse(sessionStorage.getItem('productos'));
      setProductosCarrito(productosStorage);
    }
  }

  const getProductos = () => {
    axios
    .get(`${process.env.REACT_APP_BASE_PATH}/wiqli/productos/todos`)
    .then(({ data }) => {
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
    if(total === 0){
      return ;
    }else{
      sessionStorage.setItem('productos', JSON.stringify(productosCarrito));
      sessionStorage.setItem('otrosFrutas', JSON.stringify(formOtrosFrutas.getFieldsValue()));
      sessionStorage.setItem('otrosVerduras', JSON.stringify(formOtrosVerduras.getFieldsValue()));
      sessionStorage.setItem('otrosCarnes', JSON.stringify(formOtrosCarnes.getFieldsValue()));
      sessionStorage.setItem('otrosMenestras', JSON.stringify(formOtrosMenestras.getFieldsValue()));
      history(`/datos`);
    }
  }

  const calcularTotal = () => {
    let total = 0;
    productosCarrito.forEach((producto) => {
      if(producto.cantidad_minima === 1){
        total += producto.cantidad * producto.precio_unitario
      }else{
        total += producto.cantidad * (producto.precio_unitario*producto.cantidad_minima)
      }
    })
    setTotal(total);
  }

  useEffect(() => {
    getProductos();
    getProductoStorage();
  }, [])

  useEffect(() => {
    calcularTotal();
  }, [productosCarrito])

  return (
    <div className="gradienteMedio">
      <div className="baseWiqli">
        <Container className="contenedorSimple contenedorProductos">
          <div className="baseLanding">
            <img
              src={logo}
              className="logoLanding"
              alt="wiqli"
            />
            <h2 className="tituloPrincipal">¡Haz tus compras semanales sin moverte de casa con Wiqli!</h2>
            <h5 className="tituloEnunciativo">¡Te ofrecemos la mejor calidad a un súper precio!</h5>
            <h5 className="textoDisclaimer">Realiza tu pedido semanal hasta el sábado a las 7:00pm y paga cuando lo recibas.</h5>
            <div className='disclaimerPago'>
            <h5 className="textoDisclaimer">Aceptamos todos los medios de pago</h5>
            <div className='mediosDePago'>
              <img className='medioDePago' src={visa}></img>
              <img className='medioDePago' src={mastercard}></img>
              <img className='medioDePago' src={amex}></img>
              <img className='medioDePago' src={yape}></img>
              <img className='medioDePago' src={plin}></img>
              <img className='medioDePago' src={sol}></img> 
            </div>
            </div>
          </div>
          <div className='listaDeProductos'>
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
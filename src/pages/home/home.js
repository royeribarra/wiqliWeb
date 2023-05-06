import React, { useEffect, useState } from 'react';
import { Affix, Button } from 'antd';
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
import { toastr } from "react-redux-toastr";
import ModalTarea from './modalTarea';
import { UsuarioService } from "../../servicios/usuarioService";
import { useDispatch, useSelector } from 'react-redux';
import {
  fillCart
} from "../../redux/actions/carritoActions";
import Carrito from "../../components/carrito/carrito";
import carrito from "../../images/carritoCompras.png"
import { setCuponCliente, setTotalReferidosCliente } from '../../redux/actions/clienteLogAction';

function Home() 
{
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { cart, totalProductos } = state.cart;
  let history = useNavigate();
  const[showModal, setShowModal] = useState(true);
  const [showCarrito, setShowCarrito] = useState(false);

  const goToFormularioDatos = () => {
    if(totalProductos === 0){
      toastr.error("Debes agregar al menos un producto para pasar a la siguiente sección.");
      
    }else{
      localStorage.setItem('productos', JSON.stringify(cart));
      history(`/datos`);
    }
  }

  const obtenerCodigoCuponDescuento = () => {
    const userService = new UsuarioService("cliente/cupon-descuento");
    userService.obtenerCodigoCuponDescuento()
    .then(({data})=> {
      if(data.state){
        localStorage.setItem('codigoCupon', data.cupon);
        dispatch(setCuponCliente(data.cupon));
      }
    });
  };

  const obtenerTotalReferidos = () => {
    const userService = new UsuarioService("pedidos/descuento-referidos");
    userService.obtenerTotalReferidos()
    .then(({data})=> {
      localStorage.setItem('descuentoTotal', data);
      dispatch(setTotalReferidosCliente(data));
    });
  };

  const seleccionarNuevo = () => {
    localStorage.setItem('seleccionTarea', true);
    obtenerTotalReferidos();
    obtenerCodigoCuponDescuento();
    setShowModal(false);
  };

  const seleccionarUltimaCompra = () => {
    const userService = new UsuarioService("pedido/ultimo");
    userService.obtenerProductosUltimoPedido()
    .then(({data})=> {
      dispatch(fillCart(data));
      localStorage.setItem('seleccionTarea', true);
      setShowModal(false);
    });
    obtenerTotalReferidos();
    obtenerCodigoCuponDescuento();
  };

  const toggleShowCarrito = () => {
    setShowCarrito((s) => !s);
  }

  useEffect(()=> {
    let tarea = localStorage.getItem('seleccionTarea');
    let token = localStorage.getItem('tknData');
    if(token){
      if(tarea){
        setShowModal(false);
      }else{
        setShowModal(true);
      }
    }else{
      setShowModal(false);
    }
  }, []);

  return (
    <div className="gradienteMedio">
      <div className="baseWiqli">
        <ModalTarea 
          showModal={showModal}
          seleccionarNuevo={seleccionarNuevo}
          seleccionarUltimaCompra={seleccionarUltimaCompra}
        />
        <Container className="contenedorSimple contenedorProductos">
          <div className="baseLanding">
            <img
              src={logo}
              className="logoLanding"
              alt="wiqli"
            />
            <h2 className="tituloPrincipal">¡Haz tus compras semanales sin moverte de casa con Wiqli!</h2>
            <h5 className="tituloEnunciativo">¡Te ofrecemos la mejor calidad a un súper precio!</h5>
            <h5 className="textoDisclaimer">Realiza tu pedido semanal hasta el domingo a las 9:00pm y paga cuando lo recibas.</h5>
            <div className='disclaimerPago'>
            <h5 className="textoDisclaimer">Aceptamos todos los medios de pago</h5>
            <div className='mediosDePago'>
              <img className='medioDePago' alt='visa' src={visa}></img>
              <img className='medioDePago' alt='mastercard' src={mastercard}></img>
              <img className='medioDePago' alt='amex' src={amex}></img>
              <img className='medioDePago' alt='yape' src={yape}></img>
              <img className='medioDePago' alt='plin' src={plin}></img>
              <img className='medioDePago' alt='efectivo' src={sol}></img> 
            </div>
            </div>
          </div>
          <div className='listaDeProductos'>
            <ProductList />
          </div>
          
          <Affix offsetBottom={40} onChange={(affixed) => console.log(affixed)}>
            <div className='contenedorBotones'>
              <Carrito showCarrito={showCarrito} setShowCarrito={setShowCarrito} />
              <div onClick={toggleShowCarrito} className='botonDeSiguiente'>
                <div className='botonOrdenado'>
                
                
                  <img
                    src={carrito}
                    height="30"
                    className="logoNav"
                    alt="wiqli"
                    style={{ cursor:"pointer" }}
                  />
                  <p className='textoDePrecio'>S/ {parseFloat(totalProductos).toFixed(2)}</p>
                </div>
              </div>
              <div className='botonDeSiguiente' onClick={goToFormularioDatos} style={{ cursor:"pointer" }}>
                <div className='botonOrdenado'>
                  <div className='clickASiguiente'>
                    <p className='textoDePrecio'>Siguiente</p>
                    <img 
                      src={siguiente}
                      alt="wiqli compras semanales"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Affix>
        </Container>
      </div>
    </div>
  );
}
  
export default Home;
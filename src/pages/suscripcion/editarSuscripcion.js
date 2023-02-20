import React, { useEffect, useState } from 'react';
import { Affix, Button } from 'antd';
import { Container, Form } from "react-bootstrap";
import logo from "../../images/logo.png";
import siguiente from "../../images/siguiente.png";
import './editarSuscripcion.css';
import { useNavigate } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import { UsuarioService } from "../../servicios/usuarioService";
import { useDispatch, useSelector } from 'react-redux';
import {
  fillCart
} from "../../redux/actions/carritoActions";
import ListaProductosSuscripcion from './listaProductosSuscripcion';

function EditarSuscripcion() 
{
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { cart } = state.cart;
  const { total } = state.suscripcion;
  let history = useNavigate();

  const getProductoStorage = () => {
    if(localStorage.getItem('productos')){
      let productosStorage = JSON.parse(localStorage.getItem('productos'));
      dispatch(fillCart(productosStorage));
    }
  }

  const guardarListaSuscripcion = () => {
    if(total === 0){
      toastr.error("Debes agregar al menos un producto para pasar a la siguiente sección.");
      
    }else{
      localStorage.setItem('productos', JSON.stringify(cart));
      history(`/datos`);
    }
  }

  const onChangeLapso = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    getProductoStorage();
  }, []);

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
            <h2 className="tituloPrincipal">¡Edita tu suscripción!</h2>
            <h5 className="tituloEnunciativo">Envíar pedido cada:</h5>
            
            <Form.Select aria-label="Default select example" onChange={onChangeLapso}>
              <option>Envíar pedido cada:</option>
              <option value="1">Semanal</option>
              <option value="2">2 semanas</option>
              <option value="3">3 semanas</option>
            </Form.Select>
            <h4 className="tituloEnunciativo">¡Edita tu pedido!</h4>
            <Button className='botonActualizarLista'>
              Actualizar lista
            </Button>
          </div>
          <div className='listaDeProductos'>
            <ListaProductosSuscripcion />
          </div>
          
          <Affix offsetBottom={40} onChange={(affixed) => console.log(affixed)}>
            <div className='contenedorBotones'>
              <div className='botonDeSiguiente'>
                <div className='botonOrdenado'>
                
                  <p className='textoDePrecio'>S/ {parseFloat(total).toFixed(2)}</p>
                </div>
              </div>
              <Button className='botonDeSiguiente' onClick={guardarListaSuscripcion}>
                <div className='botonOrdenado'>
                  <div className='clickASiguiente'>
                    <p>Guardar</p>
                    <img 
                      src={siguiente}
                      alt="wiqli compras semanales"
                    />
                  </div>
                </div>
              </Button>
            </div>
          </Affix>
        </Container>
      </div>
    </div>
  );
}
  
export default EditarSuscripcion;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Buffer } from 'buffer';

import Home from '../pages/home/home';
import Datos from '../pages/datos/datos';
import Registro from '../pages/registro/registro';
import Login from '../pages/login/login';
import Confirmacion from '../pages/paginaDeConfirmacion/confirmacion';
import PreConfirmacion from "../pages/paginaDeConfirmacion/preConfirmacion";
import ConfirmacionCorreo from "../pages/paginaDeConfirmacion/confirmacionCorreo";
import BeneficiosSuscripcion from "../pages/suscripcion/beneficiosSuscripcion";
import Suscripcion from "../pages/suscripcion/suscripcion";

import StorageService from "../servicios/storageService";

import Header from '../components/header/header';
import Loader from "../components/loader/loader";

import { login, setInfoCliente, setCuponCliente, setTotalReferidosCliente } from "../redux/actions/clienteLogAction";
import { UsuarioService } from "../servicios/usuarioService";
import axios from "axios";
import { fillProducts } from "../redux/actions/productosTiendaActions";
import { fillCart, fillCartExtra } from "../redux/actions/carritoActions";
import SeleccionPeriodo from "../pages/suscripcion/seleccionPeriodo";
import SeleccionProductos from "../pages/suscripcion/seleccionProductos";
import MetodoPago from "../pages/suscripcion/metodoPago";
import { SfillCart, SfillExtra, SinfoSuscription } from "../redux/actions/suscripcionActions";
import ConfirmacionSuscripcion from "../pages/suscripcion/confirmacionSuscripcion";
import { setConfiguration } from "../redux/actions/configuracionActions";
import PayU from "../components/PayU/payU";

function MainRoutes()
{
  const storageService = new StorageService();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { showLoader } = state.loader;

  useEffect(()=>{
    const token = localStorage.getItem("tknData");
    if(token){
      const tknData = JSON.parse(Buffer.from(storageService.getItemObject("tknData"), 'base64'));
      if(tknData.status){
        const userService = new UsuarioService();
        userService.getInfoUser().then(({data})=> {
          
          dispatch(setInfoCliente(data));
        });
        userService.getProductosSuscripcion().then(({data})=> {
          
          dispatch(SinfoSuscription({
            suscripcionId: data.id,
            subCart: data.productos.filter((item) => item.productoId !== 999),
            xtraSubCart: data.productos.filter((item) => item.productoId === 999),
            periodo: data.periodo,
            diaEntrega: data.diaEntrega
          }));
        });
        dispatch(login());
      }
    }
  }, []);

  useEffect(()=> {
    const productos = JSON.parse(localStorage.getItem("productos"));
    const expiration = localStorage.getItem("expiration");
    const xtraCart = JSON.parse(localStorage.getItem("xtraCart"));
    dispatch(fillCartExtra(xtraCart ? xtraCart : []));

    if(expiration)
    {
      const exp2 = new Date(expiration)
      const now = new Date();
      if ((now.getTime() - exp2.getTime()) > (12 * 60 * 60 * 1000)) 
      {
        localStorage.removeItem("expiration");
        dispatch(fillCart([]));
      } else {
        dispatch(fillCart(productos ? productos : []));
      }
    }
    
  }, []);

  useEffect(()=> {
    const subProductos = JSON.parse(localStorage.getItem("subProductos"));
    dispatch(SfillCart(subProductos ? subProductos : []));
    const xtraSubCart = JSON.parse(localStorage.getItem("xtraSubCart"));
    dispatch(SfillExtra(xtraSubCart ? xtraSubCart : []));
  }, []);

  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_BASE_PATH}/wiqli/configuracion`).then(({data})=> {
      dispatch(setConfiguration(data)) 
    });
  }, []);

  useEffect(()=> {
    const descuentoTotal = storageService.getItemObject('descuentoTotal');
    const cupon = storageService.getItemObject('codigoCupon');
    if(descuentoTotal){
      dispatch(setTotalReferidosCliente(descuentoTotal));
    }
    if(cupon){
      dispatch(setCuponCliente(cupon));
    }
  }, []);

  useEffect(()=> {
    axios
    .get(`${process.env.REACT_APP_BASE_PATH}/wiqli/productos/todos`)
    .then(({ data }) => {
      dispatch(fillProducts(data));
    });
  }, []);

  return(
    <BrowserRouter>
      <Header />
      <div className={ showLoader ? "" : "loaderInvisible"}>
        <Loader></Loader>
      </div>
      <Routes>
        <Route exact path="/payu-metodos-pago" element={<PayU />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/datos" element={<Datos />} />
        <Route exact path="/confirmacion" element={<Confirmacion />} />

        <Route exact path="/crear-suscripcion/" element={<Suscripcion />}>
          <Route exact path="" element={<BeneficiosSuscripcion suscripcion={1} />} />
          <Route exact path="seleccion-periodo" element={<SeleccionPeriodo suscripcion={1} />} />
          <Route exact path="seleccion-productos" element={<SeleccionProductos suscripcion={1} />} />
          <Route exact path="metodo-pago" element={<MetodoPago suscripcion={1} />} />
        </Route>
        <Route exact path="/editar-suscripcion/" element={<Suscripcion />}>
          <Route exact path="" element={<BeneficiosSuscripcion suscripcion={2} />} />
          <Route exact path="seleccion-periodo" element={<SeleccionPeriodo suscripcion={2} />} />
          <Route exact path="seleccion-productos" element={<SeleccionProductos suscripcion={2}  />} />
          <Route exact path="metodo-pago" element={<MetodoPago suscripcion={2} />} />
        </Route>

        <Route exact path="/beneficios-suscripcion" element={<BeneficiosSuscripcion />} />
        <Route exact path="/confirmacion-suscripcion" element={<ConfirmacionSuscripcion />} />

        <Route exact path="/registro-completo" element={<PreConfirmacion />} />
        <Route exact path="/verificar-correo/:codigo" element={<ConfirmacionCorreo />} />
        <Route exact path="/registro" element= {<Registro/> } />
        <Route exact path="/login" element= {<Login/> } />
        <Route
          exact
          path="*"
          element={<Navigate to="/" replace />}
        />
        <Route
          exact
          path="home"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes;
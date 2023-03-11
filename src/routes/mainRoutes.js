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
import CreacionSuscripcion from "../pages/suscripcion/crearSuscripcion";

import StorageService from "../servicios/storageService";

import Header from '../components/header/header';
import Loader from "../components/loader/loader";

import { login, setInfoCliente, setCuponCliente, setTotalReferidosCliente } from "../redux/actions/clienteLogAction";
import EditarSuscripcion from "../pages/suscripcion/editarSuscripcion";
import { UsuarioService } from "../servicios/usuarioService";
import axios from "axios";
import { fillProducts } from "../redux/actions/productosTiendaActions";
import { fillCart } from "../redux/actions/carritoActions";
import SeleccionPeriodo from "../pages/suscripcion/seleccionPeriodo";
import SeleccionProductos from "../pages/suscripcion/seleccionProductos";
import MetodoPago from "../pages/suscripcion/metodoPago";
import { SfillCart, SfillExtra } from "../redux/actions/suscripcionActions";
import ConfirmacionSuscripcion from "../pages/suscripcion/confirmacionSuscripcion";

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
        dispatch(login());
      }
    }
  }, []);

  useEffect(()=> {
    const productos = JSON.parse(localStorage.getItem("productos"));
    dispatch(fillCart(productos ? productos : []));
  }, []);

  useEffect(()=> {
    const subProductos = JSON.parse(localStorage.getItem("subProductos"));
    dispatch(SfillCart(subProductos ? subProductos : []));
    const xtraSubCart = JSON.parse(localStorage.getItem("xtraSubCart"));
    dispatch(SfillExtra(xtraSubCart ? xtraSubCart : []));
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
        <Route exact path="/" element={<Home />} />
        <Route exact path="/datos" element={<Datos />} />
        <Route exact path="/confirmacion" element={<Confirmacion />} />

        <Route exact path="/crear-suscripcion/" element={<CreacionSuscripcion />}>
          <Route exact path="" element={<BeneficiosSuscripcion />} />
          <Route exact path="seleccion-periodo" element={<SeleccionPeriodo />} />
          <Route exact path="seleccion-productos" element={<SeleccionProductos />} />
          <Route exact path="metodo-pago" element={<MetodoPago />} />
        </Route>

        <Route exact path="/beneficios-suscripcion" element={<BeneficiosSuscripcion />} />
        <Route exact path="/confirmacion-suscripcion" element={<ConfirmacionSuscripcion />} />
        <Route exact path="/editar-suscripcion" element={<CreacionSuscripcion />} />

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
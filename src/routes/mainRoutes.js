import React, { useEffect, useState } from "react";
import Home from '../pages/home/home';
import Datos from '../pages/datos/datos';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Registro from '../pages/registro/registro';
import Login from '../pages/login/login';
import Confirmacion from '../pages/paginaDeConfirmacion/confirmacion';
import Header from '../components/header/header';
import PreConfirmacion from "../pages/paginaDeConfirmacion/preConfirmacion";
import ConfirmacionCorreo from "../pages/paginaDeConfirmacion/confirmacionCorreo";
import StorageService from "../servicios/storageService";
import {Buffer} from 'buffer';

function MainRoutes()
{
  const storageService = new StorageService();
  const [userLocal, setUserLocal] = useState();
  const [isLoged, setIsLoged] = useState(false);
  const [codigoCliente, setCodigoCliente] = useState("None");
  const [descuentoReferidoCliente, setDescuentoReferidoCliente] = useState(0);

  const obtenerDataCliente = () => {
    const descuentoSto = storageService.getItemObject('descuentoTotal');
    if(descuentoSto){
      setDescuentoReferidoCliente(descuentoSto);
    }
    const cuponSto = storageService.getItemObject('codigoCupon');
    if(descuentoSto){
      setCodigoCliente(cuponSto);
    }
  };

  useEffect(()=>{
    const token = localStorage.getItem("tknData");
    if(token){
      const tknData = JSON.parse(Buffer.from(storageService.getItemObject("tknData"), 'base64'));
      if(tknData.status){
        setUserLocal(JSON.parse(Buffer.from(storageService.getItemObject("authUser"), 'base64')));
        setIsLoged(true);
      }
    }
  }, []);

  return(
    <BrowserRouter>
      <Header 
        userLocal={userLocal} 
        isLoged={isLoged} 
        codigoCliente={codigoCliente} 
        descuentoReferidoCliente={descuentoReferidoCliente} 
      />
      <Routes>
        <Route exact path="/" element={<Home obtenerDataCliente={obtenerDataCliente} />} />
        <Route exact path="/datos" element={<Datos />} />
        <Route exact path="/confirmacion" element={<Confirmacion />} />
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
import React from "react";
import Home from '../pages/home/home';
import Datos from '../pages/datos/datos';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Registro from '../pages/registro/registro';
import Login from '../pages/login/login';
import Confirmacion from '../pages/paginaDeConfirmacion/confirmacion';
import Header from '../components/header/header';
import PreConfirmacion from "../pages/paginaDeConfirmacion/preConfirmacion";
import ConfirmacionCorreo from "../pages/paginaDeConfirmacion/confirmacionCorreo";

function MainRoutes()
{
  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
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
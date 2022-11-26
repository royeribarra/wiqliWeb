import React from "react";
import Home from '../pages/home/home';
import Datos from '../pages/datos/datos';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Registro from '../pages/registro/registro';
import Login from '../pages/login/login';
import Confirmacion from '../pages/paginaDeConfirmacion/confirmacion';
import Header from '../components/header/header';
import { UserAuth } from "./RequireAuth/RequireAuth";

function ClienteRoutes()
{
  return(
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/cliente/" element={<RepoGenerarPeticion />}>
          <Route path="seleccion-producto-a-devolver/:tiendaId/:codigoCompra" element={<SeleccionProductoDevolucion />} />
          <Route path="seleccion-nuevos-productos/:tiendaId/:gestionId" element={<SeleccionNuevoProducto />} />
          <Route path="asignar-datos-devolucion/:tiendaId/:gestionId/:codigoRepo" element={<RepoDatosDevolucion />} />
          <Route path="formulario-pago/:gestionId/:codigoRepo" element={<RepoPago />} />
          <Route path="proceso-terminado/:gestionId/:codigoRepo" element={<RepoProcesoTerminado />} />
        </Route>
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

export default ClienteRoutes;
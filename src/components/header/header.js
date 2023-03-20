import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Offcanvas, Button } from "react-bootstrap";

import logo from "../../images/miniLogo.png"
import whatsapp from "../../images/whatsapp.png"
import carrito from "../../images/carritoCompras.png"

import { useLocation, useNavigate } from 'react-router-dom';
import StorageService from '../../servicios/storageService';
import LogService from '../../servicios/logService';

import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Alert, Space, Tour } from 'antd';

import './header.css';
import Carrito from "../carrito/carrito";
import { useSelector } from "react-redux";
import { SuscripcionService } from "../../servicios/suscripcionservice";

function Header() 
{
  const storageService = new StorageService();
  const logService = new LogService();
  
  let history = useNavigate();
  const location = useLocation();
  const state = useSelector((state) => state);
  const { infoUser, isLoged, codigoUser, descuentoReferidos} = state.user;

  
  const [isHome, setIsHome] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showCarrito, setShowCarrito] = useState(false);
  
  
  const copiarCodigoReferido = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const getHome = () => {
    let home = false
    if(window.location.pathname === "/"){
      home = true;
    }
    setIsHome(home)
  };

  const cerrarSesion = () => {
    const { access_token } = storageService.getItemObject('tknData');
    logService.logout(access_token);
  };

  const toggleShowCarrito = () => {
    setShowCarrito((s) => !s);
  };

  const editarSuscripcion = () => {

  };

  const cancelarSuscripcion = () => {
    const suscripcionService = new SuscripcionService();
    suscripcionService.cancelarSuscripcion().then(({data})=>{
      console.log(data)
    });
  };

  useEffect(() => {
    getHome();
  }, [location])

  return (
    <div className="navBarContainer">
      {
        !isHome && <Carrito showCarrito={showCarrito} setShowCarrito={setShowCarrito} />
      }
      
 {[false].map((expand) => (
        <Navbar key={expand} bg="white" expand={expand} className="mb-3">
          <Container fluid>
            <div>
              {isHome
              ? (<Navbar.Brand 
                  className="whatsappIcon" 
                  href="https://api.whatsapp.com/send?phone=947298060&text=Hola,%20necesito%20ayuda%20para%20hacer%20mi%20pedido"
                >
                <img
                  src={whatsapp}
                  height="50"
                  className="logoNav"
                  alt="Ayuda Wiqli"
                />
                <h6 className="tituloHeaderWhatsapp">Escríbenos</h6>
                </Navbar.Brand>)
              : (<Navbar.Brand href="/">
                  <img
                    src={logo}
                    height="50"
                    className="logoNav"
                    alt="wiqli"
                  />
                  </Navbar.Brand>)
              }
            </div>
            {
              !isHome && 
              <img
                onClick={toggleShowCarrito}
                src={carrito}
                height="50"
                className="logoNav"
                alt="wiqli"
                style={{ cursor:"pointer" }}
              /> 
            }
            
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img src={logo} height="50" className="logoNav" alt="wiqli" /> 
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="cuerpoToggle">
                  {
                    isLoged ? 
                    (<div>
                      <div>
                        <h2 className="tituloHeader">{ infoUser.name }</h2>
                        <div className="infoDestacadaHeader header-suscripcion">
                          <h2>Suscripción</h2>
                          {
                            infoUser.isSuscrito ? 
                            ( <div>
                                <Nav.Link href="/editar-suscripcion">
                                  <Button type="primary" className="botonCopiado btnEditar">
                                    Editar suscripción
                                  </Button>
                                </Nav.Link>
                                
                                <Button type="primary" className="botonCopiado btnCancelar" onClick={cancelarSuscripcion}>
                                  Cancelar suscripción
                                </Button>
                              </div>)
                              : (
                                <Nav.Link href="/crear-suscripcion">
                                  <Button type="primary" className="botonCopiado">
                                    Suscribirme
                                  </Button>
                                </Nav.Link>)
                          }
                          <Nav.Link  href="/beneficios-suscripcion" className="linkBeneficios">
                            <p className="tituloHeaderFondo-rojo">Ver beneficios</p>
                          </Nav.Link>
                        </div>
                        <div className="infoDestacadaHeader header-referido">
                          <h2 className="tituloHeaderDestacado">Cupón de referido</h2>
                          <h4 className="textoInfoDestacadaHeader">{ codigoUser }</h4>
                          <CopyToClipboard text={codigoUser}>
                            <Button type="primary" className="botonCopiado" onClick={copiarCodigoReferido}>
                              Copiar
                            </Button>
                          </CopyToClipboard>
                          {
                            showAlert && 
                            <Alert 
                              message="¡Texto copiado!" 
                              type="success"
                            />
                          }
                          
                          <p className="textoDisclaimer">
                            Comparte este cupón y obtén S/5 de dscto. por cada persona que realice su 
                            primera compra con tu cupón.
                          </p>
                        </div>
                        <div className="infoDestacadaHeader">
                          <h2 className="tituloHeaderDestacado">Descuento disponible por referidos</h2>
                            <h4 className="textoInfoDestacadaHeader">
                              S/ { parseFloat(descuentoReferidos).toFixed(2) }
                            </h4>
                        </div>
                      </div>
                      <Button type="primary" className="botonCerrarSesion" onClick={cerrarSesion}>
                        Cerrar sesión
                      </Button>
                    </div>) :
                    (<div>
                      <Nav.Link  href="/login" className="linkHeader">
                        <p className="tituloHeaderFondo">Iniciar sesión</p>
                      </Nav.Link>
                      <Nav.Link  href="/registro" className="linkHeader">
                        <p className="tituloHeader">Registrarme</p>
                      </Nav.Link>
                    </div>)
                  }
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

    </div>
  );
}

export default Header;
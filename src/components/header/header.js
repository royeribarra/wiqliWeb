import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Offcanvas, Button } from "react-bootstrap";

import logo from "../../images/miniLogo.png"
import whatsapp from "../../images/whatsapp.png"
import carrito from "../../images/carritoCompras.png"

import { useLocation } from 'react-router-dom';
import StorageService from '../../servicios/storageService';
import LogService from '../../servicios/logService';

import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Alert } from 'antd';
import './header.css';
import Carrito from "../carrito/carrito";

function Header({ userLocal, isLoged, codigoCliente, descuentoReferidoCliente}) {
  
  const storageService = new StorageService();
  const logService = new LogService();
  const location = useLocation();
  const [isHome, setIsHome] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showCarrito, setShowCarrito] = useState(false);

  const copiarCodigoReferido = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  }

  const getHome = () => {
    let home = false
    if(window.location.pathname === "/"){
      home = true;
    }
    setIsHome(home)
  }

  const cerrarSesion = () => {
    const { access_token } = storageService.getItemObject('tknData');
    logService.logout(access_token);
  }

  const toggleShowCarrito = () => {
    setShowCarrito((s) => !s);
  }

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
              ? (<Navbar.Brand className="whatsappIcon" href="https://api.whatsapp.com/send?phone=947298060&text=Hola,%20necesito%20ayuda%20para%20hacer%20mi%20pedido">
              
              <img
                src={whatsapp}
                height="50"
                className="logoNav"
                alt="Ayuda Wiqli"
              />
              <h6 className="tituloHeaderWhatsapp">Escr??benos</h6>
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
                <div>

                </div>
                    <img
                src={logo}
                height="50"
                className="logoNav"
                alt="wiqli"
                
                  /> 
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="cuerpoToggle">
                  {
                    isLoged ? 
                    (<div>
                      <div>
                        <h2 className="tituloHeader">{ userLocal.name }</h2>
                        <div className="infoDestacadaHeader">
                          <h2 className="tituloHeaderDestacado">Cup??n de referido</h2>
                          <h4 className="textoInfoDestacadaHeader">{ codigoCliente }</h4>
                          <CopyToClipboard text={codigoCliente}>
                            <Button type="primary" className="botonCopiado" onClick={copiarCodigoReferido}>
                              Copiar
                            </Button>
                          </CopyToClipboard>
                          {
                            showAlert && 
                            <Alert 
                              message="??Texto copiado!" 
                              type="success"
                            />
                          }
                          
                        <p className="textoDisclaimer">Comparte este cup??n y obt??n S/5 de dscto. por cada persona que realice su primera compra con tu cup??n</p>
                        </div>
                      </div>
                      <div className="infoDestacadaHeader">
                        <h2 className="tituloHeaderDestacado">Descuento acumulado por referidos</h2>
                          <h4 className="textoInfoDestacadaHeader">S/ { parseFloat(descuentoReferidoCliente).toFixed(2) }</h4>
                      </div>
                      <Button type="primary" className="botonCerrarSesion" onClick={cerrarSesion}>
                        Cerrar sesi??n
                      </Button>
                    </div>) :
                    (<div>
                      <Nav.Link  href="/login"><div><p className="tituloHeaderFondo">Iniciar sesi??n</p></div></Nav.Link>
                      <Nav.Link  href="/registro"><p className="tituloHeader">Registrarme</p></Nav.Link>
                      <Nav.Link  href="/registro"><p className="tituloHeaderDestacado">Quiero crear un cup??n de referidos</p></Nav.Link>
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
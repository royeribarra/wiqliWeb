import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Offcanvas, Button } from "react-bootstrap";
import logo from "../../images/miniLogo.png"
import whatsapp from "../../images/whatsapp.png"
import { useLocation } from 'react-router-dom';
import StorageService from '../../servicios/storageService';
import LogService from '../../servicios/logService';
import {Buffer} from 'buffer';
import './header.css';

function Header() {
  
  const storageService = new StorageService();
  const logService = new LogService();
  const [userLocal, setUserLocal] = useState();
  const location = useLocation()
  const [isLoged, setIsLoged] = useState(false);
  const [isHome, setIsHome] = useState(false);

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

  useEffect(() => {
    getHome();
  }, [location])

  useEffect(()=>{
    const token = localStorage.getItem("tknData");
    if(token){
      const tknData = JSON.parse(Buffer.from(storageService.getItemObject("tknData"), 'base64'));
      
      if(tknData.status){
        setUserLocal(JSON.parse(Buffer.from(storageService.getItemObject("authUser"), 'base64')));
        console.log(userLocal)
        setIsLoged(true);
      }
    }
  }, []);

  return (
    <div className="navBarContainer">
 {[false].map((expand) => (
        <Navbar key={expand} bg="white" expand={expand} className="mb-3">
          <Container fluid>
            <div>
            {isHome
            ? <Navbar.Brand className="whatsappIcon" href="https://api.whatsapp.com/send?phone=947298060&text=Hola,%20necesito%20ayuda%20para%20hacer%20mi%20pedido">
            
            <img
              src={whatsapp}
              height="50"
              className="logoNav"
              alt="Ayuda Wiqli"
            />
            <h6 className="tituloHeaderWhatsapp">Escríbenos</h6>
            </Navbar.Brand>
            
            : <Navbar.Brand href="/">
            <img
              src={logo}
              height="50"
              className="logoNav"
              alt="wiqli"
              /> 
              
            </Navbar.Brand> 
            
            
            }
            </div>

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
                          <h2 className="tituloHeaderDestacado">Cupón de referido</h2>
                          <h4 className="textoInfoDestacadaHeader" >XKDJFF</h4>
                          <Button type="primary" htmlType="submit" className="botonCopiado">
                          Copiar
                          </Button>
                        <p className="textoDisclaimer">Comparte este cupón y obtén S/5 de dscto. por cada persona que realice su primera compra con tu cupón</p>
                        </div>
                      </div>
                      <div className="infoDestacadaHeader">
                        <h2 className="tituloHeaderDestacado">Descuento acumulado por referidos</h2>
                          <h4 className="textoInfoDestacadaHeader">S/45.00</h4>
                      </div>
                      <Button type="primary" className="botonCopiado" onClick={cerrarSesion}>
                        Cerrar sesión
                      </Button>
                    </div>) :
                    (<div>
                      <Nav.Link  href="/login"><div><p className="tituloHeaderFondo">Iniciar sesión</p></div></Nav.Link>
                      <Nav.Link  href="/registro"><p className="tituloHeader">Registrarme</p></Nav.Link>
                      <Nav.Link  href="/registro"><p className="tituloHeaderDestacado">Quiero crear un cupón de referidos</p></Nav.Link>
                    </div>)
                  }
                </Nav>
                {/* <div className="logoNavToggle">
                <Navbar.Brand href="https://api.whatsapp.com/send?phone=947298060&text=Hola,%20necesito%20ayuda%20para%20hacer%20mi%20pedido">
                <img
                  src={whatsapp}
                  height="50"
                  alt="wiqli"
                />
                </Navbar.Brand>
                </div> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

    </div>
  );
}

export default Header;
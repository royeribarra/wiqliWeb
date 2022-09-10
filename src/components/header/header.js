import React, { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import logo from "../../images/miniLogo.png"
import whatsapp from "../../images/whatsapp.jpg"
import { useLocation } from 'react-router-dom';
import './header.css';

function Header() {
  const location = useLocation()
  const[isHome, setIsHome] = useState(false);

  const getHome = () => {
    let home = false
    if(window.location.pathname === "/"){
      home = true;
    }
    setIsHome(home)
  }

  useEffect(() => {
    getHome();
  }, [location])

  return (
    <div className="navBarContainer">
      <Navbar collapseOnSelect expand="lg" className="navBar baseWiqli" >
        <Container className="contenedorSimple">
          <Navbar.Brand href="/">
            <div>
            {isHome
            ? <p className="tituloInicio"></p> 
            : <img
            src={logo}
            height="50"
            className="logoNav"
            alt="wiqli"
              /> 
            }
            </div>
          </Navbar.Brand>
          <Navbar.Brand href="https://api.whatsapp.com/send?phone=947298060&text=Hola,%20necesito%20ayuda%20para%20hacer%20mi%20pedido">
            <img
              src={whatsapp}
              height="50"
              className="logoNav"
              alt="wiqli"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
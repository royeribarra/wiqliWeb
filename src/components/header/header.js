import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../images/miniLogo.png"
import whatsapp from "../../images/whatsapp.jpg"
import './header.css';

function Header() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="navBar baseWiqli" >
        <Container className="contenedorSimple">
          <Navbar.Brand href="/">
            <img
              src={logo}
              height="50"
              className="logoNav"
              alt="wiqli"
            />
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
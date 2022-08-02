import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../images/miniLogo.png"
import './header.css';

function Header() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="navBar">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logo}
              height="50"
              className="logoNav"
              alt="wiqli"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="botonesPaginas">
              <Nav.Link href="/contacto" className="tituloNav">Contáctanos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
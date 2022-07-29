import React from "react";
import { Container } from "react-bootstrap"
import logo from "../../images/logo.png"
import './home.css';
import ProductList from "../../components/productList/productList";


function Home() 
{
  return (
    <div className="gradienteMedio">
      <div className="baseMorada">
        <Container className="contenedorSimple">
          <div className="baseLanding">
          <img
              src={logo}
              className="logoNav"
              alt="wiqli"
            />
              <h2 className="tituloPrincipal">¡Haz las compras sin moverte de donde estás con la mejor calidad del mercado!</h2>
              <h5 className="tituloEnunciativo">¡Solo llena el formulario de abajo y listo!</h5>
              <h5 className="tituloEnunciativo">Pagas cuando te entreguemos tus productos</h5>
              <h5 className="tituloEnunciativo">Si deseas comunicarte con nosotros también puedes escribirnos al</h5>
              <a className="numeroDeContacto" href="https://api.whatsapp.com/send?phone=947298060&text=Hola,%20necesito%20ayuda%20para%20hacer%20mi%20pedido">947298060</a>
            </div>
            <div>
            <ProductList></ProductList>
            </div>
        </Container>
      </div>
    </div>

  );
}
  
export default Home;
import React, { useEffect, useState } from 'react';
import { Affix, Button } from 'antd';
import { Container } from "react-bootstrap"
import logo from "../../images/logo.png"
import siguiente from "../../images/siguiente.png"
import './home.css';
import ProductList from "../../components/productList/productList";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

function Home() 
{
  const[productos, setProductos] = useState([]);
  const[productosCarrito, setProductosCarrito] = useState([]);
  let history = useNavigate();
  const getProductos = () => {
    axios
    .get(`${process.env.REACT_APP_BASE_PATH}/productos/todos`)
    .then(({ data }) => {
      console.log(data);
      setProductos(data);
    });
  }

  const agregarProducto = (producto) => {
    console.log(producto)
    let new_productos = [...productosCarrito];
    let result = new_productos.find(
      (el) => el.id === producto.id
    );
    if(!result){
      new_productos.push(producto);
      setProductosCarrito(new_productos);
    }
  }

  const quitarProducto = (producto) => {
    let new_productos = [...productosCarrito];
    const index = new_productos.findIndex(
      (el) => el.id === producto.id
    );
    new_productos.splice(index, 1);
    setProductosCarrito(new_productos);
  }

  const aumentarUnidades = (producto) => {
    
  }

  const goToFormularioDatos = () => {
    console.log(productosCarrito);
    localStorage.setItem('productos', JSON.stringify(productosCarrito));
    history(`/datos`);
  }

  useEffect(() => {
    getProductos();
    
  }, [])

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
            <ProductList 
              productos={productos} 
              agregarProducto={agregarProducto}
              quitarProducto={quitarProducto}
            />
          </div>
          <Affix offsetBottom={40} onChange={(affixed) => console.log(affixed)}>
            {/* <NavLink to="/datos"> */}
              <Button className='botonDeSiguiente' onClick={goToFormularioDatos}>
                <div className='botonOrdenado'>
                <p className='textoDePrecio'>(S/27.75)</p>
                <div className='clickASiguiente'>
                  <p>Siguiente</p>
                  <img 
                  src={siguiente}
                  alt="wiqli compras semanales"
                  />
                </div>
                </div>
              </Button>
            {/* </NavLink> */}
          </Affix>
        </Container>
      </div>
    </div>
  );
}
  
export default Home;
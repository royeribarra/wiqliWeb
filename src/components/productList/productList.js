import React, { useEffect, useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import AgregarOtro from "../agregarOtro/agregarOtro";
import AgregarOtroProducto from "../agregarOtro/agregarOtroProducto";
import './productList.css';
import ProductoAdicional from "./productoAdicional";
import ProductoComponente from "./productoComponente";


function ProductList({ 
  productos,
  agregarProducto,
  quitarProducto,
  disminuirUnidades,
  aumentarUnidades,
  formOtrosFrutas,
  formOtrosVerduras,
  formOtrosCarnes,
  formOtrosMenestras,
})
{
  const[otrasFrutas, setOtrasFrutas] = useState([]);
  const[otrasVerduras, setOtrasVerduras] = useState([]);
  const[otrasCarnes, setOtrasCarnes] = useState([]);
  const[otrasMenestras, setOtrasMenestras] = useState([]);

  const agregarProductoStorage = (producto, nombre) => {
    let productos = JSON.parse(sessionStorage.getItem(nombre));
    productos.push(producto);
    sessionStorage.setItem(nombre, JSON.stringify(productos));
    if(nombre === 'otrasFrutas'){
      setOtrasFrutas(productos);
    }
    if(nombre === 'otrasVerduras'){
      setOtrasVerduras(productos);
    }
    if(nombre === 'otrasCarnes'){
      setOtrasCarnes(productos);
    }
    if(nombre === 'otrasMenestras'){
      setOtrasMenestras(productos);
    }
  }

  const eliminarProductoStorage = (id, tipo) => {
    if(tipo === 1){
      const copiaArray = [...otrasFrutas];
      const index = copiaArray.findIndex(el => el.id === id);
      copiaArray.splice(index,1);
      setOtrasFrutas(copiaArray);
      sessionStorage.setItem('otrasFrutas', JSON.stringify(copiaArray));
    }
    if(tipo === 2){
      const copiaArray = [...otrasVerduras];
      const index = copiaArray.findIndex(el => el.id === id);
      copiaArray.splice(index,1);
      setOtrasVerduras(copiaArray);
      sessionStorage.setItem('otrasVerduras', JSON.stringify(copiaArray));
    }
    if(tipo === 3){
      const copiaArray = [...otrasCarnes];
      const index = copiaArray.findIndex(el => el.id === id);
      copiaArray.splice(index,1);
      setOtrasCarnes(copiaArray);
      sessionStorage.setItem('otrasCarnes', JSON.stringify(copiaArray));
    }
    if(tipo === 4){
      const copiaArray = [...otrasMenestras];
      const index = copiaArray.findIndex(el => el.id === id);
      copiaArray.splice(index,1);
      setOtrasMenestras(copiaArray);
      sessionStorage.setItem('otrasMenestras', JSON.stringify(copiaArray));
    }
  }

  useEffect(() => {
    setOtrasFrutas(JSON.parse(sessionStorage.getItem('otrasFrutas')));
    setOtrasVerduras(JSON.parse(sessionStorage.getItem('otrasVerduras')));
    setOtrasCarnes(JSON.parse(sessionStorage.getItem('otrasCarnes')));
    setOtrasMenestras(JSON.parse(sessionStorage.getItem('otrasMenestras')));
  }, []);

  return (
    <div>
      <Form>
        <Accordion  flush>
          <Accordion.Item eventKey="0" className="acordeonCategoria">
            <Accordion.Header>
              <h2 className="tituloCategoria">Elige tus frutas</h2>
            </Accordion.Header>
              <Accordion.Body>
                
                { productos.filter((producto) => producto.categoria_id === 1)
                  .map( producto => (
                    <ProductoComponente 
                      data={producto} 
                      key={producto.id} 
                      agregarProducto={agregarProducto}
                      quitarProducto={quitarProducto}
                      disminuirUnidades={disminuirUnidades}
                      aumentarUnidades={aumentarUnidades}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  otrasFrutas.map( fruta => (
                    <ProductoAdicional 
                      key={fruta.id}
                      id={fruta.id}
                      nombre={fruta.nombre}
                      cantidad={fruta.cantidad}
                      tipo={1}
                      eliminarProductoStorage={eliminarProductoStorage}
                    />
                  ))
                }
                <AgregarOtroProducto
                  nombre="otrasFrutas" 
                  title="Agregar otra fruta"
                  agregarProductoStorage={agregarProductoStorage}
                />
              </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1"  className="acordeonCategoria">
            <Accordion.Header>
              <h2 className="tituloCategoria">Elige tus verduras</h2>
            </Accordion.Header>
              <Accordion.Body>
                { productos.filter((producto) => producto.categoria_id === 2)
                  .map( producto => (
                    <ProductoComponente 
                      data={producto} 
                      key={producto.id} 
                      agregarProducto={agregarProducto}
                      quitarProducto={quitarProducto}
                      disminuirUnidades={disminuirUnidades}
                      aumentarUnidades={aumentarUnidades}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  otrasVerduras.map( verdura => (
                    <ProductoAdicional 
                      key={verdura.id}
                      id={verdura.id}
                      nombre={verdura.nombre}
                      cantidad={verdura.cantidad}
                      tipo={2}
                      eliminarProductoStorage={eliminarProductoStorage}
                    />
                  ))
                }
                <AgregarOtroProducto
                  nombre="otrasVerduras" 
                  title="Agregar otra verdura"
                  agregarProductoStorage={agregarProductoStorage}
                />
              
              </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="acordeonCategoria">
            <Accordion.Header>
              <h2 className="tituloCategoria">Elige tus carnes</h2>
            </Accordion.Header>
              <Accordion.Body>
                { productos.filter((producto) => producto.categoria_id === 3)
                  .map( producto => (
                    <ProductoComponente 
                      data={producto} 
                      key={producto.id} 
                      agregarProducto={agregarProducto}
                      quitarProducto={quitarProducto}
                      disminuirUnidades={disminuirUnidades}
                      aumentarUnidades={aumentarUnidades}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  otrasCarnes.map( carne => (
                    <ProductoAdicional 
                      key={carne.id}
                      id={carne.id}
                      nombre={carne.nombre}
                      cantidad={carne.cantidad}
                      tipo={3}
                      eliminarProductoStorage={eliminarProductoStorage}
                    />
                  ))
                }
                <AgregarOtroProducto
                  nombre="otrasCarnes"
                  title="Agregar otra carne"
                  agregarProductoStorage={agregarProductoStorage}
                />
              </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3" className="acordeonCategoria">
            <Accordion.Header>
              <h2 className="tituloCategoria">Elige tus menestras</h2>
            </Accordion.Header>
              <Accordion.Body>
                { productos.filter((producto) => producto.categoria_id === 4)
                  .map( producto => (
                    <ProductoComponente 
                      data={producto} 
                      key={producto.id} 
                      agregarProducto={agregarProducto}
                      quitarProducto={quitarProducto}
                      disminuirUnidades={disminuirUnidades}
                      aumentarUnidades={aumentarUnidades}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  otrasMenestras.map( menestra => (
                    <ProductoAdicional 
                      key={menestra.id}
                      id={menestra.id}
                      nombre={menestra.nombre}
                      cantidad={menestra.cantidad}
                      tipo={4}
                      eliminarProductoStorage={eliminarProductoStorage}
                    />
                  ))
                }
                <AgregarOtroProducto
                  nombre="otrasMenestras"
                  title="Agregar otra menestra"
                  agregarProductoStorage={agregarProductoStorage}
                />
              </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Form> 
    </div>
  );
}

export default ProductList;
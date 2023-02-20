import React, { useEffect, useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import AgregarOtroProducto from "../agregarOtro/agregarOtroProducto";
import './productList.css';
import ProductoAdicional from "./productoAdicional";
import ProductoComponente from "./productoComponente";
import { toastr } from "react-redux-toastr";
import { useDispatch, useSelector } from "react-redux";

function ProductList({ 
  // productos,
  agregarProducto,
  quitarProducto,
  disminuirUnidades,
  aumentarUnidades,
  renderizarNuevamente
})
{
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { cart } = state.cart;
  const { productosTienda } = state.productos;

  const[otrasFrutas, setOtrasFrutas] = useState([]);
  const[otrasVerduras, setOtrasVerduras] = useState([]);
  const[otrasCarnes, setOtrasCarnes] = useState([]);
  const[otrasMenestras, setOtrasMenestras] = useState([]);
  const[otrasFrutasSecas, setOtrasFrutasSecas] = useState([]);

  const agregarProductoStorage = (producto, nombre) => {
    let productos = JSON.parse(localStorage.getItem(nombre));
    productos.push(producto);
    localStorage.setItem(nombre, JSON.stringify(productos));
    if(nombre === 'otrasFrutas'){
      setOtrasFrutas(productos);
      toastr.success("Producto adicional agregado con éxito! Incluiremos el precio del producto adicional al entregarte los productos.");
    }
    if(nombre === 'otrasVerduras'){
      setOtrasVerduras(productos);
      toastr.success("Producto adicional agregado con éxito! Incluiremos el precio del producto adicional al entregarte los productos.");
    }
    if(nombre === 'otrasCarnes'){
      setOtrasCarnes(productos);
      toastr.success("Producto adicional agregado con éxito! Incluiremos el precio del producto adicional al entregarte los productos.");
    }
    if(nombre === 'otrasMenestras'){
      setOtrasMenestras(productos);
      toastr.success("Producto adicional agregado con éxito! Incluiremos el precio del producto adicional al entregarte los productos.");
    }
    if(nombre === 'otrasFrutasSecas'){
      setOtrasFrutasSecas(productos);
      toastr.success("Producto adicional agregado con éxito! Incluiremos el precio del producto adicional al entregarte los productos.");
    }
  }

  const eliminarProductoStorage = (id, tipo) => {
    if(tipo === 1){
      const copiaArray = [...otrasFrutas];
      const index = copiaArray.findIndex(el => el.id === id);
      copiaArray.splice(index,1);
      setOtrasFrutas(copiaArray);
      localStorage.setItem('otrasFrutas', JSON.stringify(copiaArray));
      
    }
    if(tipo === 2){
      const copiaArray = [...otrasVerduras];
      const index = copiaArray.findIndex(el => el.id === id);
      copiaArray.splice(index,1);
      setOtrasVerduras(copiaArray);
      localStorage.setItem('otrasVerduras', JSON.stringify(copiaArray));
    }
    if(tipo === 3){
      const copiaArray = [...otrasCarnes];
      const index = copiaArray.findIndex(el => el.id === id);
      copiaArray.splice(index,1);
      setOtrasCarnes(copiaArray);
      localStorage.setItem('otrasCarnes', JSON.stringify(copiaArray));
    }
    if(tipo === 4){
      const copiaArray = [...otrasMenestras];
      const index = copiaArray.findIndex(el => el.id === id);
      copiaArray.splice(index,1);
      setOtrasMenestras(copiaArray);
      localStorage.setItem('otrasMenestras', JSON.stringify(copiaArray));
    }
  }

  useEffect(() => {
    setOtrasFrutas(JSON.parse(localStorage.getItem('otrasFrutas')));
    setOtrasVerduras(JSON.parse(localStorage.getItem('otrasVerduras')));
    setOtrasCarnes(JSON.parse(localStorage.getItem('otrasCarnes')));
    setOtrasMenestras(JSON.parse(localStorage.getItem('otrasMenestras')));
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
                
                { productosTienda.filter((producto) => producto.categoria_id === 1)
                  .map( producto => (
                    <ProductoComponente 
                      data={producto}
                      key={producto.id}
                      renderizarNuevamente={renderizarNuevamente}
                      tipoLista={2}
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
                { productosTienda.filter((producto) => producto.categoria_id === 2)
                  .map( producto => (
                    <ProductoComponente 
                      data={producto}
                      key={producto.id}
                      renderizarNuevamente={renderizarNuevamente}
                      tipoLista={2}
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
                { productosTienda.filter((producto) => producto.categoria_id === 3)
                  .map( producto => (
                    <ProductoComponente 
                      data={producto}
                      key={producto.id}
                      renderizarNuevamente={renderizarNuevamente}
                      tipoLista={2}
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
                { productosTienda.filter((producto) => producto.categoria_id === 4)
                  .map( producto => (
                    <ProductoComponente 
                      data={producto}
                      key={producto.id}
                      renderizarNuevamente={renderizarNuevamente}
                      tipoLista={2}
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
          <Accordion.Item eventKey="4" className="acordeonCategoria">
            <Accordion.Header>
              <h2 className="tituloCategoria">Elige tus frutos secos</h2>
            </Accordion.Header>
              <Accordion.Body>
                { productosTienda.filter((producto) => producto.categoria_id === 5)
                  .map( producto => (
                    <ProductoComponente 
                      data={producto}
                      key={producto.id}
                      renderizarNuevamente={renderizarNuevamente}
                      tipoLista={2}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  otrasFrutasSecas.map( frutoSeco => (
                    <ProductoAdicional 
                      key={frutoSeco.id}
                      id={frutoSeco.id}
                      nombre={frutoSeco.nombre}
                      cantidad={frutoSeco.cantidad}
                      tipo={4}
                      eliminarProductoStorage={eliminarProductoStorage}
                    />
                  ))
                }
                <AgregarOtroProducto
                  nombre="otrasFrutasSecas"
                  title="Agregar otro fruto seco"
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
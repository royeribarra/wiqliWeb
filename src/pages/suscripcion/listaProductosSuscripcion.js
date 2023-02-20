import React, { useEffect, useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import './listaProductosSuscripcion.css';
import { toastr } from "react-redux-toastr";
import { useDispatch, useSelector } from "react-redux";
import AgregarOtroProducto from "../../components/agregarOtro/agregarOtroProducto";
import ProductoComponente from "../../components/productList/productoComponente";
import ProductoAdicional from "../../components/productList/productoAdicional";

function ListaProductosSuscripcion()
{
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { productosTienda } = state.productos;
  const { productos, carnes, frutas, menestras, verduras, frutosSecos, total } = state.suscripcion;

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
                      tipoLista={2}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  frutas.map( fruta => (
                    <ProductoAdicional 
                      key={fruta.id}
                      id={fruta.id}
                      nombre={fruta.nombre}
                      cantidad={fruta.cantidad}
                      tipo={1}
                    />
                  ))
                }
                <AgregarOtroProducto
                  nombre="otrasFrutas" 
                  title="Agregar otra fruta"
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
                      tipoLista={2}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  verduras.map( verdura => (
                    <ProductoAdicional 
                      key={verdura.id}
                      id={verdura.id}
                      nombre={verdura.nombre}
                      cantidad={verdura.cantidad}
                      tipo={2}
                    />
                  ))
                }
                <AgregarOtroProducto
                  nombre="otrasVerduras" 
                  title="Agregar otra verdura"
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
                      tipoLista={2}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  carnes.map( carne => (
                    <ProductoAdicional
                      key={carne.id}
                      id={carne.id}
                      nombre={carne.nombre}
                      cantidad={carne.cantidad}
                      tipo={3}
                    />
                  ))
                }
                <AgregarOtroProducto
                  nombre="otrasCarnes"
                  title="Agregar otra carne"
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
                      tipoLista={2}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  menestras.map( menestra => (
                    <ProductoAdicional 
                      key={menestra.id}
                      id={menestra.id}
                      nombre={menestra.nombre}
                      cantidad={menestra.cantidad}
                      tipo={4}
                    />
                  ))
                }
                <AgregarOtroProducto
                  nombre="otrasMenestras"
                  title="Agregar otra menestra"
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
                      tipoLista={2}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  frutosSecos.map( frutoSeco => (
                    <ProductoAdicional 
                      key={frutoSeco.id}
                      id={frutoSeco.id}
                      nombre={frutoSeco.nombre}
                      cantidad={frutoSeco.cantidad}
                      tipo={4}
                    />
                  ))
                }
                <AgregarOtroProducto
                  nombre="otrasFrutasSecas"
                  title="Agregar otro fruto seco"
                />
              </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Form> 
    </div>
  );
}

export default ListaProductosSuscripcion;
import React, { useEffect, useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import './listaProductosSuscripcion.css';
import { toastr } from "react-redux-toastr";
import { useDispatch, useSelector } from "react-redux";
import AgregarOtroProducto from "../../components/agregarOtro/agregarOtroProducto";
import ProductoAdicional from "../../components/productList/productoAdicional";
import ProductoSuscripcionComponente from "../../components/productList/productoSuscripcionComponente";
import ProductoComponente from "../../components/productList/productoComponente";

function ListaProductosSuscripcion({suscripcion})
{
  const state = useSelector((state) => state);
  const { productosTienda } = state.productos;
  const { xtraSubCart, subCart } = state.suscripcion;

  return (
    <div>
      <Form>
        <Accordion  flush>
          <Accordion.Item eventKey="0" className="acordeonCategoria">
            <Accordion.Header>
              <h2 className="tituloCategoria">Elige tus frutas</h2>
            </Accordion.Header>
              <Accordion.Body>
                { suscripcion === 1 && productosTienda.filter((producto) => producto.categoria_id === 1)
                  .map( producto => (
                    <ProductoComponente 
                      data={producto}
                      key={producto.id}
                      tipoLista={2}
                    />
                  ))
                }
                { suscripcion === 2 && productosTienda.filter((producto) => producto.categoria_id === 1)
                  .map( producto => (
                    <ProductoSuscripcionComponente
                      key={producto.id}
                      data={producto}
                      suscripcion={suscripcion}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  xtraSubCart.filter((producto) => producto.categoriaId === 1)
                  .map( producto => (
                    <ProductoAdicional 
                      key={producto.id}
                      id={producto.id}
                      nombre_desc={producto.nombre_desc}
                      cantidad_desc={producto.cantidad_desc}
                      categoriaId={producto.categoriaId}
                      tipoLista={2}
                    />
                  ))
                }
                <AgregarOtroProducto
                  nombre="eFrutas" 
                  title="Agregar otra fruta"
                  categoriaId={1}
                  tipoLista={2}
                />
              </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1"  className="acordeonCategoria">
            <Accordion.Header>
              <h2 className="tituloCategoria">Elige tus verduras</h2>
            </Accordion.Header>
              <Accordion.Body>
                { suscripcion === 1 && productosTienda.filter((producto) => producto.categoria_id === 2)
                  .map( producto => (
                    <ProductoComponente 
                      data={producto}
                      key={producto.id}
                      tipoLista={2}
                    />
                  ))
                }
                { suscripcion === 2 && productosTienda.filter((producto) => producto.categoria_id === 2)
                  .map( producto => (
                    <ProductoSuscripcionComponente
                      key={producto.id}
                      data={producto}
                      suscripcion={suscripcion}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  xtraSubCart.filter((producto) => producto.categoriaId === 2)
                  .map( producto => (
                    <ProductoAdicional 
                      key={producto.id}
                      id={producto.id}
                      nombre_desc={producto.nombre_desc}
                      cantidad_desc={producto.cantidad_desc}
                      categoriaId={producto.categoriaId}
                      tipoLista={2}
                    />
                  ))
                }
                <AgregarOtroProducto
                  nombre="eVerduras" 
                  title="Agregar otra verdura"
                  categoriaId={2}
                  tipoLista={2}
                />
              
              </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="acordeonCategoria">
            <Accordion.Header>
              <h2 className="tituloCategoria">Elige tus carnes</h2>
            </Accordion.Header>
              <Accordion.Body>
                { suscripcion === 1 && productosTienda.filter((producto) => producto.categoria_id === 3)
                  .map( producto => (
                    <ProductoComponente 
                      data={producto}
                      key={producto.id}
                      tipoLista={2}
                    />
                  ))
                }
                { suscripcion === 2 && productosTienda.filter((producto) => producto.categoria_id === 3)
                  .map( producto => (
                    <ProductoSuscripcionComponente
                      key={producto.id}
                      data={producto}
                      suscripcion={suscripcion}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  xtraSubCart.filter((producto) => producto.categoriaId === 3)
                  .map( producto => (
                    <ProductoAdicional 
                      key={producto.id}
                      id={producto.id}
                      nombre_desc={producto.nombre_desc}
                      cantidad_desc={producto.cantidad_desc}
                      categoriaId={producto.categoriaId}
                      tipoLista={2}
                    />
                  ))
                }
                <AgregarOtroProducto
                  nombre="eCarnes"
                  title="Agregar otra carne"
                  categoriaId={3}
                  tipoLista={2}
                />
              </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3" className="acordeonCategoria">
            <Accordion.Header>
              <h2 className="tituloCategoria">Elige tus menestras</h2>
            </Accordion.Header>
              <Accordion.Body>
                { suscripcion === 1 && productosTienda.filter((producto) => producto.categoria_id === 4)
                  .map( producto => (
                    <ProductoComponente 
                      data={producto}
                      key={producto.id}
                      tipoLista={2}
                    />
                  ))
                }
                { suscripcion === 2 && productosTienda.filter((producto) => producto.categoria_id === 4)
                  .map( producto => (
                    <ProductoSuscripcionComponente
                      key={producto.id}
                      data={producto}
                      suscripcion={suscripcion}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  xtraSubCart.filter((producto) => producto.categoriaId === 4)
                  .map( producto => (
                    <ProductoAdicional 
                      key={producto.id}
                      id={producto.id}
                      nombre_desc={producto.nombre_desc}
                      cantidad_desc={producto.cantidad_desc}
                      categoriaId={producto.categoriaId}
                      tipoLista={2}
                    />
                  ))
                }
                <AgregarOtroProducto
                  nombre="eMenestras"
                  title="Agregar otra menestra"
                  categoriaId={4}
                  tipoLista={2}
                />
              </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4" className="acordeonCategoria">
            <Accordion.Header>
              <h2 className="tituloCategoria">Elige tus frutos secos</h2>
            </Accordion.Header>
              <Accordion.Body>
                { suscripcion === 1 && productosTienda.filter((producto) => producto.categoria_id === 5)
                  .map( producto => (
                    <ProductoComponente
                      data={producto}
                      key={producto.id}
                      tipoLista={2}
                    />
                  ))
                }
                { suscripcion === 2 && productosTienda.filter((producto) => producto.categoria_id === 5)
                  .map( producto => (
                    <ProductoSuscripcionComponente
                      key={producto.id}
                      data={producto}
                      suscripcion={suscripcion}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  xtraSubCart.filter((producto) => producto.categoriaId === 5)
                  .map( producto => (
                    <ProductoAdicional 
                      key={producto.id}
                      id={producto.id}
                      nombre_desc={producto.nombre_desc}
                      cantidad_desc={producto.cantidad_desc}
                      categoriaId={producto.categoriaId}
                      tipoLista={2}
                    />
                  ))
                }
                <AgregarOtroProducto
                  nombre="eFrutosSecas"
                  title="Agregar otro fruto seco"
                  categoriaId={5}
                  tipoLista={2}
                />
              </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Form> 
    </div>
  );
}

export default ListaProductosSuscripcion;
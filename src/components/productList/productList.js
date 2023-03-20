import React from "react";
import { Accordion, Form } from "react-bootstrap";
import AgregarOtroProducto from "../agregarOtro/agregarOtroProducto";
import './productList.css';
import ProductoAdicional from "./productoAdicional";
import ProductoComponente from "./productoComponente";
import { useDispatch, useSelector } from "react-redux";

function ProductList()
{
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { cart, xtraCart } = state.cart;
  const { productosTienda } = state.productos;

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
                      tipoLista={1}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  xtraCart.filter((producto)=> producto.categoriaId === 1).map( fruta => (
                    <ProductoAdicional 
                      key={fruta.id}
                      id={fruta.id}
                      nombre_desc={fruta.nombre_desc}
                      cantidad_desc={fruta.cantidad_desc}
                      tipoLista={1}
                    />
                  ))
                }
                <AgregarOtroProducto
                  title="Agregar otra fruta"
                  tipoLista={1}
                  categoriaId={1}
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
                      tipoLista={1}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  xtraCart.filter((producto)=> producto.categoriaId === 2).map( verdura => (
                    <ProductoAdicional 
                      key={verdura.id}
                      id={verdura.id}
                      nombre_desc={verdura.nombre_desc}
                      cantidad_desc={verdura.cantidad_desc}
                      tipoLista={1}
                    />
                  ))
                }
                <AgregarOtroProducto
                  title="Agregar otra verdura"
                  tipoLista={1}
                  categoriaId={2}
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
                      tipoLista={1}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  xtraCart.filter((producto)=> producto.categoriaId === 3).map( carne => (
                    <ProductoAdicional 
                      key={carne.id}
                      id={carne.id}
                      nombre_desc={carne.nombre_desc}
                      cantidad_desc={carne.cantidad_desc}
                      tipoLista={1}
                    />
                  ))
                }
                <AgregarOtroProducto
                  title="Agregar otra carne"
                  tipoLista={1}
                  categoriaId={3}
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
                      tipoLista={1}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  xtraCart.filter((producto)=> producto.categoriaId === 4).map( menestra => (
                    <ProductoAdicional 
                      key={menestra.id}
                      id={menestra.id}
                      nombre_desc={menestra.nombre_desc}
                      cantidad_desc={menestra.cantidad_desc}
                      tipoLista={1}
                    />
                  ))
                }
                <AgregarOtroProducto
                  title="Agregar otra menestra"
                  tipoLista={1}
                  categoriaId={4}
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
                      tipoLista={1}
                    />
                  ))
                }
                <h3>Productos adicionales</h3>
                {
                  xtraCart.filter((producto)=> producto.categoriaId === 5).map( frutoSeco => (
                    <ProductoAdicional 
                      key={frutoSeco.id}
                      id={frutoSeco.id}
                      nombre_desc={frutoSeco.nombre_desc}
                      cantidad_desc={frutoSeco.cantidad_desc}
                      tipoLista={1}
                    />
                  ))
                }
                <AgregarOtroProducto
                  title="Agregar otro fruto seco"
                  tipoLista={1}
                  categoriaId={5}
                />
              </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Form> 
    </div>
  );
}

export default ProductList;
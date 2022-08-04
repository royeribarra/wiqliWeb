import React from "react";
import { Accordion, Form, Card } from "react-bootstrap";
import fresa from "../../images/fresa.jpg"
import AgregarOtro from "../agregarOtro/agregarOtro";
import './productList.css';
import ProductoAdicional from "./productoAdicional";
import ProductoComponente from "./productoComponente";


function ProductList({ productos, agregarProducto, quitarProducto, disminuirUnidades, aumentarUnidades }) 
{
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
                
                <ProductoAdicional></ProductoAdicional>
              <AgregarOtro></AgregarOtro>
              </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1"  className="acordeonCategoria">
            <Accordion.Header>
              <h2 className="tituloCategoria">Elige tus verduras</h2>
            </Accordion.Header>
              <Accordion.Body>
                { productos.filter((producto) => producto.categoria_id === 2)
                  .map( producto => (
                    <ProductoComponente data={producto} key={producto.id} />
                  ))
                }
              </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="acordeonCategoria">
            <Accordion.Header>
              <h2 className="tituloCategoria">Elige tus carnes</h2>
            </Accordion.Header>
              <Accordion.Body>
                { productos.filter((producto) => producto.categoria_id === 3)
                  .map( producto => (
                    <ProductoComponente data={producto} key={producto.id} />
                  ))
                }
              </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3" className="acordeonCategoria">
            <Accordion.Header>
              <h2 className="tituloCategoria">Elige tus menestras</h2>
            </Accordion.Header>
              <Accordion.Body>
                { productos.filter((producto) => producto.categoria_id === 4)
                  .map( producto => (
                    <ProductoComponente data={producto} key={producto.id} />
                  ))
                }
              </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Form> 
    </div>
  );
}

export default ProductList;
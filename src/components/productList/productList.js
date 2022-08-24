import React from "react";
import { Accordion, Form } from "react-bootstrap";
import AgregarOtro from "../agregarOtro/agregarOtro";
import './productList.css';
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
              <AgregarOtro 
                form={formOtrosFrutas} 
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
              <AgregarOtro 
                form={formOtrosVerduras} 
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
              <AgregarOtro 
                form={formOtrosCarnes} 
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
              <AgregarOtro 
                form={formOtrosMenestras} 
                nombre="otrasMenestras"
                title="Agregar otra menestra"
              />
              </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Form> 
    </div>
  );
}

export default ProductList;
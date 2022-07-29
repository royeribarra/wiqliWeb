import React from "react";
import { Accordion, Form, Card } from "react-bootstrap";
import fresa from "../../images/fresa.png"
import './productList.css';

function ProductList() {
  return (
    <div>
    <Form>
      <Accordion  flush>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    <h2 className="tituloCategoria">Elige tus frutas</h2>
                  </Accordion.Header>
                    <Accordion.Body>
                    <div className="productCard">
                        <img
                        src={fresa}
                        className="imagenProducto"
                        alt="wiqli"
                        />
                        <Card className="descripcionProducto">
                        <div className="datosProducto">
                        <h5>Fresas de estación</h5>
                        <p></p>
                        <p>S/7.50 kg</p>
                        </div>
                        <Form.Check type="checkbox" label="" />
                        </Card>
                    </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Accordion  flush>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    <h2 className="tituloCategoria">Elige tus verduras</h2>
                  </Accordion.Header>
                    <Accordion.Body>
                    <p>Hola</p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Accordion  flush>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    <h2 className="tituloCategoria">Elige tus carnes</h2>
                  </Accordion.Header>
                    <Accordion.Body>
                    <p>Hola</p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Accordion  flush>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    <h2 className="tituloCategoria">Elige tus menestras</h2>
                  </Accordion.Header>
                    <Accordion.Body>
                    <p>Hola</p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Form> 
    </div>
  );
}

export default ProductList;
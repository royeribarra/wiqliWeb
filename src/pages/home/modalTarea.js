import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function ModalTarea({showModal, seleccionarNuevo, seleccionarUltimaCompra})
{
  const [fullscreen, setFullscreen] = useState('md-down');

  return(
    <Modal show={showModal} fullscreen={fullscreen}>
      <Modal.Header>
        <Modal.Title>Bienvenido Renzo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ marginBottom: "15px" }}>
          Ahorra tiempo e inicia con la lista de tu compra pasada o vuelve a elegir tus productos desde cero.
        </div>
        <div className="row">
          <div className="col-md-6" style={{ marginBottom: "10px" }}>
            <Button variant="secondary" onClick={seleccionarUltimaCompra} style={{ width: "100%" }}>
              Seguir con mi última compra
            </Button>
          </div>
          <div className="col-md-6" style={{ marginBottom: "10px" }}>
            <Button variant="secondary" onClick={seleccionarNuevo} style={{ width: "100%" }}>
              Elegir desde cero
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalTarea;

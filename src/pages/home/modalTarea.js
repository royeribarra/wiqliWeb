import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ModalTarea({showModal})
{
  const [productosLogin, setProductosLogin] = useState([]);
  const [fullscreen, setFullscreen] = useState('md-down');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const seleccionarNuevo = () => {
    sessionStorage.setItem('seleccionTarea', true);
    handleClose();
  };

  const seleccionarUltimaCompra = () => {
    sessionStorage.setItem('productos', []);
    sessionStorage.setItem('seleccionTarea', true);
    handleClose();
  };

  useEffect(()=> {
    let tarea = sessionStorage.getItem('seleccionTarea');
    let token = localStorage.getItem('tknData');
    if(token){
      if(tarea){
        setShow(false);
      }else{
        setShow(true);
      }
    }
  }, []);

  return(
    <Modal show={show} onHide={handleClose} fullscreen={fullscreen}>
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

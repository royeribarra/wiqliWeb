import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ModalTarea({showModal})
{
  const [productosLogin, setProductosLogin] = useState([]);
  const [fullscreen, setFullscreen] = useState(false);
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
    <Modal size="md" aria-labelledby="contained-modal-tittle-vcenter" centered show={show} onHide={handleClose} fullscreen={fullscreen} className="modalOpciones"> 
      <Modal.Header>
        <Modal.Title className="tituloPrincipal">Bienvenido Renzo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="textoCuerpoModal">
          Ahorra tiempo e inicia con la lista de tu compra pasada o vuelve a elegir tus productos desde cero.
        </div>
        <div className="modalTareasBotones">
          <div className="contenedorBotonModal">
            <Button className="botonDeSiguiente" onClick={seleccionarUltimaCompra} style={{ width: "100%" }}>
              Seguir con mi última compra
            </Button>
          </div>
          <div className="contenedorBotonModal">
            <Button className="botonSecundario" onClick={seleccionarNuevo} style={{ width: "100%" }}>
              Elegir desde cero
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalTarea;

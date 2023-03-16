import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";

function ModalTarea({showModal, seleccionarNuevo, seleccionarUltimaCompra})
{
  const fullscreen = false;
  const state = useSelector((state) => state);
  const { infoUser } = state.user;

  return(
    <Modal size="md" aria-labelledby="contained-modal-tittle-vcenter" centered show={showModal} fullscreen={fullscreen} className="modalOpciones"> 
      <Modal.Header>
        <Modal.Title className="tituloPrincipal" >¡Hola { infoUser.name }!</Modal.Title>
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

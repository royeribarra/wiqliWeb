import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import StorageService from '../../servicios/storageService';
import {Buffer} from 'buffer';

function ModalTarea({showModal, seleccionarNuevo, seleccionarUltimaCompra})
{
  const [fullscreen, setFullscreen] = useState(false);
  const storageService = new StorageService();
  const [isLoged, setIsLoged] = useState(false);
  const [userLocal, setUserLocal] = useState();

  useEffect(()=>{
    const token = localStorage.getItem("tknData");
    if(token){
      const tknData = JSON.parse(Buffer.from(storageService.getItemObject("tknData"), 'base64'));
      if(tknData.status){
        setUserLocal(JSON.parse(Buffer.from(storageService.getItemObject("authUser"), 'base64')));
        setIsLoged(true);
      }
    }
  }, []);

  return(
    <Modal size="md" aria-labelledby="contained-modal-tittle-vcenter" centered show={showModal} fullscreen={fullscreen} className="modalOpciones"> 
      <Modal.Header>
        <Modal.Title className="tituloPrincipal" >¡Hola { isLoged ? userLocal.name: '' }!</Modal.Title>
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

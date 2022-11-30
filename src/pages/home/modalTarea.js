import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import StorageService from '../../servicios/storageService';
import {Buffer} from 'buffer';

function ModalTarea({showModal, seleccionarNuevo, seleccionarUltimaCompra})
{
  const [fullscreen, setFullscreen] = useState('md-down');
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
    <Modal show={showModal} fullscreen={fullscreen}>
      <Modal.Header>
        <Modal.Title>Bienvenid@ { isLoged ? userLocal.name: '' }</Modal.Title>
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

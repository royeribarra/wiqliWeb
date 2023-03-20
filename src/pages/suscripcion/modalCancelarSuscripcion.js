import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { SuscripcionService } from "../../servicios/suscripcionservice";
import { showLoader } from "../../redux/actions/loaderActions";
import { toastr } from "react-redux-toastr";

function ModalCancelarSuscripcion({status, handleClose, seleccionarUltimaCompra})
{
  const fullscreen = false;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { infoUser } = state.user;

  const cancelarSuscripcion = () => {
    dispatch(showLoader());
    const suscripcionService = new SuscripcionService();
    suscripcionService.cancelarSuscripcion().then(({data})=>{
      
      toastr.success(data.message);
      dispatch(showLoader(false));
      handleClose(false);
    });
  };

  const cancelarProceso = () => {
    handleClose(false);
  };

  return(
    <Modal size="md" aria-labelledby="contained-modal-tittle-vcenter" centered show={status} fullscreen={fullscreen} className="modalOpciones"> 
      <Modal.Header>
        <Modal.Title className="tituloPrincipal" >¡Hola { infoUser.name }!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="textoCuerpoModal">
          ¿Desea cancelar su suscripción?.
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly"}}>
          <Button className="botonDeSiguiente" onClick={cancelarSuscripcion}>
            SI
          </Button>
          <Button style={{ backgroundColor: "red"}} className="botonSecundario" onClick={cancelarProceso} >
            Cancelar
          </Button>
        </div>
            
      </Modal.Body>
    </Modal>
  );
}

export default ModalCancelarSuscripcion;

import React, {useEffect} from 'react';
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { SinfoSuscription } from '../../redux/actions/suscripcionActions';
import StorageService from '../../servicios/storageService';
import { UsuarioService } from '../../servicios/usuarioService';
import "./suscripcion.css";
import { Buffer } from 'buffer';


function Suscripcion({tipo}) 
{
  const storageService = new StorageService();
  const userService = new UsuarioService();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(()=>{
    const token = localStorage.getItem("tknData");
    if(token){
      const tknData = JSON.parse(Buffer.from(storageService.getItemObject("tknData"), 'base64'));
      if(tknData.status){
        userService.getProductosSuscripcion().then(({data})=> {
          dispatch(SinfoSuscription({
            suscripcionId: data.id,
            subCart: data.productos.filter((item) => item.productoId !== 999),
            xtraSubCart: data.productos.filter((item) => item.productoId === 999),
            periodo: data.periodo,
            diaEntrega: data.diaEntrega
          }));
        });
      }
    }
  }, []);

  return (
    <div className="baseWiqliForm">
      <Container className="contenedorSimple">
        <Outlet />
      </Container>
    </div>
  );
}
  
export default Suscripcion;
import React, { useState, useEffect } from "react";
import { MdProductionQuantityLimits } from 'react-icons/md';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { FaAmazonPay } from 'react-icons/fa';
import { Affix, Select, Steps } from "antd";
import 'antd/lib/steps/style/css';
import ListaProductosSuscripcion from "./listaProductosSuscripcion";
import carrito from "../../images/carritoCompras.png"
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { NavLink, useNavigate } from "react-router-dom";
import siguiente from "../../images/siguiente.png";
import { SuscripcionService } from "../../servicios/suscripcionservice";
import { UsuarioService } from "../../servicios/usuarioService";

const { Option } = Select;
const { Step } = Steps;

function SeleccionProductos({suscripcion})
{
  const suscripcionService = new SuscripcionService();
  let history = useNavigate();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { totalProductos, subCart, xtraSubCart } = state.suscripcion;
  const [suscripcionId, setSuscripcionId] = useState(false);

  const goToSelectDate = () => {
    if(totalProductos === 0){
      toastr.error("Debes agregar al menos un producto para pasar a la siguiente sección.");
      
    }else{
      history(`/editar-suscripcion/seleccion-periodo`);
    }
  }

  const saveNewProductos = () => {
    let data = {
      suscripcionId: suscripcionId,
      productos: subCart,
      productosExtra: xtraSubCart
    }
    suscripcionService.editarProductosSuscripcion(data).then(({data})=> {
      toastr.success(data.message);
      history(`/editar-suscripcion`);
    }).catch((error)=>{
      toastr.error("Fallo en la actualización de la lista.")
    });
  };

  useEffect(()=> {
    const userService = new UsuarioService();
    userService.getProductosSuscripcion().then(({data})=> {
      setSuscripcionId(data.id)
    });
  }, []);
  
  return (
    <div>
    {
      suscripcion === 1 && 
      <Steps
        responsive={false}
        items={[
          {
            title: 
              <NavLink to={"/crear-suscripcion/seleccion-productos"}>
              <p style={{color: "black", fontSize: "14px"}}>Productos</p>
              </NavLink>,
            status: 'process',
            icon: <NavLink to="/crear-suscripcion/seleccion-productos"><MdProductionQuantityLimits /></NavLink>
          },
          {
            title: 
              <NavLink to="/crear-suscripcion/seleccion-periodo">
              <p style={{color: "black", fontSize: "14px"}}>Recurrencia</p>
              </NavLink>,
            status: 'wait',
            icon: <NavLink to="/crear-suscripcion/seleccion-periodo"><AiOutlineFieldTime /></NavLink>
          },
          {
            title: 
              <NavLink to="/crear-suscripcion/metodo-pago">
              <p style={{color: "black", fontSize: "14px"}}>Pago</p>
              </NavLink>,
            status: 'wait',
            icon: <NavLink to="/crear-suscripcion/metodo-pago"><FaAmazonPay /></NavLink>
          },
        ]}
      />
    }
      
      <div className='listaDeProductos'>
        {
          suscripcion == 2 && <h4><u>Edita tus productos</u></h4>
        }
        <h5>Elige los productos que deseas recibir en cada periodo.</h5>
        <ListaProductosSuscripcion suscripcion={suscripcion} />
      </div>
      <Affix offsetBottom={40} onChange={(affixed) => console.log(affixed)}>
        <div className='contenedorBotones'>
          <div className='botonDeSiguiente'>
            <div className='botonOrdenado'>
              <img
                src={carrito}
                height="30"
                className="logoNav"
                alt="wiqli"
                style={{ cursor:"pointer" }}
              />
              <p className='textoDePrecio'>S/ {parseFloat(totalProductos).toFixed(2)}</p>
            </div>
          </div>
          {
            suscripcion === 1 ? 
            (
              <div className='botonDeSiguiente' onClick={goToSelectDate} style={{ cursor:"pointer" }}>
                <div className='botonOrdenado'>
                  <div className='clickASiguiente'>
                    <p className='textoDePrecio'>Siguiente</p>
                    <img 
                      src={siguiente}
                      alt="wiqli compras semanales"
                    />
                  </div>
                </div>
              </div>
            ) : 
            (<div className='botonDeSiguiente' onClick={saveNewProductos} style={{ cursor:"pointer" }}>
              <div className='botonOrdenado'>
                <div className='clickASiguiente'>
                  <p className='textoDePrecio'>Guardar</p>
                </div>
              </div>
            </div>)
          }
        </div>
      </Affix>
    </div>
  );
}

export default SeleccionProductos;
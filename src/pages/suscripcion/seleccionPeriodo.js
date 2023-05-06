import React, { useState, useEffect } from "react";
import { Radio, Select, Steps } from "antd";
import { Container } from "react-bootstrap";
import { MdProductionQuantityLimits } from 'react-icons/md';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { FaAmazonPay } from 'react-icons/fa';
import 'antd/lib/steps/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/radio/style/css';
import siguiente from "../../images/siguiente.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SsetDiaRecojo, SsetPeriodo } from "../../redux/actions/suscripcionActions";
import { SuscripcionService } from "../../servicios/suscripcionservice";
import { UsuarioService } from "../../servicios/usuarioService";
import { toastr } from "react-redux-toastr";

const { Option } = Select;

function SeleccionPeriodo({suscripcion})
{
  const suscripcionService = new SuscripcionService();
  
  const userService = new UsuarioService();
  let history = useNavigate();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { diaRecojo, periodo } = state.suscripcion;
  const [suscripcionId, setSuscripcionId] = useState(false);
  const [diaEntregaId, setDiaEntregaId] = useState(false);
  const [periodoId, setPeriodoId] = useState(false);
  
  const onChangeDiaRecojo = ({ target: { value } }) => {
    dispatch(SsetDiaRecojo(value));
    setDiaEntregaId(value);
  };

  const onChangePeriodo = (e) => {
    dispatch(SsetPeriodo(e));
    setPeriodoId(e);
  };

  const goToPago = () => {
    history(`/crear-suscripcion/metodo-pago`);
  };

  const saveNewPeriodo = () => {
    let data = {
      suscripcionId: suscripcionId,
      diaEntrega: diaEntregaId,
      periodo: periodoId
    }
    suscripcionService.editarPeriodoSuscripcion(data).then(({data})=> {
      toastr.success(data.message);
      history(`/editar-suscripcion`);
    }).catch((error)=>{
      toastr.error("Fallo en la actualización de la lista.")
    });
  };

  const backPage = () => {
    history(`/editar-suscripcion`);
  };

  useEffect(()=> {
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
                <NavLink to="/crear-suscripcion/seleccion-productos">
                <p style={{color: "black", fontSize: "12px"}}>Productos</p>
                </NavLink>,
              status: 'finish',
              icon: <NavLink to="/crear-suscripcion/seleccion-productos"><MdProductionQuantityLimits /></NavLink>
            },
            {
              title: 
                <NavLink to="/crear-suscripcion/seleccion-periodo">
                <p style={{color: "black", fontSize: "12px"}}>Recurrencia</p>
                </NavLink>,
              status: 'process',
              icon: <NavLink to="/crear-suscripcion/seleccion-periodo"><AiOutlineFieldTime /></NavLink>
            },
            {
              title: 
                <NavLink to="/crear-suscripcion/metodo-pago">
                <p style={{color: "black", fontSize: "12px"}}>Pago</p>
                </NavLink>,
              status: 'wait',
              icon: <NavLink to="/crear-suscripcion/metodo-pago"><FaAmazonPay /></NavLink>
            },
          ]}
        />
      }
      {
        suscripcion === 2 && 
        <h4><u>Editar Periodo</u></h4>
      }
      
      <h5 className="tituloEnunciativo">Enviar pedido cada:</h5>
      <div style={{ margin: "10px 0px", paddingBottom: "5px", display: "flex", justifyContent: "center"}}>
        <div style={{margin: "5px"}}>
          <Select aria-label="Default select example" defaultValue={periodo} onChange={onChangePeriodo}>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
            <Option value={4}>4</Option>
          </Select>
        </div>
        <div style={{margin: "5px", fontSize: "18px"}}>
          <p>Semanas</p>
        </div>
      </div>
      <h6 className="tituloEnunciativo">Quiero recibir mi pedido el día:</h6>
      <div style={{ margin: "10px 0px", paddingTop: "5px"}}>
      
        <Radio.Group onChange={onChangeDiaRecojo} defaultValue={diaRecojo}>
          <Radio value={1}>Lunes</Radio>
          <Radio value={2}>Miércoles</Radio>
          {/* <Radio value={2}>Martes</Radio>
          <Radio value={3}>Miércoles</Radio> */}
        </Radio.Group>
      </div>
      {
        suscripcion === 1 &&
        <div className='contenedorBotones'>
          <div className='botonDeSiguiente' onClick={goToPago} style={{ cursor:"pointer" }}>
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
        </div>
      }
      {
        suscripcion === 2 &&
        <div className='contenedorBotones'>
          <div className='botonDeSiguiente' onClick={saveNewPeriodo} style={{ cursor:"pointer" }}>
            <div className='botonOrdenado'>
              <div className='clickASiguiente'>
                <p className='textoDePrecio'>Guardar</p>
              </div>
            </div>
          </div>
          <div className='botonDeSiguiente' onClick={backPage} style={{ cursor:"pointer", backgroundColor: "Red" }}>
            <div className='botonOrdenado'>
              <div className='clickASiguiente'>
                <p className='textoDePrecio'>Cancelar</p>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default SeleccionPeriodo;
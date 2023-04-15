import React, {useState, useEffect} from 'react';
import { Select } from 'antd';
import axios from 'axios';
import StorageService from "../../servicios/storageService";
import { useDispatch, useSelector } from 'react-redux';
import { DistritoService } from '../../servicios/distritoService';
import { asingDeliveryCost } from '../../redux/actions/carritoActions';

function DistritoComponente({asignarDistrito})
{
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { isLoged, infoUser } = state.user;
  //const storageServicce = new StorageService();
  const distritoService = new DistritoService();
  const [distritos, setDistritos] = useState([]);
  //const [distritoStorage, setDistritoStorage] = useState();
  const [distritoSelected, setDistritoSelected] = useState(99);
  // const obtenerDistritos = () => {
  //   axios.get(`${process.env.REACT_APP_BASE_PATH}/distritos`)
  //     .then(({data}) => {
  //       setDistritos(data)
  //     })
  // }

  // const selectDistrito = (e) => {
  //   asignarDistrito(e)
  //   setDistritoStorage(e);
  // }

  const changueDistrito = (e, values) => {
    // dispatch(asingDeliveryCost(values.tarifa*1));
    dispatch(asingDeliveryCost({
      distrito: {
        nombre: values.nombre,
        value: e,
      },
      tarifa: values.tarifa*1
    }));
    setDistritoSelected(e);
  };

  // useEffect(() => {
  //   obtenerDistritos();
  // }, []);

  // useEffect(() => {
  //   obtenerDistritoStorage();
  // }, [distritos]);

  // const obtenerDistritoStorage = () => {
  //   let distrito = storageServicce.getItem('distrito');
  //   setDistritoStorage(distrito);
  // }

  useEffect(()=> {
    distritoService.getDistritos().then(({data})=> {
      setDistritos(data)
    }).then(()=> {
      const distritoToSelect = isLoged ? infoUser.distrito : 99;
      setDistritoSelected(distritoToSelect*1);
      //dispatch(asingDeliveryCost(parseInt(infoUser.tarifaDistrito)));
      dispatch(asingDeliveryCost({
        distrito: {
          value: infoUser.distrito
        },
        tarifa: parseInt(infoUser.tarifaDistrito)
      }));
    });
  }, []);

  // useEffect(()=> {
  //   const distritoToSelect = isLoged ? infoUser.distrito : 99;
  //   setDistritoSelected(distritoToSelect);
  // }, []);

  return(
    <Select onChange={changueDistrito} placeholder="Seleccionar" value={distritoSelected}>
      <Select.Option value={99} tarifa={10.00}>
        Otro distrito
      </Select.Option>
      {
        distritos.map((distrito) =>
          <Select.Option value={distrito.id} tarifa={distrito.tarifa}>
            {distrito.nombre}
          </Select.Option>
        )
      }
    </Select>
  )
}

export default DistritoComponente;
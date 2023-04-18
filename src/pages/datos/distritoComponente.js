import React, {useState, useEffect} from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DistritoService } from '../../servicios/distritoService';
import { asingDeliveryCost } from '../../redux/actions/carritoActions';

function DistritoComponente({asignarDistrito})
{
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { isLoged, infoUser } = state.user;
  const distritoService = new DistritoService();
  const [distritos, setDistritos] = useState([]);
  const [distritoSelected, setDistritoSelected] = useState(99);

  const changueDistrito = (value, values) => {
    dispatch(asingDeliveryCost({
      distrito: value,
      tarifa: values.tarifa*1
    }));
    asignarDistrito(value);
    setDistritoSelected(value);
  };

  useEffect(()=> {
    distritoService.getDistritos().then(({data})=> {
      setDistritos(data)
    }).then(()=> {
      const distritoToSelect = isLoged ? infoUser.distritoId : 99;
      setDistritoSelected(distritoToSelect*1);
      asignarDistrito(distritoToSelect);
      dispatch(asingDeliveryCost({
        distrito: infoUser.distritoId,
        tarifa: parseInt(infoUser.distrito.tarifa)
      }));
    });
  }, []);

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
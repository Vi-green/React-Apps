import React, { useEffect, useState } from 'react';
import axios from "axios";


const SelectTime= ({param}) => { 


const [data, setData] = useState();
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  useEffect(() => {
    if (!param) return;
    axios.get(`https://react-apps-alpha-five.vercel.app/times?param=${param}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [param]);
 
  if (!param) return       <label>
        Seleccionar Hora:  
        <select id="timeSelect" name="time" required>
          <option value="">-- Por favor, seleccione una fecha --</option>
     </select>
      </label>;

    if (loading) return <label>
        Seleccionar Hora:
        <select id="timeSelect" name="time" required>
          <option value="">-- Cargando Horarios --</option>
     </select>
      </label>;
  if (error) return <label>
        Seleccionar Hora:
        <select id="timeSelect" name="time" required>
          <option value="">-- Error Cargando Horarios --</option>
     </select>
      </label>;

  return (
          <label>
        Seleccionar Hora:
        <select id="timeSelect" name="time" required>
          <option value="">--Elige un horario--</option>
{
          data.map((row, i) => (
           <option key={i}>
            {row.time.value}</option> 
        ))}


        </select>
      </label>
)
}

export default SelectTime
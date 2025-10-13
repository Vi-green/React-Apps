import React, { useEffect, useState } from 'react';
import axios from "axios";


const SelectTime = ({ param, onSelect }) => {


  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!param) return;
    const formattedParam = new Date(param).toISOString().split("T")[0];
    axios.get(`https://portal.greenco.com.ar/api/timesC?param='${formattedParam}'`  /*`http://localhost:3000/api/timesC?param=${param}`*/)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [param]);

  const handleChange = (e) => {
    const value = e.target.value;
    onSelect(value);
  }

  if (!param) return <div><label>
    Seleccioná hora</label>
    <select id="timeSelect" name="time" required>
      <option value=""> Primero seleccioná una fecha </option>
    </select>
  </div>;

  if (loading) return <div><label>
    Seleccioná hora</label>
    <select id="timeSelect" name="time" required>
      <option value=""> Cargando horarios disponibles </option>
    </select></div>
  ;
  if (error) return <label>
    Seleccioná hora
    <select id="timeSelect" name="time" required>
      <option value=""> Error cargando horarios </option>
    </select>
  </label>;

  return (
    <div>
    <label>
      Seleccioná hora</label>
      <select id="timeSelect" name="time" required onChange={handleChange}>
        <option value=""></option>
        {
          data.map((row, i) => (
            <option key={i}>
              {row.time.value}</option>
          ))}


      </select></div>
    
  )
}

export default SelectTime

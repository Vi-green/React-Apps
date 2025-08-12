import { useEffect, useState } from "react";
import axios from "axios";




const SelectDate = ({onSelect}) => { 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/dates")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleChange = (e)=> {
    const value = e.target.value;
    onSelect(value);
  }

  if (loading) return <label>
        Seleccionar fecha:
        <select id="dateSelect" name="date" required>
          <option value="">-- Cargando Fechas --</option>
     </select>
      </label>;
  if (error) return <label>
        Seleccionar fecha:
        <select id="dateSelect" name="date" required>
          <option value="">-- Error Cargando Fechas --</option>
     </select>
      </label>;
  return (
          <label>
        Seleccionar fecha:
        <select id="dateSelect" name="date" required onChange={handleChange} >
          <option value="">--Seleccionar Fecha--</option>
          {
          data.map((row, i) => (
           <option key={i}>
            {row.date.value}</option> 
        ))}
        
        
        </select>
      </label>
)
}

export default SelectDate 
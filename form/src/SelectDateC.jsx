import { useEffect, useState } from "react";
import axios from "axios";




const SelectDate = ({ onSelect }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://portal.greenco.com.ar/api/datesC" /*"http://localhost:3000/api/datesC"*/)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    onSelect(value);
  }

  if (loading) return 
  <div>
  <label>
    Seleccioná fecha</label>
    
    <select id="dateSelect" name="date" required>
      <option value=""> Cargando fechas </option>
    </select>
  </div>;
  if (error) return
  <div>
  <label>
    Seleccioná fecha</label>
  
    <select id="dateSelect" name="date" required>
      <option value=""> Error cargando fechas </option>
    </select>
  </div>;
  return (
    <div>
    <label>
      Seleccioná fecha</label>
    
      <select id="dateSelect" name="date" required onChange={handleChange} >
        <option value=""></option>
        {
          data.map((row, i) => (
            <option key={i}>
              {row.date.value}</option>
          ))}
      </select>
    </div>
  )
}

export default SelectDate 

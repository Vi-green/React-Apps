import React, { useState } from 'react'
import SelectDate from './SelectDate'
import SelectTime from './SelectTime'
import axios from "axios";


function Form({onSubmit}) {

 /*Armamos los parametros para los props que vienen desde día y hora*/ 
  const [selectedParam, setSelectedParam] = useState(null); 
  const [selectedTime, setSelectedTime] = useState(null)
/*Seteamos la forma inicial del JSON*/ 
  const[formData, setFormData] = useState({
    razon_social:'',
    cuit:'',
    email:'',
    dia:'',
    hora:'',
    ocs:''
  });
  

 /*Manejamos los cambios de cada input */
 
  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
}
;
/*maneja los cambios del Date child */
const handleChildChange = (val) => {
setSelectedParam(val);
    setFormData((prev) => ({
      ...prev,
      dia: val
    }));
  };
/*maneja los cambios del Time child */
  const handleTimeChange = (val) =>{
    setSelectedTime(val);
        setFormData((prev) => ({
      ...prev,
      hora: val
    }))
  } 

/*On submit:

mandar un async request a gcp
mandar un mail
*/
  const handleSubmit = async (e) => {
    e.preventDefault();
        console.log(formData);
    onSubmit(formData);
    try {
      const res = await axios.post("http://localhost:3000/api/insert", formData);
      console.log(res.data.message);
    } catch (err) {
      console.error("Insert failed:", err);
    }
  };


/*El form*/
  return (
    <>
<h3>Depósito de Secos - 4 de Febrero</h3>
      <p></p>
<form id="bookingForm"   onSubmit={handleSubmit}>
<label>     
        Razón Social:
        <input type="text" name="razon_social"  id = "razon_social" value={formData.razon_social} onChange = {handleChange} required />
      </label>
<p></p>

        <label>
        CUIT:
        <input type="text" name="cuit"  value={formData.cuit} onChange= {handleChange} id = "cuit" required placeholder = "xx-xxxxxxxx-x" maxLength ="13" minLength= "13" pattern = "\d\d-\d\d\d\d\d\d\d\d-\d"/>
      </label>
<p></p>
      <label>
        Email:
        <input type="email" name="email" id= "email" value={formData.email} onChange = {handleChange} required />
      </label>
<p></p>
<label>Ordenes de Compra a entregar:
  <input type= "textarea" id="textbox" name="ocs" rows="4" cols="50" value={formData.ocs} onChange= {handleChange} required />
  </label>
<p></p>

<p></p>
<SelectDate onSelect={handleChildChange} value={formData.dia}/>
<p></p>
<SelectTime param={selectedParam} onSelect={handleTimeChange} value={formData.hora}/>
<p></p>


 <button type="submit" value="Reservar turno" id="button"> Reservar Turno</button>

      </form>

    </>
  )
}

export default Form
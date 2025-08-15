import React, { useState } from 'react'
import SelectDate from './SelectDate'
import SelectTime from './SelectTime'



function Form({onSubmit}) {

 /*Armamos los parametros para los props que vienen desde día y hora*/ 
  const [selectedParam, setSelectedParam] = useState(null); 
  const [selectedTime, setSelectedTime] = useState(null)
/*Seteamos la forma inicial del JSON*/ 
  const[formData, setFormData] = useState({name:'',
    cuit:'',
    email:'',
    date:'',
    time:'',
    oc:'',
    depo: "4 de Febrero 360 - San Martín"
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
      date: val
    }));
  };
/*maneja los cambios del Time child */
  const handleTimeChange = (val) =>{
    setSelectedTime(val);
        setFormData((prev) => ({
      ...prev,
      time: val
    }))
  } 

/*On submit:

mandar un async request a gcp
mandar un mail
*/
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(formData);
    onSubmit(formData);

  };
/*El form*/
  return (
    <>
<h3>Depósito de Secos - 4 de Febrero</h3>
      <p></p>
<form id="bookingForm"   onSubmit={handleSubmit}>
<label>     
        Razón Social:
        <input type="text" name="name"  id = "name" value={formData.name} onChange = {handleChange} required />
      </label>
<p></p>

        <label>
        CUIT:
        <input type="text" name="cuit"  value={formData.cuit} onChange= {handleChange} id = "cuit" required placeholder = "xx-xxxxxxxx-x" maxLength ="13" minLength= "13" pattern = "\d\d-\d\d\d\d\d\d\d\d-\d"/>
      </label>
<p></p>
      <label>
        Email:
        <input type="email" name="email" id= "email" value={formData.email} onChange = {handleChange} required pattern ="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"  />
      </label>
<p></p>
<label>Ordenes de Compra a entregar:
  <input type= "textarea" id="textbox" name="oc" rows="4" cols="50" value={formData.oc} onChange= {handleChange} required />
  </label>
<p></p>

<p></p>
<SelectDate onSelect={handleChildChange} value={formData.date}/>
<p></p>
<SelectTime param={selectedParam} onSelect={handleTimeChange} value={formData.time}/>
<p></p>


 <button type="submit" value="Reservar turno" id="button"> Reservar Turno</button>

      </form>

    </>
  )
}

export default Form
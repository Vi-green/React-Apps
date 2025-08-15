import React, { useState } from 'react'
import './App.css'
import Header from  './Header.jsx'  
import Form from './Form.jsx'
import FormC from './FormC.jsx'
import Response from'./Response.jsx'
import Logo from './Logo.jsx'

const App = () => {
const [conditional, setConditional] = useState(true); 
const [formData, setFormData] = useState(null)
const [val, setVal] = useState(null)
  

const handleFormSubmit = (data) =>{
  setFormData(data);
  setConditional(false);
}

const handleClick = (e)=> {
    const value = e.target.value;
    setVal(null);
    setConditional(value);
  }

  const handleChange = (e)=> {
    e.preventDefault();
    const value = e.target.value;
    setVal(value);
    console.log(value);
  }
  

if(conditional)
  return (
    <>
    <Header/>
    <label>
        Seleccionar Depósito:
        <select id="depoSelect" name="depo" onChange={handleChange} required>
          <option value="">--Seleccione un depósito --</option>
          <option value={(true)}>Depósito Secos (4 de Febrero)</option>
          <option value={(false)}>Depósito Refrigerado-Congelado-Chocolates (Sgto. Cabral)</option>
     </select>
      </label>


   {val == "true" && <Form onSubmit={handleFormSubmit} />}
   {val == "false" && <FormC onSubmit={handleFormSubmit} />}
    <Logo />
    </>
  );

  return(
      <div>
<h1> Tu turno ha sido agendado {formData.name} !
</h1>
<h3>Te esperamos el {formData.dia} a las {formData.hora} en {val == "true" ? "4 de Febrero 3640 - San Martín" : "Sargento Cabral 1130 - San Martín" }  </h3>
<h4>Muchas gracias por usar nuestro sistema. </h4>
  <p></p>
  <h4>En caso de querer cancelar tu turno, comunicarse con nuestro departamento de Compras</h4>
  <button onClick={handleClick} value={(true)}> Sacar otro turno </button>
  <p></p>
  <Logo />
      </div>

    
    
  )

  
}

export default App

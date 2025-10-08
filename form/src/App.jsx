import React, { useState } from 'react'
import './App.css'
import Header from './Header.jsx'
import Form from './Form.jsx'
import FormC from './FormC.jsx'
import Logo from './Logo.jsx'
import { AddToCalendarButton } from 'add-to-calendar-button-react';



const App = () => {
  const [conditional, setConditional] = useState(true);
  const [formData, setFormData] = useState(null)
  const [val, setVal] = useState(null)
  const [hora, setHora] = useState("")



  const handleFormSubmit = (data) => {
    setFormData(data);
    setHora(data.hora.slice(0,5));
    setConditional(false);
    
  }

  const handleClick = (e) => {
    const value = e.target.value;
    setVal(null);
    setConditional(value);
  }

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setVal(value);
    console.log(value);
  }


  if (conditional)
    return (
      <div className='containerMax'>
        <Header />
          <p></p>
          <select id="depoSelect" name="depo" onChange={handleChange} required>
            <option value="">Seleccioná el depósito </option>
            <option value={(true)}>Depósito Secos-Cosmética (4 de Febrero)</option>
            <option value={(false)}>Depósito Refrigerado-Congelado-Chocolates (Sgto. Cabral)</option>
          </select>
       
        {val == "true" && <Form onSubmit={handleFormSubmit} />}
        {val == "false" && <FormC onSubmit={handleFormSubmit} />}
        
        <Logo />
      </div>
    );

  return (
    <div className='containerMax'>
      <h1> ¡Turno confirmado!
      </h1>
      <h3>&#9989; Día  {formData.dia} </h3>
      <p></p>
      <h3>&#9989; Hora {hora.substring(0,5)} </h3> 
      <p></p>
      <h3>&#9989; Depósito: {val == "true" ? "Depósito 4 de Febrero 3640 - San Martín" : "Depósito Sargento Cabral 1130 - San Martín"}  </h3>
      <p></p>
      <h4>Gracias por organizar tu entrega con nosotros. &#128154; </h4>
      <h4>En Green & Co. valoramos tu tiempo y trabajamos para que cada recepción sea ágil y ordenada.</h4>
      <p></p>
      <h4>Si necesitás cancelar o modificar tu turno, comunicate con:</h4>
      <h4>&#128231; recepciones@greenco.com.ar o con el departamento de Compras.
</h4>

      <nav className="container">
      
      <div className="item"><button onClick={handleClick} value={(true)}> &#128197; Quiero sacar otro turno </button> </div> 
      
      <div className="item"><AddToCalendarButton 
      name="Turno - Greenco"
      startDate={`${formData.dia}`}  
      styleLight="--btn-background: #4e8850; --btn-text: #e0e6d7; --font:Montserrat,Helvetica Neue, Helvetica, Arial, sans-serif; --font-weight:600; "
      styleDark="--btn-background: #36464a;"
      options={['Apple','Google','Yahoo','Microsoft365', 'MicrosoftTeams', 'Outlook.com']} 
      label="Agregar al Calendario">
      </AddToCalendarButton></div> 
      
      
      </nav>
      <p></p>
           

      <Logo />
    </div>
    
  )
}

export default App

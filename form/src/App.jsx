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
      <>
        <Header />
        <label>
          Seleccionar Depósito:
          <p></p>
          <select id="depoSelect" name="depo" onChange={handleChange} required>
            <option value="">--Seleccione un depósito --</option>
            <option value={(true)}>Depósito Secos-Cosmética (4 de Febrero)</option>
            <option value={(false)}>Depósito Refrigerado-Congelado-Chocolates (Sgto. Cabral)</option>
          </select>
        </label>
        {val == "true" && <Form onSubmit={handleFormSubmit} />}
        {val == "false" && <FormC onSubmit={handleFormSubmit} />}
        <Logo />
      </>
    );

  return (
    <div>
      <h1> Tu turno ha sido agendado {formData.name} !
      </h1>
      <h3>&#9989; Día: {formData.dia} </h3>
      <p></p>
      <h3>&#9989; Hora: {hora.substring(0,5)} </h3> 
      <p></p>
      <h3>&#9989; Depósito: {val == "true" ? "4 de Febrero 3640 - San Martín" : "Sargento Cabral 1130 - San Martín"}  </h3>
      <p></p>
      <h4>Muchas gracias por usar nuestro sistema. </h4>
      <p></p>
      <h4>En caso de querer cancelar su turno, por favor comunicarse con nuestro departamento de Compras o con Recepciones a recepciones@greenco.com.ar .</h4>

      <nav className="container">
      
      <div className="item"><button onClick={handleClick} value={(true)}> Sacar otro turno </button> </div> 
      
      <div className="item"><AddToCalendarButton 
      name="Turno - Greenco"
      startDate={`${formData.dia}`}  
      styleLight="--btn-background: #28ad0d; --btn-text: #fff; --font: system-ui, Avenir, Helvetica, Arial, sans-serif;"
      styleDark="--btn-background: #000;"
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

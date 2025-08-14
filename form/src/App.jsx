import React, { useState } from 'react'
import './App.css'
import Header from  './Header.jsx'  
import Form from './Form.jsx'
import Response from'./Response.jsx'
import Logo from './Logo.jsx'



const App = () => {
const [conditional, setConditional] = useState(true); 
const [formData, setFormData] = useState(null)
  

const handleFormSubmit = (data) =>{
  setFormData(data);
  setConditional(false)
}

const handleClick = (e)=> {
    const value = e.target.value;
    setConditional(value);
  }

  

if(conditional)
  return (
    <>
    <Header />
    <Form onSubmit={handleFormSubmit} />
    <Response />
    <Logo />
    </>
  );

  return(
      <div>
<h1> Tu turno ha sido agendado {formData.name} !
</h1>
<h3>Te esperamos el {formData.date} a las {formData.time} en 4 de Febrero 3640 - San Martín  </h3>
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

import React, { useState } from 'react'
import SelectDate from './SelectDate'
import SelectTime from './SelectTime'




function Form() {

  const [selectedParam, setSelectedParam] = useState(null);

  return (
    <>
      
<form id="bookingForm">
      <label>
        Razón Social:
        <input type="text" name="name"  id = "name" required />
      </label>
<p></p>
        <label>
        CUIT:
        <input type="text" name="cuit"  id = "cuit" required placeholder = "xx-xxxxxxxx-x" maxlength ="13" minlength= "13" pattern = "\d\d-\d\d\d\d\d\d\d\d-\d"/>
      </label>
<p></p>
      <label>
        Email:
        <input type="email" name="email" id= "email" required />
      </label>
<p></p>
<SelectDate onSelect={setSelectedParam}/>
<p></p>
<SelectTime param= {selectedParam}/>
<p></p>

<label>Ordenes de Compra a entregar:
  <input type= "textarea" id="textbox" name="textbox" rows="4" cols="50" required />
  </label>
      </form>

    </>
  )
}

export default Form
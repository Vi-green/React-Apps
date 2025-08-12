import { useState } from 'react'

  const handleClick = () => {
    console.log('clicked')
  }
function Submit() {

  return (
    <>
      
 <button type="submit" value="Reservar turno" id="button" onClick={handleClick} > Reservar Turno</button>
      

    </>
  )
}

export default Submit
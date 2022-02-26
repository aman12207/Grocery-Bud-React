import React, { useEffect } from 'react'

const Alert = ({type,msg,removeAlert},list) => {
  useEffect(()=>{
    const displayAlert = setTimeout(()=>{
      removeAlert(false,'','');
    },3000);
    return ()=>{clearInterval(displayAlert)}
  },[list])
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
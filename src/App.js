import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage=()=>{
  const listStored = localStorage.getItem('List');
  if(listStored){
    return JSON.parse(listStored);
  }
  else 
  return [];
}

function App() {
  const [value,setValue] = useState("")
  const [list,setList] = useState(getLocalStorage());
  const [isEditing,setEditing] = useState(false);
  const [EditId,setEditId] = useState(-1);
  const [alert,setAlert] = useState({show :false , type :'' , msg : ''});
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!value){
      showAlert(true,"danger",'Please Enter Value');
    }
    else if(value && isEditing){
      setList(list.map((item,index)=>{
        if(EditId === index){
          return value;
        }
        return item;
      }))
      setEditing(false);
      showAlert(true,"success",'value changed');
    }
    else{
      setList([...list,value]);
      showAlert(true,"success",'Item Added to the list');
    }
    setValue("");
  }
  const handleEdit=(EditValue,Editindex)=>{
    setValue(EditValue);
    setEditing(true);
    setEditId(Editindex);
  }
  const handleDelete = (Deleteindex) =>{
    setList(list.filter((item,index)=>{
      if(index!==Deleteindex)
        return item;
    }));
    showAlert(true,"danger",'Item Removed');
  }
  const showAlert=(show = false , type ='' , msg = '')=>{
    setAlert({show,type,msg});
  }
  const clearAll = ()=>{
    setList([]);
    showAlert(true,"danger",'empty list');
  }
  useEffect(()=>{
    localStorage.setItem('List',JSON.stringify(list));
  },[list])
  return (
    <section className="section-center">
    <form className="grocery-form" onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
      <h3>grocery bud</h3>
      <div className="form-control">
        <input onChange={(e)=> setValue(e.target.value)} type="text" className="grocery" placeholder="e.g. eggs" value={value}/>
        <button type="submit" className="submit-btn">{isEditing ? 'Edit' : 'submit'}</button>
      </div>
    </form>
    {list.length>0 && <div className='grocery-container'>
      <List list = {list} handleEdit={handleEdit} handleDelete= {handleDelete}/>
      <button onClick={clearAll} className='clear-btn'>Clear All</button>
    </div>}
  </section>
  )
}

export default App

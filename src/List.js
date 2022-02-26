import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({list,handleEdit,handleDelete}) => {
  return (
    <div className='grocery-list'>
    {list.map((item,index)=>{
      return <article className='grocery-item'>
      <p className='title'>{item}</p>
      <div className="btn-container">
        <button onClick={()=>handleEdit(item,index)} type="button" className="edit-btn">
        <FaEdit />
        </button>
        <button onClick={()=>handleDelete(index)} type="button" className="delete-btn">
        <FaTrash/>
        </button>
      </div>
    </article>
    })}
    </div>  
    )
}

export default List

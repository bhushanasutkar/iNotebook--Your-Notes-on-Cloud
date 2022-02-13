import React,{useContext} from 'react'
import { useState } from 'react';
import Notecontext from "../contexapi/Notecontext"
const Addnotes = () => {

    const context = useContext(Notecontext);
    const { addnotes} = context;
    const  [Note, setNote] = useState({title:"",description:"",tag:""})
    const handleclick=(e)=>{
        e.preventDefault();

         addnotes(Note.title,Note.description,Note.tag);
         setNote({title:"",description:"",tag:""})
    }
    const handleonchange=(e)=>{
        setNote({...Note,[e.target.name]:e.target.value}) 
    }
    
    return (
        <div className="container my-2">
        <h1>Add Events</h1>
        <form className="my-4">
            <div className="mb-3">
                <label htmlFor="title" className="form-label fw-bold"> Event Title</label>
                <input type="text" onChange={handleonchange} style={{backgroundColor:"rgb(176 161 180)"}} className="form-control" value={Note.title} id="title" name="title" aria-describedby="emailHelp" />
                
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label fw-bold">Description</label>
                <input type="text"onChange={handleonchange} style={{backgroundColor:"rgb(176 161 180)"}} className="form-control" value={Note.description} id="description"  name="description" />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text"onChange={handleonchange} style={{backgroundColor:"rgb(176 161 180)"}} value={Note.tag} className="form-control"id="tag"  name="tag" />
            </div>
         
            <button disabled={Note.title.length<5||Note.description.length<5} type="submit" onClick={handleclick} className="btn btn-dark">Add Event</button>
        </form>
    </div>
    )
}

export default Addnotes

import React, { useContext, useState,useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import Notecontext from "../contexapi/Notecontext"
import Addnotes from './Addnotes';
import Noteitem from './Noteitem';
const Notes = () => {
    
    const context = useContext(Notecontext);
    const { notes, getallnotes, editnote } = context;
    const ref = useRef(null);
    const refclose = useRef(null);
    let history=useHistory();

    useEffect(() => {
        if(localStorage.getItem('token')){
         getallnotes();
            console.log(notes)
    }
    else{
        history.push("/login")
    }
    // eslint-disable-next-line
    }, [])
    const  [Note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
    
    const handleclick=(e)=>{
        editnote(Note.id,Note.etitle,Note.edescription,Note.etag)
        refclose.current.click();
       
    }
    const handleonchange=(e)=>{
        setNote({...Note,[e.target.name]:e.target.value}) 
    }
    const updatenode = (Currentnote) => {
        ref.current.click();
        setNote({id:Currentnote._id, etitle:Currentnote.title, edescription:Currentnote.description,etag:Currentnote.tag});
    }
   
//   const notess=Object.entries(notes);
    
    return (
        <>
            <Addnotes />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Event</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" onChange={handleonchange}  className="form-control" value={Note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" onChange={handleonchange}  className="form-control" value={Note.edescription} id="edescription" name="edescription" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" onChange={handleonchange}   className="form-control"value={Note.etag} id="etag" name="etag" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  disabled={Note.etitle.length<5||Note.edescription.length<5} type="button"onClick={handleclick} className="btn btn-primary">Update Event</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3 mx-1">
                <h1>Events List</h1>
                <div className="container mx-2">
                {notes.length===0 && 'No events to display'}
                </div>
                {notes.map((note) => {
                  return <Noteitem key={note._id} updatenode={updatenode} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes


import { useState } from "react";
import NoteContext from "./Notecontext";


const NoteState = (props) => {
    const host = "http://localhost:5000";
    // const notesinitial = []

    const [notes, setnotes] = useState([]);

    const getallnotes = async() => {
        const response = await fetch(`${host}/api/notes/fetchallusers`, {
            method: 'GET', 
    
            headers: {
                'Content-Type': 'application/json',
                
                'auth-token': localStorage.getItem('token')
            }
            
        });
        const json= await response.json();
        console.log(json)
        setnotes(json);
    }
    const addnotes = async(title, description, tag) => {
        console.log(notes)
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
    
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const note= await response.json();
        setnotes([...notes,note])
    }
    const deletenote = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'auth-token': localStorage.getItem('token')
            },
           
        });
        const json=  response.json();
        console.log(json)








        let newnote = notes.filter((note) => { return note._id !== id });
        setnotes(newnote);

    }
    const editnote = async(id, title, description, tag)=>{
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.

        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
    });
    const json= await response.json();
    console.log(json);

        let newnootes=JSON.parse(JSON.stringify(notes))
   for (let index = 0; index < newnootes.length; index++) {
        const element = newnootes[index];
        if (element._id === id) {
            newnootes[index].title = title;
            newnootes[index].description = description;
            newnootes[index].tag = tag;
            break;
        }

    }
    setnotes( newnootes);
}


return (

    <NoteContext.Provider value={{notes, addnotes, deletenote, editnote, getallnotes}}>
        {props.children}
    </NoteContext.Provider>
)

}
export default NoteState

//creating the common state for all note components
//with the help of noteContext
import NoteContext from './noteContext';
import React, { useState } from 'react';


const NoteState = (props) =>{
    
    const [notes,updateNotes] = useState([]);
    
    //******************************** */
    // for alert message
    const [msg,setMsg] = useState("");
    
    
    
    
    
    //crude functionality
    //fetching all notes for db
    const host =window.location.origin;
    const fetchUserNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/getnotes`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('authTokenNotes')
            }
           
        });

        const data = await response.json();

        //updating current page with new data
        if(data.usernotes!==undefined)
        updateNotes(data.usernotes);

        //for alert messsage
        setMsg((data.usernotes!==undefined) ? "successfully fetched the notes" : data.err)
        
    }
    









    //ADD NOTE
    const addNote = async (content)=>{
        const response = await fetch(`${host}/api/notes/createnotes`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('authTokenNotes')
            },
            body:JSON.stringify(content)
        });
        const data = await response.json();
        
        //updating the current page with new data
        if(data.createdNote!==undefined)
        updateNotes(notes.concat(data.createdNote));
        
        //for alert msg
        setMsg((data.createdNote!==undefined) ? "added the note" : data.err);
        
    }
    
    

    
    

    
    

    
    //DELETE NOTE
    const deleteNote = async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:"DELETE",
            headers: {
                'content-type': 'application/json',
                'auth-token':localStorage.getItem('authTokenNotes')
            }
        });
        const data = await response.json();
        updateNotes(notes.filter((notes)=> notes._id!==id));
        //search for filter function in array

        
        setMsg((data.success!==undefined) ? data.success : data.err)
    }










    //EDIT NOTE
    const editNote = async (note)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${note._id}`,{
            method:'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('authTokenNotes'),
            },
            body:JSON.stringify(note)
        });
        
        const data = await response.json();
        
        fetchUserNotes(); //updating the current page with new data

        //seting the alert
        setMsg((data.success!==undefined) ? data.success : data.err);
        
    }

    

    
    

    
    
    


    

    
//authentication functionality
    //LOGIN
    const login = async (e,email,password)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password":password             
         })
        })
        const data = await response.json();
        
        if(data.err===undefined)
        localStorage.setItem('authTokenNotes',data.logintoken);

        setMsg((data.logintoken!==undefined) ? "logged in" : data.err)
    }


    //SIGNUP
    const signup = async (e,user,email,password) =>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/signup`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                'name': user,
                'email':email,
                'password': password
            })
        })
        const data = await response.json();  //data = {authtoken : , err: }
        
        //if there is no err then send success message else alert the error
        (data.err === undefined) ? setMsg("successfully signed up") : setMsg(data.err)

        //set the authtoken to localstorege
        if(data.err === undefined)
        localStorage.setItem('authTokenNotes',data.authtoken)
    
    }
    




    return (
        <NoteContext.Provider value={{notes,updateNotes,addNote,deleteNote,fetchUserNotes,editNote , login,signup,msg}}>
            {props.children}
        </NoteContext.Provider>

    );
} 

export default NoteState;
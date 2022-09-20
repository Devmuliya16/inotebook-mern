import React,{useState , useContext} from 'react'
import noteContext from "../context/noteContext";


const NoteEditor = () => {
    const data = useContext(noteContext);
    const {addNote} = data;

      //declaring object to uppend
      const [note,updatenote] = useState({title:"", discription:"",tag:""}); //main note object
      
      //for constantly listning the changes
      const onChange = (e)=>{
          updatenote({...note,[e.target.name]: e.target.value});
        }
        
        //for adding to the note on click
        const uppendNote = ()=>{
          addNote(note);
          updatenote({title:"",discription:"",tag:""});
      }
  return (
    <>
    <div style={{display:'flex',flexWrap:'wrap',flexDirection:'column',justifyContent:'space-between', marginTop:'10px'}}>
    <h3>Create your notes</h3>
        <div className="input-group flex-nowrap m-1">
          <span className="input-group-text" id="addon-wrapping">
            Title
          </span>
          <input
            type="text"
            className="form-control"
            aria-describedby="addon-wrapping"
            name="title" //for onChange function
            onChange={onChange}
            value={note.title}
            />
          
        </div>
        <div className="input-group flex-nowrap m-1">
          <span className="input-group-text" id="addon-wrapping">
            Tag
          </span>
          <input
            type="text"
            className="form-control"
            aria-describedby="addon-wrapping"
            name="tag" //for onChange function
            onChange={onChange}
            value={note.tag}
            />
          
        </div>
        <div className="form-floating flex-nowrap m-1">
          <textarea
            className="form-control"
            style={{ height: "150px", resize:"none"}}
            placeholder="Leave a comment here"
            id="floatingTextarea"
            name="discription" //for onChange function
            onChange={onChange}
            value={note.discription}
            />
          <label htmlFor="floatingTextarea" >Note</label>
        </div>
        <button type="button" className="btn btn-primary m-1" onClick={uppendNote} disabled={note.discription.length<5}>Save Notes</button> 
    </div>
    </>
  )
}

export default NoteEditor


//todo : note minimum length 10

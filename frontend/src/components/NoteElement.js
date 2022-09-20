import React, { useContext } from "react";
import noteContext from "../context/noteContext";

function NoteElement(props) {
  //importing function of delete note
  const data = useContext(noteContext);
  const { deleteNote } = data;

  const deleteNoteLocal = (id) => {
    console.log("deleted note of id:" + id);
    deleteNote(id);
  };
  return (
    <div className="card m-1">
      <div className="card-body">
        <h4 className="card-title">{props.note.title}</h4>
        <h6>
          <span className="badge bg-secondary">{props.note.tag}</span>
        </h6>
        <h5><p className="card-text">{props.note.discription}</p></h5>

        <button 
          className="btn btn-primary m-1 btn-sm" 
          onClick={props.editnote}>
          Edit
        </button>
        <button
          className="btn btn-primary m-1 btn-sm"
         
          onClick={() => {
            deleteNoteLocal(props.note._id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteElement;

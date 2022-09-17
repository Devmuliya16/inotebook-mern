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
        <h5 className="card-title">{props.note.title}</h5>
        <h6>
          <span className="badge bg-secondary">{props.note.tag}</span>
        </h6>
        <p className="card-text">{props.note.discription}</p>

        <button 
          className="btn btn-primary m-1" 
          onClick={props.editnote}>
          Edit
        </button>
        <button
          className="btn btn-primary m-1"
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

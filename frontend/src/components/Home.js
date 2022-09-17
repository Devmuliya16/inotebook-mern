import React, { useContext, useEffect, useRef ,useState} from "react";
import NoteElement from "./NoteElement";
import noteContext from "../context/noteContext";
import NoteEditor from "./NoteEditor";

const Home = () => {
  //loading all props from the NoteState
  const data = useContext(noteContext);
  const { notes, fetchUserNotes,editNote} = data;

  useEffect(() => {
    fetchUserNotes();
  }, []);


  //******************************************************************************************** */
  //declaring object to uppend
  const [note,updatenote] = useState({title:"", discription:"",tag:""}); //not main note object
    
  //for constantly listning the changes
  const onChange = (e)=>{
      updatenote({...note,[e.target.name]: e.target.value});
  }
  
  
  const ref = useRef(null);
  const refClose = useRef(null);
  const click = (noteToEdit) => {
    ref.current.click();
    updatenote(noteToEdit);
    console.log('updated: '+ noteToEdit);
    
  };

  const handleClick = (e) =>{
    e.preventDefault();
    refClose.current.click();
    editNote(note);
  }

  
  return (
    <>
      <div className="d-flex flex-column justify-content-around mx-auto w-75">
        <NoteEditor />

        {/* for modal */}
        <div>
          <button
            type="button"
            className="btn d-none btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            ref={ref} //this is for refrencing
          >
            Launch static backdrop modal
          </button>

          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Edit note
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>


                <div className="modal-body">
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
                  <div className="form-floating m-1">
                    <textarea
                      className="form-control"
                      style={{ height: "150px", resize: "none" }}
                      placeholder="Leave a comment here"
                      id="floatingTextarea"
                      name="discription" //for onChange function
                      onChange={onChange}
                      value={note.discription}
                    />
                    <label htmlFor="floatingTextarea">Note</label>
                  </div>
                </div>



                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={refClose}
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.discription.length<5}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3>your notes</h3>
          <div className="d-flex justify-content-left flex-wrap">
            { (notes.length===0) ? <h4>{'no notes to display'}</h4> :
            notes.map((note) => {
              return <NoteElement key={note._id} note={note} editnote={()=>{click(note)}} />;
              //here key value is to prevent error
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

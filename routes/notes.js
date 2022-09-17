const express = require('express');
const notes = require("../models/Notes");

//instaintiating the router
const router = express.Router();


//Endpoint 1: to create note
//first of all we have to authenticate the user 
//atechting the fetch user route
const fetchuser = require('../middleware/fetchuser');

router.post('/api/notes/createnotes',fetchuser, async (req,res)=>{
    try{
    //getting the note body
    const note = {
        userid: req.user.id, //appended from user
        title : req.body.title,
        tag: req.body.tag,
        discription: req.body.discription
    }

    const createdNote = await notes.create(note);
    res.json({createdNote});
    

    }catch(err){
        console.error(err.message);
        res.status(500).josn({err:"server side error"});
    }
})



//Endpoint 2: fetching all notes corrosponding to user
router.get('/api/notes/getnotes',fetchuser,async (req,res)=>{
    try{
        const usernotes = await notes.find({userid: req.user.id });
        res.send({usernotes});

    }catch(err){
        console.error(err.message);
        res.status(500).json({err:"internal server error"});
    }
})





//Endpoint 3: for updating the note
router.put("/api/notes/updatenote/:notesid",fetchuser, async (req,res)=>{
    try{
      //getting the note id by the url
      const noteid = req.params.notesid;

      //finding the notes by notesid
      let note = await notes.findById(noteid);
      
      //if note is not there
      if(!note)
        return res.status(400).json({err:"not found"});

      
      const userid = note.userid;
      
      //if it is not user's note
      if(userid != req.user.id)//req.user.id is appended in the fetchuser function from token
        return res.status(400).json({err:"not found"});

      //if both user and note are authenticated then update
            //creating the object of note
            let updatednote = {};
            if(req.body.title) {updatednote.title = req.body.title;}
            if(req.body.discription) {updatednote.discription = req.body.discription;}
            if(req.body.tag) {updatednote.tag = req.body.tag;}

            //find note and save it
            updatednote = await notes.findByIdAndUpdate(noteid,{$set: updatednote},{new: true});
            res.json({success:"note updated successfully"});
    }
    catch(err){
      console.error(err.message);
      res.status(500).json({err:"internal server error"});
    }
})





//Endpoint 4 for deleting the note
router.delete("/api/notes/deletenote/:notesid",fetchuser, async (req,res)=>{
    try{
      //get the notes id from url
      const noteid = req.params.notesid;

      //find the note with id
      const note = await notes.findById(noteid);

      //if note doesnt exist
      if(!note)
        return res.status(400).json({err:"not found"});

      //if it is not user's note
      userid = note.userid
      if(userid != req.user.id) //req.user.id is appended in the fetchuser function from token
        return res.status(400).josn({err:"not found"});

      //if it is users note then delete it
      const deletednote= await notes.findByIdAndDelete(noteid);


      console.log(deletednote);
      res.json({success:"note is deleted successfully"});

      
    }catch(err){
      console.error(err.message);
      res.status(500).send("internal server error");
    }
});

module.exports = router;
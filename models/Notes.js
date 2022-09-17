const mongoose = require('mongoose');
const {Schema} = mongoose;

const notesSchema = new Schema({
    userid:{
        type: String,
        required:true
    },
    tag:{
        type: String,
        required:false
    },
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required: true
    },
    Timestamp:{
        type: Date,
        default: Date.now
    }
})

const notes = mongoose.model('note',notesSchema);

module.exports = notes;
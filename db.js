const mongoose = require('mongoose');

//for local environmant variable reading
const path = require('path');
require('dotenv').config({path:`${path.resolve(__dirname,'.env')}`});
const mongoURL = process.env.MONGO_URL;


const connectToMongo = () =>{
    mongoose.connect(mongoURL,()=>{
        console.log('connected successfully to mongoose');
    })
}

module.exports = connectToMongo;
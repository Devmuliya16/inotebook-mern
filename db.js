const mongoose = require('mongoose');

//for local environmant variable reading
require('dotenv').config({path:".env"});
const mongoURL = process.env.MONGO_URL;


const connectToMongo = () =>{
    mongoose.connect(mongoURL,()=>{
        console.log('connected successfully to mongoose');
    })
}

module.exports = connectToMongo;
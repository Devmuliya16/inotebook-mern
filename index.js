//connecting to the db
const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const app = express();

//for cors cross origin resource sharing
//CORS is typically required to build web applications that access APIs hosted on a different domain or origin.
var cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/notes'));

// app.get('/',(req,res)=>{
//     res.send('hello world');
// })



// app.get('/*', function (req, res) {res.sendFile('frontend\public\index.html'),
//     (err)=>{res.status(500).send(err)}});

//if environment process NODE_ENV is production then use buid virson of the frontend
if(process.env.NODE_ENV === "production"){
    app.use(express.static('frontend/build'));
}


//server start
//because the variable port will be provided by the server
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`running on ${port}`); 
});
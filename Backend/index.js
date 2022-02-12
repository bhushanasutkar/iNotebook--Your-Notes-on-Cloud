// const connecttomongo= require('./db');

const mongoose = require('mongoose');
const express = require('express')
var cors = require('cors')
// connecttomongo();

const mongoUri="mongodb+srv://Bhushan:mongoatlas@cluster0.dyuoe.mongodb.net/inotebook?retryWrites=true&w=majority";

    mongoose.connect(mongoUri
      ).then(()=>{
        console.log("Mongoose connected successfully");
    }).catch((err)=>{
        console.log("Mongoose could not connect");
    })


const app = express();
const port = 5000;


app.use(cors())

app.use(express.json())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`iNotebook app listening at http://localhost:${port}`)
})



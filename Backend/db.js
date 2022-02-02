const mongoose= require('mongoose');
const mongoUri="mongodb://localhost:27017/iNotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const connecttomongo=()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("Mongoose connected succesfully");
    })
}
module.exports=connecttomongo;
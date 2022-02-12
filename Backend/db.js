const mongoose= require('mongoose');
const mongoUri="mongodb+srv://Bhushan:Bhushan@cluster0.dyuoe.mongodb.net/iNotebook?retryWrites=true&w=majority";
const connecttomongo=()=>{
    mongoose.connect(mongoUri,{
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }).then(()=>{
        console.log("Mongoose connected successfully");
    }).catch((err)=>{
        console.log("Mongoose could not connect");
    })
}
module.exports=connecttomongo;
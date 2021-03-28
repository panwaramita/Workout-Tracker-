//require the package morgan mongoose express
const express=require("express");
const logger=require("morgan");
const mongoose=require("mongoose");
const PORT=process.env.PORT || 8000;
const app=express();
app.use(logger('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
//get the mongoose connection to the mongodb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });
//set the routes 
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
//listen to the port
app.listen(PORT,()=>{
    console.log(`listen to the port ${PORT}`);
});
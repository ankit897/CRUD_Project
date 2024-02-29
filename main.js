// imports

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 4000;

//database connection
// async function main(){
//    await mongoose.connect(process.env.DB_URI);
// }

// main().then(()=>{
//     console.log("DB connected");
// }).catch((err)=>{
//     console.log("DB error");
//     console.log(err);
// })
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
const db = mongoose.connection;
db.on("error", (error)=>{
    console.log(error);
})
db.once("open", ()=>{
    console.log("databse is connected");
})
//middlewares
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use(express.static("uploads"));
app.use(session({
    secret :"my secret key",
    saveUnitialized: true,
    resave: false
})
);

app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})
// set template engine
app.set("view engine", "ejs");

//route prefix
app.use("",require("./routes/routes"));
app.get("/", (req,res)=>{
    res.send("Hello world");
})
app.listen(port, ()=>{
    console.log(`port is running ${port}`);
})
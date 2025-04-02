const express = require("express");
const app = express();
const mongodb = require("./data/database");
const bodyParser = require("body-parser");

app.use(bodyParser.json());


app.use("/", require("./routes/index"))

const port = process.env.PORT || 3002;

process.on("uncaughtException", (err, origin)=>{
    console.log(process.stderr.fd, `caught exception: ${err}\n` * `Exception origin: ${origin}`);
});


mongodb.initdb((err) =>{
    if(err){
        console.log(err)
    }
    else{
        app.listen(port, () =>{
            console.log("Database is listening at " + ((port)));
        });
    }
});
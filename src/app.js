const express = require('express');

const app = express();

app.get("/user",(req, res)=>{
    res.send({firstName:"Akki",lastName:"hnji"})
});

app.post("/user",(req,res)=>{
    console.log("data saved");
    res.send("data saved successfully");
})
app.use("/test",(req, res)=>{
    res.send("heloo server");
});

app.listen(3000, ()=>{
    console.log("server is running on port 3000");
});


let express = require("express")
let app = express()

app.use(express.json())

app.get("/std-read",(req,res)=>{
    res.send("student read api")
})

app.post("/std-insert",(req,res)=>{
    res.send("student insert api")
})

app.listen(3000,(req,res)=>{
    console.log("server is running ...")
})
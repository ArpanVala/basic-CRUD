let express = require("express")
const connection = require("./src/dbConnection")
let app = express()

app.use(express.json())

app.get("/std-read",async (req,res)=>{
    const db = await connection()
    const studentCollection = db.collection("students")

    const data = await studentCollection.find().toArray()

    const resObj={
        "status":1,
        "msg":"Student data",
        data
    }

    res.send(resObj)
})

app.post("/std-insert",async (req,res)=>{
    const db = await connection()
    const studentCollection = db.collection("students")

    const {s_name,s_age}= req.body;
    const obj={s_name,s_age}

    const insertRes = await studentCollection.insertOne(obj)

    const resObj={
        "status":1,
        "msg":"Data inserted",
        insertRes
    }

    res.send(resObj)
})

app.listen(3000,(req,res)=>{
    console.log("server is running ...")
})
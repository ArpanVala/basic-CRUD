let express = require("express")
const connection = require("./src/dbConnection")
const { ObjectId } = require("mongodb")
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

    const {s_name,s_age,s_mail}= req.body;
    const obj={s_name,s_age,s_mail}


    // check if email already existed 
    const checkEmail = await studentCollection.findOne({s_mail})
    if(checkEmail != null){
        res.send({"status":0,"msg":"emial already existed"})
        return
    }

    const insertRes = await studentCollection.insertOne(obj)

    const resObj={
        "status":1,
        "msg":"Data inserted",
        insertRes
    }

    res.send(resObj)
})

app.delete("/std-delete/:id",async (req,res)=>{
    const {id} = req.params
     const db = await connection()
    const studentCollection = db.collection("students")

    const delRes = await studentCollection.deleteOne({_id: new ObjectId(id)})

    const resObj={
        "status":1,
        "msg":"Data deleted",
        delRes
    }

    res.send(resObj)

})

app.put("/std-update/:id",async(req,res)=>{
    const db = await connection()
    const studentCollection = db.collection("students")
    
    const {id} = req.params
    const {s_name,s_age,s_mail}= req.body
    const updatedData = {}

    if(s_name != "" && s_name != null && s_name != undefined){
        updatedData['s_name']=s_name
    }
    
    if(s_age != "" && s_age != null && s_age != undefined){
        updatedData['s_age']=s_age
    }

    if(s_mail != "" && s_mail != null && s_mail != undefined){
        updatedData['s_mail']=s_mail
    }
    
    const upadteRes = await studentCollection.updateOne({_id:new ObjectId(id)},{$set:updatedData})

    const resObj = {
        "status":1,
        "msg":"Data Updated !",
        upadteRes
    }
    res.send(resObj)

})

app.listen(3000,(req,res)=>{
    console.log("server is running ...")
})
import express from "express"
import mysql from 'mysql';
import cors from 'cors';

const app = express()



const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"dasha1805",
    database:"newtest"

})

app.use(express.json())

app.use(cors())

app.get("/", (req,res)=>{
    res.json("this is backend")
})

app.get("/pets", (req,res)=>{
    const q = "SELECT * FROM pets"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/pets", (req, res)=>{
    const q = " INSERT INTO pets (`title`, `desc`, `phone`, `cover`) VALUES(?)";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.phone,
        req.body.cover,
    ];

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Pet has been created successfuly.")
    })
})

app.delete("/pets/:id", (req,res)=>{
    const petId = req.params.id;
    const q = "DELETE FROM pets WHERE id=?"

    db.query(q,[petId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Pet has been deleted successfuly.")
    })
})



app.put("/pets/:id", (req,res)=>{
    const petId = req.params.id;
    const q = "UPDATE pets SET `title` = ?, `desc` = ?, `phone` = ?, `cover` = ? WHERE id = ?"


    const values = [
        req.body.title,
        req.body.desc,
        req.body.phone,
        req.body.cover,
    ];


    db.query(q,[...values,petId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Pet has been updated successfuly.")
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})
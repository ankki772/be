const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const { db, UserCollection } = require("./db_connect/db_connect")
var cors = require('cors')

app.use(cors())
app.use(express.json())
app.post('/', async(req, res) => {
  try { const userDetail = UserCollection(req.body)
    console.log(userDetail);
    const result = await UserCollection.findOne({ email: userDetail.email })
    if(result){
        res.send({msg:"user exists"})
    }
    else
   {
        userDetail.save((err, userDetail) => {
        if (err) {
            res.status(404).send({ err :err.message})
        }
        else {
            res.status(200).send({ data: userDetail })
        }
    });}
}catch(err){
    res.status(500).send(err);
}
})

app.post('/login', async (req, res) => {
    try {
        const {emailphone,password} = req.body
        const result = await UserCollection.findOne({$and:[{$or:[{ email:emailphone },{ phone:emailphone }]},password]})       
        if (result) {
            const token = jwt.sign({ result }, 'ssshhh')
            res.status(200).send({ token })
        }
        else {
            res.status(500).send({ msg: "user not found" })
        }
    }
    catch (err) {
        res.status(500).send({ err })
    }
})

module.exports = app
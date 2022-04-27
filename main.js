const express =require('express');
const app = express();
const {db,UserCollection} =require("./db_connect/db_connect")

var cors = require('cors')
const port = process.env.PORT || 8080
app.use(cors())
app.use(express.json())


app.post('/',(req,res)=>{
    const userDetail = UserCollection(req.body)
    userDetail.save((err,userDetail)=>{
        if (err){
           res.status(500).send({err})
        }
        else{
            res.status(200).send({data:userDetail})
        }
    });  
})



app.listen(port,()=>{
   console.log(`listening  to port ${port}`);
})


const jwt = require('jsonwebtoken')
const sendMail = require('../NodeMailer/sms');
const {UserCollection} = require('../db_connect/db_connect')


exports.addUser= async (req, res) => {
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
              res.send({ err :err.message})
          }
          else {
              res.status(200).send({ data: userDetail })
          }
      });}
  }catch(err){
      res.status(500).send(err);
  }
const emailResult = await sendMail();
  console.log("00000",emailResult);


  }


  
  exports.loginUser=async (req, res) => {
      console.log(req.body);
    try {
        const {emailphone,password} = req.body
        const result = await UserCollection.findOne({$and:[{$or:[{ email:emailphone },{ phone:emailphone }]},{password}]})  
         console.log(result);
        if (result) {
            console.log("======>",result);   
            const token = jwt.sign({ result }, 'ssshhh',{expiresIn:"2h"})
            console.log(token);
            res.status(200).send({ token })
        }
        else {
            res.status(500).send({ msg: "user not found" })
        }
    }
    catch (err) {
        res.status(500).send({ err })
    }
}

exports.getUsers= async (req,res)=>{
    try{
        const data = await  UserCollection.find({});
        res.status(200).send({data})
    }
    catch(e){
        res.status(404).send({msg:'error'})
    }
}

exports.updateUser = async (req,res)=>{
      try{
          console.log(".............>>>.",req.body);
          const {_id,name,phone,email} = req.body 
          const result = await  UserCollection.findOneAndUpdate({_id},{$set:{name,phone,email}},{new: true})
          console.log(",,,,,",result);
          res.status(200).send({result})
          
      }
      catch(e){
          console.log(e);
      }

}
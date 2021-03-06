const jwt = require('jsonwebtoken')
const sendMail = require('../NodeMailer/mail');
const otpGenerator = require('../otpGenerator/otpGenerator')
const sendSMS = require('../twiliosms/sms');
const { hashPassword, matchPassword } = require('../bcrypt/bcrypt');
const { UserCollection } = require('../db_connect/db_connect');

exports.addUser = async (req, res) => {
    const passHash = await hashPassword(req.body.password);
    req.body.password = passHash;
    const otp = otpGenerator();
    try {

        const userDetail = UserCollection(req.body)
        console.log(userDetail);
        const result = await UserCollection.findOne({ email: userDetail.email })
        if (result) {
            res.send({ msg: "user exists" })
        }
        else {
            await userDetail.save((err, userDetail) => {
                if (err) {
                    console.log(err.message);
                    res.status(200).send({ msg: err.message })
                }
                else {
                    res.status(200).send({ data: userDetail })
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }

    const emailResult = await sendMail();
    console.log("00000", emailResult);

    const sms = await sendSMS(otp);
    console.log(sms);

}

exports.loginUser = async (req, res) => {
    try {
        const { emailphone, password } = req.body
        const result = await UserCollection.findOne({ $or: [{ email: emailphone }, { phone: emailphone }] })
        const comparePassword = await matchPassword(password, result.password);
        if (result && comparePassword) {
            const token = jwt.sign({ result }, 'ankit', { expiresIn: "2h" })
            console.log(token);
            return res.status(200).send({ token })
        }
        else
            return res.status(200).send({ msg: "user not found no password matched" })
    }
    catch (err) {
        return res.status(500).send(err)
    }
}

exports.getUsers = async (req, res) => {
    try {
        const data = await UserCollection.find({});
        res.status(200).send({ data })
    }
    catch (e) {
        res.status(404).send({ msg: 'error' })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { name, phone, email } = req.body
        const result = await UserCollection.findOneAndUpdate({ email }, { $set: { name, phone, email } }, { new: true })
        result ? res.status(200).send({ result }) : res.status(404).send({ msg: "user not found" })

    }
    catch (e) {
        console.log(e);
    }

}

exports.addtoCart = async (req, res) => {
    try {
        const { id , title  ,description,image,email,category } = req.body;
        console.log(req.body);
        const result = await UserCollection.updateOne({email}, { $push: { cartItems: {title,description,image,category,id } } })
        result ? res.status(200).send({ msg: "item added succesfully" }) : res.status(404).send({msg:"email not found"})
    }
    catch (err) {
        res.status(500).send(err)
    }
}

exports.showUsersCartItmes = async ()=>{
    try {
        const {email} = req.body
        const data = await Usermodel.Usercollec.findOne({email});
        console.log(">>>>>>>>>>>",data);
        data  ? res.status(200).send({data:data.cartItems}) :  res.status(404).send({msg:"email not found"});
    } catch (error) {
        res.status(500).send({error})
    }
}



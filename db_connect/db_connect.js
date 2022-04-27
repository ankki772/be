const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const {Schema,model} =  mongoose
var dburl = "mongodb+srv://akki772:1234@cluster0.mudrl.mongodb.net/userDetails?retryWrites=true&w=majority";


const db = () => {
    mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('connected to mongo database'))
        .catch((err) => { console.log(err); })
}


const UserSchema = new Schema({
    name:String,
    phone:Number,
    email:String,
    password:String
})

const UserCollection = model("UserCollection",UserSchema)

module.exports={
    db:db(),
    UserCollection
}
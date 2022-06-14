const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const { Schema, model } = mongoose
var dburl = "mongodb+srv://akki772:1234@cluster0.mudrl.mongodb.net/userDetails?retryWrites=true&w=majority";


const db = () => {
    mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('connected to mongo database'))
        .catch((err) => { console.log(err); })
}


const UserSchema = new Schema({
    name: String,
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{3}\d{3}\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    
},
    email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
        validator: function (v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
    },
    required: [true, "Email required"]
},
    password: String,
    address:{type:Array,default:[]},
    cartIems:{type:Array,default:[]}

})

const UserCollection = model("UserCollection", UserSchema)

module.exports = {
    db: db(),
    UserCollection
}
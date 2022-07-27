const bcrypt = require('bcryptjs')

exports.hashPassword = async (password)=>{
            return await bcrypt.hash(password,10);               
}

exports.matchPassword = async (loginPassword,hashPassword)=>{
    return await bcrypt.compare(loginPassword,hashPassword);             
}
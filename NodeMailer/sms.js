var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
 
// api key https://sendgrid.com/docs/Classroom/Send/api_keys.html
var options = {
    auth: {
        api_key:'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'
    }
}   
const mailer = nodemailer.createTransport(sgTransport(options));
const mail =async ()=>{
    console.log('kkkkkkkkkkkkkk');
    var email = {
        to: 'ankityadaav773@gmail.com',
        from: 'ankityadaav772@gmail.com',
        subject: 'Hi there',
        text: 'Awesome sauce',
        html: `<b>Awesome sauce</b>`
    };

  return   new Promise((resolve, reject)=>{

    mailer.sendMail(email, function(err, res) {
            if (err) { 
                console.log(err)
                reject(err) 
            }
          else   resolve(res);
        });


    })
}





module.exports = mail
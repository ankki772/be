var nodemailer = require('nodemailer');
const config = require('./config')
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const OAuth2_client =  new OAuth2(config.clientId,config.clientSecret,config.redirectURI);
OAuth2_client.setCredentials({refresh_token:config.refreshToken})

const accessToken = OAuth2_client.getAccessToken();


// var sgTransport = require('nodemailer-sendgrid-transport');
 
// api key https://sendgrid.com/docs/Classroom/Send/api_keys.html
// var options = {
//     auth: {
//         api_key:'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'
//     }
// } 

var options={
    service :'gmail',
    auth : {
        type : 'OAuth2',
        user :config.emailId,
        clientId : config.clientId,
        clientSecret : config.clientSecret,
        refreshToken : config.refreshToken,
       accessToken : accessToken

    }
}
const mailer = nodemailer.createTransport(options);
const mail =async ()=>{
    var email = {
        to: 'ankityadaav773@gmail.com',
        from: config.emailId,
        subject: 'Hi there',
        text: 'Awesome sauce',
        html: ``
    };

  return   new Promise((resolve, reject)=>{

    mailer.sendMail(email, function(err, res) {
            if (err) { 
                reject(err) 
            }
          else  
           resolve(res);
        });
    })
}

module.exports = mail;
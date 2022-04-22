const express =require('express');
const app = express();
var cors = require('cors')
const port =process.env.PORT || 8080
app.use(cors())
app.get('/',(req,res)=>{
    res.json({data:'welcome to my homePage'})
    res.send()
})

app.get('/about',(req,res)=>{
    res.send('<h1>welcome to about Page</h1>')
})

app.get('/contact',(req,res)=>{
    res.send('<h1>welcome to contact  Page</h1>')
})

app.get('/temp',(req,res)=>{
    res.send('<h1>welcome to weather temperature  Page</h1>')
})

app.listen(port,()=>{
   console.log(`listening  to port ${port}`);
})


const express =require('express');
const app = express();
const port = 8080

app.get('/',(req,res)=>{
    res.write('<h1>welcome to my homePage</h1>')
    res.write('<h1>welcome to my homePage</h1>')
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


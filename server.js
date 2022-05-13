const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
const {db} = require("./db_connect/db_connect")
const cors = require('cors')
const userRoutes = require('./Routes/user');



    (()=>{
        // configur_db();
        configur_cors();
        configur_parser();
        configur_routes();
        error404();
    
        globalErrorHandler();
    })()

    function configur_parser(){
        app.use(express.json());
    }
    
    // function configur_db(){
    //     db_connect();
    // }
    
    function configur_cors(){
        app.use(cors())
    }
    
    function configur_routes(){
        app.use('/', userRoutes)
    }
    
    function error404(){
       app.use((req, res)=>{
           res.status(404).send({
               status : 404,
               msg: 'NOT FOUND'
           })
       })
    }


    function globalErrorHandler(){
        app.use((err, req, res)=>{

        })
    }

module.exports = app
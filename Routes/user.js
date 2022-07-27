const router = require('express').Router();
const userController = require('../controller/user');
const auth = require('../middleware/auth');

(()=>{
    getRequest()
    postRequest()
    updateRequest()
})();


function getRequest(){
    router.get('/getUsers',userController.getUsers)
}


function postRequest(){
    router.post('/add',userController.addUser)
    router.post('/login',userController.loginUser)
    router.post('/addtoCart',auth,userController.addtoCart)
}


function updateRequest(){
    router.patch('/updateUser', auth , userController.updateUser)
}
module.exports = router





  
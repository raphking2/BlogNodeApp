const express = require('express');
const router = express.Router();
const {signup,login,logout,singleuser} = require('../controllers/user')
const {blog} = require('../controllers/blog')

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout',logout);
router.get('/user/:id',singleuser);


router.post('/blog',blog);



router.use((req,res)=>{
    req.status(404).send('Page not found');
})


module.exports = router
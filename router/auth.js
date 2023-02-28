const express = require('express'); 
const app = express();
const { findOne } = require('../model/schema');
const router = express.Router(); 
const bcryptjs = require('bcryptjs');
const user = require('../model/schema');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate')
const middleware = (req,res,next) =>{
    console.log('this is middleware use for changing something in the code');
    next();
}
app.use(express.json());
router.get('/' , (req,res)=>{
    res.send('hii this is ashu singh rana and this is my router page'); 
}) ; 
router.get('/contact' , (req,res)=>{
    res.send('hii this is my contact page '); 
}) ; 

router.get('/about' ,authenticate, (req,res)=>{
  
    console.log("hello this si my heelp")
    res.send(req.rootUser); 
}) ; 

router.post('/register',async  (req,res)=>{
    const {name,email,phone,work,password,confirm_password} = req.body;
        if (!name|| !email|| !phone || !work || !password||! confirm_password){
            
            return res.status(422).json({error:"pls fill all the data"});
            // console.log("fill data properly");
        }

        try{
       const userexist= await user.findOne({ email: email });
      if(userexist){
        return res.status(422).json({error:"email already exist"});
    }
    else if(password!=confirm_password){
        return res.status(422).json({error:"password and confirm password are not matching "}); 
     } 
    
  else{

      const newuser = new user({name,email,phone,work,password,confirm_password});
      //before saving it firstly we have to hash the password
     await newuser.save();
    
      res.status(201).json({message:"register succesfull"});
  }
  
        }catch(err) {
            console.log(err);
        }
        //  res.send("it's my router page");  
        //  res.json({message : req.body});
        //  console.log(req.body);
});

router.get('/signin' , (req,res)=>{
    res.send('hii this is my register page '); 

}) ; 
router.get('/signup' , (req,res)=>{
    res.send('hii this is my signup page'); 
}) ; 
router.get('*' , (req,res)=>{
    res.send('404 error'); 
}) ; 

//our login route is here 
router.post('/login',async (req,res)=>{
    
try{

    const { email , password } =req.body; 
    if(!email || !password){
        return res.status(400).json({error:"pls fill all the data"});
        
    } 
    const user_login =await user.findOne({ email});
    // console.log(user) 

    if(user_login){
        const match = await bcryptjs.compare(password, user_login.password);
        const token =await user_login.generateAuthToken();
        console.log(token);
        res.cookie('jwtoken',token,{
            expires: new Date(Date.now()+2592000000),
            httpOnly:true
        })
        if(!match){ 
            res.status(400).json({error: 'user errror'});
        }else{
            res.json({message:'user sign in succesfully'});
        }
    }
    else{
        res.status(400).json({error:'Not matching'})
    }
   
    
}catch(err){
    console.log(err);
}
// res.json(req.body);
// console.log(req.body);
});


//here is my about page



module.exports = router;
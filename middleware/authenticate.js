
const jwt = require('jsonwebtoken');
const { castObject } = require('../model/schema');
const user = require('../model/schema');

const  authenticate =async(req, res,next)=>{
try{

    const token = req.cookies.jwtoken; 
        const verifyToken = jwt.verify(token , process.env.secret_key);
        const rootUser = await user.findOne({ _id:verifyToken._id  ,"tokens.token":token});


        if(!rootUser){ throw new Error('user not found') }

        req.token = token ; 

        //in root user we got all the data  
        req.rootUser= rootUser; 
        req.userID = rootUser._id; 
        next(); 
}catch(err){
    res.status(401).send("unautorized web token");
    console.log(err); 
}

router.get('/getdata',authenticate,(req,res)=>{
    res.send(req.rootUser);
})
}
module.exports = authenticate; 
const mongoose  = require('mongoose'); 
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type:String, 
        required:true,

    },
    email: {
        type:String, 
        required:true,

    },
    phone: {
        type:Number, 
        required:true,

    },
    work:{
        type:String, 
        required:true,

    },
    password:{
        type:String, 
        required:true, 
    },
    confirm_password:{
        type:String, 
        required:true,

    },
    tokens:[
    {
        token:{
            type:String, 
        required:true, 
        }

    }
]
})
//hashing our password  because of no one can hack it 
userSchema.pre('save',async function(next){
    console.log('hii pre is working now');
    if(this.isModified('password')){
        this.password =await bcryptjs.hash(this.password,12);
        this.confirm_password = await bcryptjs.hash(this.confirm_password,12);
    }
    next();
});
//here we are generating token 
userSchema.methods.generateAuthToken = async function(){
    try{
let token = jwt.sign({_id:this._id},process.env.secret_key)

this.tokens =this.tokens.concat({token:token});
 await this.save();
 return token; 
    }catch(err){
console.log(err);
    }
}

//collection creation 
const user = mongoose.model('registration' ,userSchema); 

module.exports = user;  
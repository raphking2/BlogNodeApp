const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: [true,'Please enter your name'],
        maxlenght: 32

    },
    email:{
        type: String,
        trim: true,
        required: [true,'Please enter your email'],
        unique: true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please enter valid email ID"]

    },
    password:{
        type: String,
        trim: true,
        required: [true,'Please enter your Password'],
        minlenght: [6,'Password must be at list Six(6) Characters'],
        match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,"Password must contain at least 1 Uppercase, 1 lowercase , 1 number and special Character"]

    },
    role:{
        type: Number,
        default: 0,
    },

},{timestamps:true})

//Encrypting password before Saving
userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bycrypt.hash(this.password, 10);
})
//Verify Password
userSchema.methods.comparePassword = async function(yourPassword){
    return await bycrypt.compare(yourPassword,this.password);
}
//Token Generation
userSchema.methods.jwtGenerateToken = function(){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET,{expiresIn:3600})
}
module.exports = mongoose.model("User",userSchema)
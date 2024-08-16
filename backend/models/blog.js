const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: [true,'Please enter title of blog'],
        maxlenght: 52

    },
    categories:{
        type: String,
        trim: true,
        required: [true,'Please select blog categories']

    },
    content:{
        type: String,
        trim: true,
        required: [true,'Please enter content of the blog']
       

    },
    image:{
        type: String,
        trim: true,
        required: [true,'Please enter the image thumbnail']
    },

},{timestamps:true})


module.exports = mongoose.model("Blog",blogSchema)
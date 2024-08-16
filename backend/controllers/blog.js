const { findOne, findById } = require('../models/user');
const Blog = require('../models/blog');
const ErrorResponse = require("../utils/errorResponse");

exports.blog = async (req, res, next) => {
   const { title, categories, content, image } = req.body;
   
   // Check if required fields are missing
   if (!title || !categories || !content || !image) {
      return res.status(400).json({
         success: false,
         message: "Title, categories, content, or image of the blog is missing"
      });
   }
     
   try {
      const blog = await Blog.create(req.body);
      res.status(201).json({
         success: true,
         blog
      });
   } catch (error) {
      console.log(error);
      res.status(400).json({
         success: false,
         message: error.message
      });
   }
};

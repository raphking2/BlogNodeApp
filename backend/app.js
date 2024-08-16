const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyparser = require ('body-parser');
const morgan = require ('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error')
const cors = require('cors');

//Import Routes

const userRouter = require('./route/user')


//Connect to Database

mongoose.connect(process.env.DATABASE).then(()=>console.log("connected"))
.catch((err)=>console.log(err));

// Allow requests from the specified origin
app.use(cors({
    origin: 'http://localhost:3000',
  }));
  

//MiddleWare
app.use(morgan('dev'))
app.use(bodyparser.json())
app.use(cookieParser());



// Route MiddleWare

app.use('/api',userRouter)

//Error Middleware
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`server listening to....${port}`);
})

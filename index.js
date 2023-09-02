const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

// middelware 
const  app  = (express())
app.use(cors()) 
dotenv.config()
app.use(express.json())

//  router 
const categroy = require('./Router/CategoryRouter')
const rooms = require('./Router/RoomsRouter')

// PORT 
const port = process.env.PORT || 9000

// connect mongoose 
mongoose.connect(process.env.DB_CONNECTION)
    .then(()=> console.log('connection successfull'))
    .catch(err => console.log(err))

// connnect router 
app.use('/category',categroy)
app.use('/rooms',rooms)

app.get('/',async(req,res)=>{
    res.send('hello world')
})

app.listen(port,()=>{
    console.log('app lisining port number 9000')
})
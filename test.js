const mongoose = require('mongoose')

const BlogPost = require('./models/BlogPost')


mongoose.connect('mongodb+srv://edgar:edgar123@cluster0-zeaxr.mongodb.net/BlogPost?retryWrites=true&w=majority',{useNewUrlParser:true});



BlogPost.create({ 
title: 'yes',
 body: 'segundo reporte'  
 }, (error, blogpost) =>{ 
     console.log(error, blogpost) 
})

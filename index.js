


const express = require('express')

const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload') 

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session');
const logoutController = require('./controllers/logout')

const validateMiddleware = require("./middleware/validateMiddleware");
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const flash = require('connect-flash');

app.use(fileUpload()) 



mongoose.set('useCreateIndex', true) //no esta en el libro
mongoose.connect('mongodb+srv://edgar:edgar123@cluster0-zeaxr.mongodb.net/BlogPost?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')

app.use(express.static('public'))



let port = process.env.PORT; 
if (port == null || port == "") 
{ port = 4000; } 
app.listen(port, ()=>{ console.log('App listening...')    })





app.use('/posts/store',validateMiddleware) 

app.use(expressSession({ 
    resave:true,                //no esta en el libro
    saveUninitialized:true,       //no esta en el libro
    secret: 'keyboard cat' }))

    global.loggedIn = null; 
    app.use("*", (req, res, next) => { 
    loggedIn = req.session.userId; 
    next()  
 });
app.use(flash());

app.get('/posts/new',authMiddleware, newPostController)
app.get('/',homeController)
app.get('/post/:id',getPostController)        
app.post('/posts/store', authMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController) 
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'));

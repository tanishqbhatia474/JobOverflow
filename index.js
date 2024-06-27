const express = require('express')
const app = express()
const multer=require('multer')


const port = 3000
const path=require('path')
const mongoose=require("mongoose")
const session = require('express-session')
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
app.use(express.json());
app.use(express.urlencoded({extended:false}))
const User = require("./models/User")
const ejsMate=require('ejs-mate')

app.use(express.static(path.join(__dirname +'/public')));

mongoose.connect("mongodb://127.0.0.1:27017/ecomm-careerbootcamp")
.then(()=> console.log("db connected sucessfully".blue))
.catch((err)=> console.log(err));
 


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const fileStorageEngine=multer.diskStorage({
  destination:(req,res,cb)=>{
    cb(null,"./images");
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+"----"+file.originalname)
  },
});

const upload=multer({storage:fileStorageEngine})

const sessionConfig = {

    secret: 'weneedagoodsecret',
    resave: false,
    saveUninitialized: true,
    cookie : {
  
      expire : Date.now() + 7*24*60*60*1000
    }
  }


app.use(session(sessionConfig));
app.use(passport.authenticate('session'));
app.use(flash());


app.use((req,res,next)=>{

  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user
  next();

})




app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
app.engine("ejs", ejsMate);

app.listen(port, () => console.log(`Example app listening at http://localhost:3000`))

const productRoutes = require("./router/router");
const authroutes=require("./router/authroutes");

app.use(productRoutes)
app.use(authroutes)
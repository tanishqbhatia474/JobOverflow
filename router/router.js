const express = require ("express");
const router = express.Router()
const multer=require('multer')


const fileStorageEngine=multer.diskStorage({
    destination:(req,res,cb)=>{
      cb(null,"./images");
    },
    filename:(req,file,cb)=>{
      cb(null,Date.now()+"----"+file.originalname)
    },
  });
  


const upload=multer({storage:fileStorageEngine})
const Job = require("../models/jobs");

  

const {isLoggedIn} = require("../middleware")

router.get("/",(req,res)=>{

   
    res.render("mainpage/mainpage")
})

//afterlogin
router.get("/afterlogin",(req,res)=>{

   
    res.render("mainpage/afterlogin")
})


//form to add a new job

router.get("/new",isLoggedIn, (req,res)=>{

    res.render("job/new")

})





// create a new job

router.post("/jobs",isLoggedIn, async(req,res)=>{
     
    const{jobrole,company,img,startdate,ctc,experience,location,joblink}=req.body;
    
    await Job.create({jobrole,company,img,startdate,ctc,experience,location,joblink});
    

     req.flash("success", "Job added successfully!")

     res.redirect("/jobs")
})






router.get("/event",(req,res)=>{
    res.render("event/events")
})
router.get("/jobs",isLoggedIn,async(req,res)=>{
    const jobs=await Job.find({});
    
    res.render("jobs/jobs",{jobs});
})
router.get("/courses",isLoggedIn,(req,res)=>{
    res.render("courses/courses")
})

router.get("/resume",(req,res)=>{
    res.render("resume checker/resume")
})
router.post("/single",upload.single("image"),(req,res)=>{
    console.log(req.file);
    res.render("resume/thankyou")
});

router.post("/multiple",upload.array("images",3),(req,res)=>{
    console.log(req.files);
    res.send("multiple file upload successfully")
})



module.exports=router;
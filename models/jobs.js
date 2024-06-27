const mongoose = require("mongoose");


const jobSchema = new mongoose.Schema({

    jobrole : String,
    company :  String,
    img : String,
    location : String,
    startdate :{
        type:String,
        required:true,
    }, 
    ctc : String,
    experience : {
        type:String,
        required:true,
    },
    joblink : String
})

const Job = mongoose.model("Job", jobSchema);
module.exports = Job
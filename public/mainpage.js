res.locals.success = req.flash("success");
const loginbtn= document.getElementsByClassName("login_signup");


if(success == 1){
    loginbtn.classList.add('hidden');
   
}
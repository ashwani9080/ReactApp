const express=require('express');
const router=express.Router();
var path    = require("path");
var qs = require('query-string');
var multer  = require('multer');
 var storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, '/home/com117/Desktop/Ashwani/reactapp/newapp/backend/public/posts');
     },
     filename: function (req, file, cb) {
       cb(null,file.originalname);
     }
   });   

var upload = multer({ storage:storage });
const userapi =  require('./api');
var cors = require('cors');

router.get('/logout',(req,res)=>{

    req.logOut();
    res.redirect('/');

});




router.post('/postevent', async (req,res)=>{

  let result=await userapi.managePost(req.body);
    console.log(result);
    res.send(result)
    
  
})


const authCheck=(req,res,next)=>{
  if(!req.user){
    res.sendFile(__dirname+"/public/login.html");
  }else{
    next();
  }
}


router.post('/posts',async (req,res)=>{

  try{
   
  let data =  await userapi.allPost(req.body.email);
  
   res.send(data)
  }catch(err){  

    res.send(err);
  }
    


});





router.get('/verify',async (req,res)=>{
 
    console.log(req.query.email);

    try{

      let result=await userapi.updateVerified(req.query.email);
      if(result){
        res.send('verified updated');
      }else{
        res.send('error');
      }
    }catch(err){  

      res.send(err);
    }



});


router.post('/addcomment',async (req,res)=>{

  let result= await userapi.addComment(req.body);
 if(result.ok===1){
  let resultAfterAddComment=await userapi.getSinglePostData(req.body);
      console.log('yup!!!!!!',resultAfterAddComment);
      res.send(resultAfterAddComment);   

 }else{
   res.send(false)
 }


});

router.post("/login",async (req,res,next)=>{
  try{ 
  let resultfromlogin = await userapi.Login(req.body);
      if(resultfromlogin){
            res.send(resultfromlogin);
          }else{
              res.send(false);
        }
    }catch(err){
      res.send(err);
      console.log("error message: "+err);
    }   

  });

  router.post("/resetPassword",async (req,res)=>{
    try{ 
      console.log(req.body)  
    let resultfromlogin = await userapi.ResetPassword(req.body);
        if(resultfromlogin){
              res.send(true);
            }else{
            console.log("called false");
            res.send(false);
          }
      }catch(err){
        res.send(err);
        console.log("error message: "+err);
      }   
  
    });
  

  
  
  


router.get('/',(req,res)=>{

  res.sendFile(path.join(__dirname + '/public/website.html'));

});
router.get('/loginpage',(req,res)=>{

  res.sendFile(path.join(__dirname + '/public/login.html'));

});

router.post('/userid', async (req,res)=>{
  try{
  let result=await userapi.getUserData(req.body)
      res.send(result);
  
  }catch{
    res.send(false)
  }

})


router.post("/addpost", upload.single('pic'), async (req,res)=>{
  
  try{
    const data = JSON.parse(JSON.stringify(req.body))
    data.date=Date.now();
    data.pic =req.file.originalname;
    console.log('add post pic databody',data)
  
  let result= await userapi.uploadDate(data);
   console.log('result is '+result);
    res.send(result);
     
  }catch(err){

    res.send(err);
  
    }
  
});


router.post('/addcategorytolist',async (req,res)=>{

  try{
    console.log('categories',req.body)
   await userapi.CreateCategories(req.body)
   .then((result)=>{
    
     if(result.nModified!==0){
       userapi.getCategories().
       then((dataCatgry)=>{
         res.send(dataCatgry)
       })
     }

   });
   
  }catch{
    res.send(false)
  }

})



router.post('/getcategory',async (req,res)=>{
try{
  await userapi.getCategories().
  then((data)=>{
    res.send(data);
  })
}catch{
  res.send(false);
}
   


})


router.post("/adduser", async (req,res)=>{
  
  try{
  let result= await userapi.Validate(req.body);
    //console.log('result is '+result);
    res.send(result);
     
  }catch(err){

    res.send(err);
  
    }
  
});


 router.get('/googleapi',  userapi.passport.authenticate('google',{ 
    scope:['profile']

  }));

 
 
 
  router.post('/checkExist',async (req,res)=>{
    try{
        console.log('check router for exits',req.body)
      let result= await userapi.checkEmailExists(req.body.email);
        console.log('result is '+result);
          res.send(result);
         
      }catch(err){
    
        res.send(err);
      
        }
      



  });

  

  router.get('/auth/google/redirect/',userapi.passport.authenticate('google'),(req,res)=>{

    res.redirect( `/ludo?origin=${req.originalUrl}`);

  });    


  router.get('/ludo',(req,res)=>{
    res.sendFile(__dirname+"/Ludo-master/ludo.html"); 
  });

  

  // router.get('/sendmail', async (req, res) => {
  //   try {
  //     const sent = await userapi.sendMail();
  //     if (sent) {
  //       res.send({ message: 'email sent successfully' })
  //     }
  //   } catch (error) {
  //     res.send(error);
      
  //   }
  // });


  // router.get('/nodemailer',async (req,res)=>{

  //   try{  
  //   const sent =await userapi.nodeMailerSend();
  //   console.log('called'+sent);
  //   if(sent)
  //     res.send({ message: 'email sent successfully' });
  //   }catch(err){
  //     throw new Error(error.message)
  //   }
  // })

module.exports=router;




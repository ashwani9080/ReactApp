var userdb = require("./Schema/userscheam");
var userCategory=require('./Schema/categoriesSchema');
const MailGen = require('mailgen')
const keys=require('./keys');
const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');
const nodemailer=require('nodemailer');
const mongoose=require('mongoose');
/*************sendgrid configuration is here******************/
const sendmail=require('./template');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const usedbPost=require('./Schema/uploadPost');
var multer  = require('multer');
//  var storage = multer.diskStorage({
//      destination: function (req, file, cb) {
//        cb(null, 'upload/public/posts');
//      },
//      filename: function (req, file, cb) {
//        cb(null,file.originalname);
//      }
//    });   
// var upload = multer({ storage:storage });

const msg = {
    to: '',
    from: 'ashwani9080singh@gmail.com',
    subject: 'Test verification email',
    html: sendmail.emailTemplate,

  }


  const mailOptions = {
    to: '',
    from: 'ashwani9080singh@gmail.com',
    subject: 'Test verification email',
    html: sendmail.emailTemplate,
    text: 'Hey this is ashwani sent you mail to check  nodemailer ', 
};
  

/*************node mailer configuration is here******************/

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1606c163243f16",
      pass: "7a737408cf4807"
    }
  });  

/*---login function for the user  called in router-------*/  
 let Login=(data)=>{

    return new Promise((resolve,reject)=>{
    
        userdb.find({'email':''+data.email,'password':data.password},'',(err,data)=>{   
            console.log('login in api',data);
            if(err) {
                console.log(err);
                reject(false);
            }
            else {
                if(data.length===1){
                    console.log("Successfully logged in!!!");
                    resolve(data);
                    }
                else{ 
                   
                    console.log("INVALID PASSWORD ",data);}
                    resolve(false);
              } 
            });
    })
    
    
    
    };





let addComment=(data)=>{
    console.log('api add comment',data);
    return new Promise((resolve,reject)=>{
            usedbPost.update({_id:data.postId},{$push:{commentArray:{personId:data.personId,comment:data.comment}}},(err,data)=>{
                if(err)reject(false)
                console.log('data in api of comment',data);
                resolve(data)

            })

    })
}


let getSinglePostData=(data)=>{

return new Promise((resolve,reject)=>{
    usedbPost.find({_id:data.postId},'',(err,newData)=>{
        if(err)reject(false)
           console.log(newData)
            resolve(newData)

    })   

})
}



let  managePost=(data)=>{  
    console.log('manage post data',data) 
        return new Promise((resolve,reject)=>{
            usedbPost.find({_id:data.imageId,likes:data.accountId},(err,dataParent)=>{  
                  if(dataParent.length===0){       
                    usedbPost.update({ _id:data.imageId },{$push:{[data.eventName]:data.accountId}},(err,dataChild)=>{
                        if(err)reject(err)
                            usedbPost.find({},'',(err,newData)=>{
                                if(err)reject(false)
                                   console.log(newData)
                                    resolve(newData)

                            })
                            
                    })
                  }else{
                    usedbPost.update({ _id:data.imageId },{$pull:{[data.eventName]:data.accountId}},(err,dataChild)=>{
                        if(err)reject(err)
                        usedbPost.find({},'',(err,newData)=>{
                            if(err)reject(false)
                             console.log(newData)
                                resolve(newData)

                        })
        
                    })
                  }
                


               })
            })
}




let ResetPassword=(data)=>{
    
    return new Promise((resolve,reject)=>{
        var myquery = { _id: data.email };
        var newvalues = { $set: {password:data.password } };
        userdb.updateOne(myquery, newvalues, function(err, res) {
             if (err) throw reject(false);
             else resolve(true);
                 console.log("password changed",res);
        
  });
    }).catch((err)=>console.log(err));



}


allPost=(data)=>{

 return   new Promise((resolve,reject)=>{
        usedbPost.find({} , ''   ,(err,data)=>{
            if(err){
                reject(err)
            }else{
                console.log(data)
                resolve(data);
            }   

        });
    });
}



/*---Validate function for the user  called in router-------*/  
let   Validate=(data)=>{
  
      return  new Promise((resolve,reject)=>{
            userdb.find({'email':''+data.email},'email',(err,email)=>{
            if(err) {
                console.log(err);
                reject(err);
            }
            else {
                if(email.length===0){
                    userdb.create(data,(err,result)=>{
                        if(err)
                            reject(err);
                        else    
                        console.log("result",result);

                            resolve('User created');    
                    })
                }
                else{
                    console.log("result in last if");
                    resolve('User already exists');
                    }      
                }
            });

        })
     
       };
       




       const uploadDate=(data)=>{
   
   return new Promise((resolve,reject)=>{
        console.log('pic data',data)
            usedbPost.create(data,function(err,result){
                if(err){
                    reject(err)
                }else{
                  resolve(result);  
                }
            }) 
       })
    
    
    
    }


    const getUserData=(data)=>{
       return new Promise((resolve,reject)=>{
           
           userdb.find({_id:data._id},(err,data)=>{
            if(err)reject(false)
            resolve(data);
            
           })
       })

    }

    let CreateCategories=(data)=>{
        return new Promise((resolve,reject)=>{
            console.log(data)
            userCategory.updateMany({},{$addToSet:{categoriesArray:data.category}}, { upsert : true },(err,data)=>{
                if(err)reject(false)
                resolve(data)
            })

        })
    }

    let getCategories=()=>{
        return new Promise((resolve,reject)=>{
           
            userCategory.find({},'',(err,data)=>{
                if(err)reject(false)
                resolve(data)
            })

        })

    }

/*---Create database function for the user  called in router-------*/  
  
   let  CreateUser=(data)=>{
          data.verified=false;
          userdb.create(data,function(err,result){
               if(err){
                //  res.send(err);
                  return false;
               }else{
                 console.log("user created : "+result);
                // res.sendFile(__dirname+'/public/login.html');
                 return true;
               }
              });
       }



       passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser((id,done)=>{
         userdb.findById(id).then((user)=>{
             done(null,user);


         })

    })


    passport.use(
        new GoogleStrategy({
             callbackURL:'/auth/google/redirect/',
             clientID: keys.google.client,
             clientSecret:keys.google.clientSecret

        },
        (accessToken,refreshToken,profile,done)=>{
             console.log(profile);


                 userdb.findOne({googleId:profile.id}).then((currentUser)=>{

                     if(currentUser ){
                         done(null,currentUser);
                         console.log('user already exist');
                     }else{

                     new userdb({
                         googleId:profile.id,    
                         name:profile.name.giveName,
                         lastName:profile.name.familyName,
                         pic:profile.photos[0].value,
                     }).save().then((newuserdb)=>{
                         console.log('database created :'+newuserdb);
                         done(null,newuserdb);
                     }) ;  
    
                 }
    
                 });

        })
    );

//send mail through sendgrid
    const sendMail = async (msg) => {

        try {
          sgMail.setApiKey(keys.sendmail.apiKeys);
          return sgMail.send(msg)
        } catch (error) {
          throw new Error(error.message)
        }
    }

//send maill through nodemailer


const nodeMailerSend=()=> {
return new Promise((resolve,reject)=>{

    transport.sendMail(mailOptions,(err,info)=>{
        if (error) {
            reject(error);
                 }
            resolve(true);
    });

        })

}

const updateVerified=(data)=>{

    return new Promise((resolve,reject)=>{
        var myquery = { email: data };
        var newvalues = { $set: {verified:true } };
        userdb.updateOne(myquery, newvalues, function(err, res) {
             if (err) throw reject(false);
             else resolve(true);
                 console.log("1 document updated"+res);
        
  });
    }).catch((err)=>console.log(err));


}


  

let checkEmailExists=(data)=>{

  //  console.log('data in api',data);
  return  new Promise((resolve,reject)=>{
        userdb.find({'email':data},'',(err,data)=>{
            if(err){
                reject(err)}
            else{
                if(data.length===1){
                        console.log('data existence',data)
                        resolve(data);}
                else{
                    resolve(false);}
                
            }


        })
    })


}

    
    


module.exports={
    getCategories
    ,getUserData,
    getSinglePostData,addComment,
    managePost,allPost,uploadDate,ResetPassword,
    Validate,CreateUser,Login,passport,GoogleStrategy,
    sendMail,nodeMailerSend,updateVerified,
    checkEmailExists,
    CreateCategories};
    

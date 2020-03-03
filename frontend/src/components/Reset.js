import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import queryString from 'querystring';
import {Redirect} from 'react-router-dom'
class Reset extends React.Component{
  constructor(props){
    super(props)
    this.state={
        email: this.props.match.params.id,
        password:'',
        confirmPassword:'',
        emailValidateMessage:'',
        isAuth:false};

       
        //console.log(this.props.match)
  }


  handleInput=(event)=>{

    let nameDefined=event.target.name;
    this.setState({[nameDefined]:event.target.value});
  
   
  }

  handleSubmit=(event)=>{
        
    console.log('reset',this.state.email)
    
            const user ={email:this.state.email,password:this.state.password}
             axios.post('http://localhost:8086/resetPassword',  user )
                .then((data) => {     
                   if(data.data===true){
                     this.setState({isAuth:true});  

                   }else{    
                       this.setState({conditionalcss:true,logInMessage:"Something went wrong"})
                   }
    
          });
          event.preventDefault(); 
    
      }



    render(){
        return (
            <div>
              <meta charSet="utf-8" />
              <title>Reset Password</title>
              <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
              <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
              <div className="navbar navbar-inverse navbar-fixed-top">
                <div className="navbar-inner">
                  <div className="container">
                    <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
                    <a className="brand" href>PPL</a>
                    <div className="pro_info pull-right">
                      <div className="pro_icn"><img src="images/pic_small.png" /></div>
                      <div className="pro_txt">Me<b className="caret" /></div>
                      <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                        <li><a tabIndex={-1} href="#">My Profile</a></li>
                        <li><a tabIndex={-1} href="#">Message Box</a></li>
                        <li><a tabIndex={-1} href="#">Change Language</a></li>
                        <li className="divider" />
                        <li><a tabIndex={-1} href="#">
                            <input type="text" placeholder="search" />
                          </a></li>
                      </ul>
                    </div>
                    <div className="nav-collapse collapse">
                      <ul className="nav">
                        <li className="active"> <a href>Home</a> </li>
                        <li className> <a href>E-Coupons</a> </li>
                        <li className> <a href>E-Brands</a> </li>
                        <li className> <a href>Resuse Market</a> </li>
                        <li className> <a href>Lost and Found</a> </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
           { this.state.isAuth?<Redirect to={'/'} />:null }
              <div className="container">
                <div className="content">
                  <div className="content_rgt">
                    <div className="register_sec">
                      <h1>Reset Password</h1>
                      <form  onSubmit={this.handleSubmit}>
                      <ul>
                        <li><span>Enter New Password</span><input type="text" name='password'        onChange={this.handleInput}   value={this.state.password} placeholder="Enter your new password" /></li>
                        <li><span>Confirm Password</span><input type="text" style={{display:'none'}}  name='confirmPassword'   onChange={this.handleInput} value={this.state.confirmPassword} placeholder="Enter your password again" /></li>
                        <li><input type="submit" defaultValue="Submit" /></li>
                      </ul>
                      </form>
                    </div>
                  </div>
                  <div className="content_lft">
                    <h1>Welcome from PPL!</h1>
                    <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
                    <img src="images/img_9.png" alt="" /> </div>
                </div>
              </div>
              <div className="clear" />
             
            </div>
          );
    }

}


export default Reset;
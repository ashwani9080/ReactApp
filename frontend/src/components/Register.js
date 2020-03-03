import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './Header';
import {Link,Redirect} from 'react-router-dom'
class Register extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name:'',
      email:'',
      password:'',
      lastName:'',
      phone:'',
      conditionalcss:false,
      signInMessage:'',
     
          }

          this.props.setHeaderState(false);
  }



  handleUserInput=(event)=>{
    let nameDefined=event.target.name;
    this.setState({[nameDefined]:event.target.value,conditionalcss:false,signInMessage:''}); 
    

  }


  handleSubmit=(event)=>{
    event.preventDefault();     
        const user =this.state;
         axios.post('http://localhost:8086/adduser',  user )
            .then((data) => {   
                if(data.data==='User already exists')
                {   this.setState({result:data.data});
                    this.setState({class:'App-error'});
                    this.setState({visible:'Visible'});
                    this.setState({conditionalcss:true});
                    this.setState({signInMessage:data.data});
                    
                }else if(data.data==='User created'){
                  
                  this.setState({signInMessage:data.data});
                }

      });

  }

    





    render(){
        return (
            <div>
              <meta charSet="utf-8" />
              <title>Create An Account</title>
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
            {/* {<Header/>} */}
              <div className="container">
                <div className="content">
                  <div className="content_rgt">
                    <div className="register_sec">
                      <h1>Create An Account</h1>
                      <form onSubmit={this.handleSubmit} autoComplete="off">                 
                      <ul>
                        <li><span>Email</span><input value={this.state.email} name='email' style={this.state.conditionalcss ? {color:'red'} : {color:'black'} }  type='email' placeholder="Enter your email"  onChange={this.handleUserInput} required /></li>
                        <li><span>Name</span><input value={this.state.name} name='name' type="text" placeholder="Enter your name" onChange={this.handleUserInput} required/></li>
                        <li><span>Last Name</span><input value={this.state.lastName} name='lastName' type="text" placeholder="Enter your last anme"  onChange={this.handleUserInput} required/></li>
                        <li><span>Phone Number</span><input pattern="[0-9]{10}" type='text' name='phone' value={this.state.phone}  placeholder="Enter your phone"  onChange={this.handleUserInput} required/></li>
                        <li><span>Password</span><input value={this.state.password} pattern="[a-z0-9].{6,}"   name='password' type="text" placeholder="6 character long and contain number and alphabet "  onChange={this.handleUserInput} required/></li>
                        <li><input type="checkbox"  required/>I agree to Term &amp; Conditions</li>
                        <li><input type="submit" defaultValue="Register"  /></li>
                        {this.state.signInMessage==='User created'?<Redirect to="/login" />:null}
                        <div name='user_create'  style={{color:'red'}}>{this.state.signInMessage}</div>
                      </ul>
                      </form>

                      <div className="addtnal_acnt">I already have an account.<Link to='/login' onClick={this.handleClick}>Login My Account !</Link></div>
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

export default Register;
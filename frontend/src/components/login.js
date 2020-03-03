import React from 'react';
import axios from 'axios';
import { exists } from 'fs';
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            conditionalcss:false,
            logInMessage:'',
            check:false,
            authUser:false,
            id:''
            
        }   

        if(localStorage.getItem('authUser')==='true'){
          const mail=localStorage.getItem('id');
             props.history.push(`/home/${mail}`)
           }  
      
     
        
       
       
    }
    componentDidMount(){
  
     
   
      
      if( localStorage.getItem('remember')==='true' ){  
        const mail= localStorage.getItem('email');
        const pasw= localStorage.getItem('password');

           this.setState({ 'email':mail ,
                           'password': pasw
                          });

            document.getElementById('remember').checked=true;
          

      }
      


    }


   

    handleUserInput=(event)=>{

        let nameDefined=event.target.name;
        this.setState({[nameDefined]:event.target.value,conditionalcss:false,logInMessage:''});
        document.getElementById('remember').checked=false;
       
      }

        handleSubmit=(event)=>{
        
                const user =this.state;
                 axios.post('http://localhost:8086/login',  user )
                    .then((data) => {   
                        
                      console.log('data retrived',data)
                       if(data.data!==false){

                        
                       
                        localStorage.setItem('accountId', data.data[0]._id)
                        localStorage.setItem('username', data.data[0].name)
                        localStorage.setItem('authUser',true);                                                                                                                                                                                                                                                                                                             
                        localStorage.setItem('email', JSON.parse( data.config.data).email);
                        localStorage.setItem('password', JSON.parse( data.config.data).password)
                        localStorage.setItem('id',data.data[0]._id);
                        this.props.isAuthed(true);
                        this.setState({authUser:true,id : data.data[0]._id});
                      
                        
                       }else{    
                           this.setState({conditionalcss:true,logInMessage:'Wrong password'})
                       }
        
              });
              event.preventDefault(); 
        
          }
        

     
          handleCheckClick=(event)=>{
           
            if(event.target.checked){
                localStorage.setItem('remember',true)
            }else{
              localStorage.setItem('remember',false)
            }
          }
   
    render(){
        return (
            <div>
              <meta charSet="utf-8" />
              <title>Login Account</title>
              <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
              <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
              <div className="container">
                <div className="content">
                  <div className="content_rgt">
                    <div className="login_sec">
                      <h1>Log In</h1>
                      
                    <form onSubmit={this.handleSubmit} autoComplete="off" >   
                      <ul>       
                        <li><span>Email-ID</span><input type="email"  style={this.state.conditionalcss ? {color:'red'} : {color:'black'} }  value={this.state.email} name='email' onChange={this.handleUserInput}  placeholder="Enter your email" required /></li>
                        <li><span>Password</span><input type="password" onChange={this.handleUserInput} name='password'value={this.state.password} name='password'  placeholder="Enter your password"  required/></li>
                        <li><input type="checkbox" id='remember' onClick={this.handleCheckClick} />Remember Me</li>
                        <li><input type="submit" defaultValue="Log In"  />
                        <a><Link  to='/forget'>Forgot Password</Link></a></li>
                        <div name='user_create'  style={{color:'red'}}>{this.state.logInMessage}</div>
                        {this.state.authUser?this.props.history.push(`/home/${this.state.id}`):null }
                      </ul>
                    </form>

                      <div className="addtnal_acnt">I do not have any account yet.<Link to='/' onClick={this.handleClick} >Create My Account Now !</Link></div>
                    </div>
                  </div>
                  <div className="content_lft">
                    <h1>Welcome from PPL!</h1>
                    <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
                    <img src="images/img_9.png" alt="" /> 
                  </div>
                </div>
              </div>
              <div className="clear" />

           
            </div>
          );
    }


   }

   export default Login;
import React from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
export default class Forget extends React.Component{

    constructor(props){
      super(props)
      this.state={email:'',
            id:'',
         emailValidateMessage:'',
         isAuth:false};
        
    
    }
  

    handleUserInput=(event)=>{

      let nameDefined=event.target.name;
      this.setState({[nameDefined]:event.target.value,emailValidateMessage:''});
    
     
    }

    handleSubmit=(event)=>{
      
              const user ={email:this.state.email}
            
               axios.post('http://localhost:8086/checkExist',  user )
                  .then((data) => {     
                     if(Object.keys(data)!==null){
                      console.log(data.data[0]._id)
                       this.state.id= data.data[0]._id;
                       this.setState({isAuth:true});  
                      
                     }else{    
                         this.setState({conditionalcss:true,logInMessage:"Email doesn't  exists"})
                     }
      
            });
            event.preventDefault(); 
      
        }
      



    render(){
        return (
          
            <div>
              <meta charSet="utf-8" />
              <title>Forgot Password</title>
              <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
              <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
              <div className="container">
                <div className="content">
                  <div className="content_rgt">
                    <div className="register_sec">
                      <h1>Forgot Password</h1>
                      <div>{this.state.logInMessage}</div>
                      <ul>
                        <form  type="button" onSubmit={this.handleSubmit}>
                          <div>{this.state.emailValidateMessage}</div>
                        <li><span>Enter E-mail ID</span><input type="email" name='email' value={this.state.email} onChange={this.handleUserInput} placeholder="User@gmail.com" /></li>
                        <li><input type="submit" defaultValue="Submit" /></li>
                        {console.log('email check in forget',this.state.email)}
                        {this.state.isAuth? this.props.history.push(`/reset/${this.state.id}`):null }
                        </form>
                      </ul>
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


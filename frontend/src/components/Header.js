import React from 'react'
import {Link} from 'react-router-dom';
 export default class Header extends React.Component{

  handleClick=()=>{

    localStorage.setItem('authUser',false);   
  }
  
   
  render(){
    return(
        <div>
        <div className="header">
        <div className="header_lft">
          <div className="logo"><a ><img src="/images/logo.png" /></a></div>
          <div className="navigatn">
            <ul>
              <li><a  className="active" id="home" >{localStorage.getItem('authUser')==='true'?<Link to={`/home/${localStorage.getItem('id')}`}>Home</Link>:null }</a></li>
              <li><a > E-Coupons </a></li>
              <li><a >E-Brands </a></li>
              <li><a > Resuse Market </a></li>
              <li><a > Lost and Found</a></li>
            </ul>
          </div>
        </div>
        <div className="header_rgt">
          <div className="flag_div"><img src="/images/flag.png" /></div>
          <input type="text" placeholder="Search" className="txt_box" />
          <div className="msg_box"><a ><span className="msg_count">100</span></a></div>
          <div className="info_div">
            <div className="image_div"> <img src="/images/pic.png" /> </div>
            {  localStorage.getItem('authUser')==='true'?<div className="info_div1"    id="timeline" > <Link  to={`/timeline/${localStorage.getItem('id')}`} >Me</Link></div>
            :null}
          </div>
            
                {  localStorage.getItem('authUser')==='true'?<button style={{marginTop:15,marginLeft:20}} 
                  onClick={this.handleClick} ><Link to='/' >Logout</Link></button>
              :null}
       
       </div>
      </div>
      </div>
          
      );

  }




}
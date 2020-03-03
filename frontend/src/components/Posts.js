import React from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'
let newArray;
export default class Posts extends React.Component{


  constructor(props){
    super(props);
    this.state={
      postsData:[],
      category:'',
      postClicked:false,
      id:0,
      likes:0,
     
      
    }
  }

    componentDidMount(){

      this.state.postClicked=false;
      const email={email:'sdfsd@gmial.com'}
      axios.post('http://localhost:8086/posts',email)
         .then((data) => { 
            if(data){
           
               this.setState({postsData:  data.data});               
            }else{    
                this.setState({conditionalcss:true,logInMessage:'Wrong password'})
            }

   });




    }


  

    handleClick=(event)=>{

     console.log('post cliked',event.target.name);
     newArray[event.target.id].postNumber=event.target.id;
     this.setState({postClicked:true,id:event.target.id});
    }


    handleClickPost=(event)=>{
      
      const eventName={eventName:event.target.id,accountId:this.props.id,imageId:event.target.name};
      console.log(eventName)
      
      axios.post('http://localhost:8086/postevent',eventName).
          then((date)=>{
           //   console.log('data after click post',date.data);
              this.state.postsData=date.data
              this.setState({likes:date.data[0].likes.length})
          })

    }


    makePosts=()=>{
       let array=this.state.postsData
     
       newArray=[];

       if(this.props.category===''){
            newArray=array;

       }else{
          for( let i of array){
               if(i.category===this.props.category){
                newArray.push(i)
               }
           
           }
    
        }
        const posts=newArray.map( (array,index)=>{
 
        //  console.log('array',array)
      
        return(
        <div  id={array._id}  name={index} >
         <div className="contnt_2"  >
          <div className="div_a">
            <div className="div_title">{array.title}</div>
            <div className="btm_rgt">
              <div className="btm_arc">{array.category}</div>
            </div>
            <div className="div_top">
              <div className="div_top_lft"><img src="/images/img_6.png" />{array.id  }</div>
              <div className="div_top_rgt"><span className="span_date">{new Date(array.date).toLocaleDateString()}</span><span className="span_time">{new Date(array.date).toLocaleTimeString()}</span></div>
            </div>
            <div className="div_image"><img   onClick={this.handleClick} id={index} src={`http://localhost:8086/${array.pic}`} alt="pet" /></div>
            <div className="div_btm">
              <div className="btm_list">
                <ul>
                  <li  ><a  id='share' name={array._id} ><span  className="btn_icon"><img name={array._id} id="share" src="/images/icon_001.png" alt="share" /></span>Share</a></li>
                  <li ><a  id="flag" name={array._id}><span  className="btn_icon"><img name={array._id} id="flag" src="/images/icon_002.png" alt="share" /></span>Flag</a></li>
                  <li  ><a id="likes"  name={array._id} onClick={this.handleClickPost} ><span  className="btn_icon"><img name={array._id} id="likes" src="/images/icon_003.png" alt="share" /></span>{array.likes.length} </a></li>
                  <li><a onClick={this.handleClick} name={array._id}   id={index} ><span   className="btn_icon"><img name={array._id} id={index} src="/images/icon_004.png" alt="share" /></span>{array.commentArray.length} Comments</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </div>);
        }
        
        );
        return posts;
  
      }
  
      render(){
          return(
              <div>
                  {this.makePosts()}
                  {this.state.postClicked?<Redirect 
                  to={{pathname:'/singlepost',state:newArray[this.state.id]}} 
                  ></Redirect> : null}
              </div>
          );
      }

    }  


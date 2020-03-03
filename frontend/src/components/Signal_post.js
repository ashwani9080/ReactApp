import React from 'react'
import Timeline from './Timeline';
import axios from 'axios';
import { isArray } from 'util';
 class SignalPost extends React.Component{

  constructor(props){
    super(props);
    this.state={
      commentBox:'',
      postData:this.props.location.state,
      clickEvent:false,
    }
   
  }
  handleClickPost=(event)=>{
      
    console.log('post data',this.state.postData)

    const eventName={eventName:event.target.name,accountId:localStorage.getItem('accountId'),imageId:this.state.postData._id};
    console.log(this.state.postData )
    console.log(eventName)
    
    axios.post('http://localhost:8086/postevent',eventName).
        then((date)=>{
          //  console.log('data after click post',date.data);
            this.setState({postData: date.data[0]})
           // this.setState({likes:date.data[0].likes.length})
        })

  }

  componentDidMount(){
  
    if(localStorage.getItem('authUser')==='false'){
        this.props.history.push('/login')
    }
  }

  handleSubmit=(event)=>{
    event.preventDefault();

    const comment={comment:this.state.commentBox,postId:this.props.location.state._id,personId:localStorage.getItem('username')}
 
    console.log('comment',this.state.postData)

    axios.post('http://localhost:8086/addcomment',comment).
    then((data)=>{
     
      if(data!==false){
        console.log('data returned after adding comment',isArray( data.data));
        this.setState({postData:data.data[0]});
        document.getElementById('addCommentId').value=""
     

      }

    })
 
  }


  handleReply=()=>[


  ]


  handleInput=(event)=>{
    this.setState({commentBox:event.target.value});

  }

    render(){
        return (
            <div>
              <meta charSet="utf-8" />
              <title>Singal Post</title>
              <link href="/css/bootstrap.css" rel="stylesheet" type="text/css" />
              <link href="/css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
              <div className="container">
                
                  
                    <div className="contnt_2">
                      <div className="div_a">
                        <div className="div_title">{this.state.postData.title}</div>
                        <div className="btm_rgt">
                          <div className="btm_arc">{this.state.postData .category}</div>
                        </div>
                        <div className="div_top">
                          <div className="div_top_lft"><img src="/images/img_6.png" />{this.state.postData.id}</div>
                          <div className="div_top_rgt"><span className="span_date">{new Date(this.state.postData.date).toLocaleDateString()}
                          </span><span className="span_time">{new Date(this.state.postData.date).toLocaleTimeString()}</span></div>
                        </div>
                        <div className="div_image"><img src={`http://localhost:8086/${this.state.postData.pic}`} alt="pet" /></div>
                        <div className="div_btm">
                          <div className="btm_list">
                            <ul>
                              <li><a ><span className="btn_icon"><img src="/images/icon_001.png" alt="share" /></span>Share</a></li>
                              <li><a ><span className="btn_icon"><img src="/images/icon_002.png" alt="share" /></span>Flag</a></li>
                              <li><a  onClick={this.handleClickPost} name="likes"><span className="btn_icon" ><img src="/images/icon_003.png" alt="share"    /></span>{this.state.postData.likes.length} Likes</a></li>
                              <li><a ><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>{this.state.postData.commentArray.length} Comments</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="contnt_3">
                    <ul> 


                     
                    {
                   this.state.postData.commentArray.length>0 ? this.state.postData.commentArray.map((data)=>{
                            return(
                              <div>
                                 <li>
                            <div className="list_image">
                            <div className="image_sec"><img src="/images/post_img.png" /></div>
                            <div className="image_name">{data.personId}</div>
                          </div>
                          <div className="list_info">{data.comment}  </div>
                          
                            <input type="button" defaultValue="Reply" onClick={this.handleReply}  className="orng_btn" />
                      
                         </li>
                  
                              </div>
                            )
                          })

                       :null }
                     
                       
                        {/* <li>
                          <div className="list_image">
                            <div className="image_sec"><img src="/images/post_img.png" /></div>
                            <div className="image_name">Bharat</div>
                          </div>
                          <div className="list_info">
                            This is an example of a comment. You can create as many comments like this one or sub
                            comments as you like and manage all of your content inside your Account1.
                          </div>
                          <input type="button" defaultValue="Reply" className="black_btn" />
                          <div className="cmnt_div">
                                <input type="text"  placeholder="Add a Comment" className="cmnt_bx" value={this.state.value}  onChange={this.handleInput}   />
                                <input type="submit" className="sub_bttn" defaultValue="Submit Comment" />
                          </div>
                        </li>
                        <li>
                          <div className="list_image">
                            <div className="image_sec"><img src="/images/post_img.png" /></div>
                            <div className="image_name">Bharat</div>
                          </div>
                          <div className="list_info">
                            This is an example of a comment. You can create as many comments like this one or sub
                            comments as you like and manage all of your content inside your.
                          </div>
                          <input type="button" defaultValue="Reply" className="orng_btn" />
                        </li> */}
                        <li>
                          <div className="cmnt_div1">
                          <form   onSubmit={this.handleSubmit}>

                            <input type="text" placeholder="Enter your Comment"  id="addCommentId" value={this.state.value}  onChange={this.handleInput} autoComplete="off"   className="cmnt_bx1" required   />
                           
                           
                            <input type="submit" className="sub_bttn1" defaultValue="Submit Comment"   />
                          </form>

                          </div>
                        </li>
                      </ul>
                      <div className="view_div"><a >View more</a></div>
                    </div>
                  </div>
                
                <div className="clear" />
              </div>
               
              
            
          );
}

}
export default SignalPost;
import React from 'react';
import ReactDOM from 'react-dom';
import Post from './Posts'
import {Link,Redirect} from 'react-router-dom'
import queryString from 'query-string';
import Axios from 'axios';
import { isArray } from 'util';
class Home extends React.Component{

  constructor(props){
    super(props);  
    this.state={
      email:this.props.match.params.id,
      category:'',
      username:'',
      addCategory:'',
      arrayOfCategory:[],
    }
  
  
  
  }



  componentDidMount(){

    this.props.isAuthed(this.state.email);
    this.props.setHeaderState(true);
    window.scrollTo(0, 0);
   
  
    if(localStorage.getItem('authUser')==='false'){
        this.props.history.push('/login')
    }
    const userId={_id:this.state.email}

    Axios.post('http://localhost:8086/userid',userId).
    then((data)=>{
      console.log(data.data[0])
     
      if(data.data!==false){
        this.setState({username:data.data[0].name});
       }

    })
//getcategory
Axios.post('http://localhost:8086/getcategory').
then((data)=>{
 if(data.data.length!==0)
   this.setState({arrayOfCategory:data.data[0].categoriesArray})
 

})


  }
  handleSubmitCategory=(event)=>{
    event.preventDefault();
    const  category={category:this.state.addCategory}
    Axios.post('http://localhost:8086/addcategorytolist',category).
    then((data)=>{
       if(data.data.length!==0)
          this.setState({arrayOfCategory:data.data[0].categoriesArray,
                         addCategory:''})

         
    
    })
    
  }

  handleUserInput=(event)=>{

    this.setState({[event.target.id]:event.target.value})

  }

   handleClickCategory=(event)=>{
    console.log(event.target.name);
    this.setState({category:event.target.name})
  }

    render(){
    
      return (
        <div>
          <meta charSet="utf-8" />
          <title>Home</title>
          <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
          <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
          <div className="container">
            <div className="content">
              <div className="content_rgt">
                <div className="rght_btn"  onClick={this.handleClick} > <span className="rght_btn_icon">
                  <img src="/images/btn_iconb.png" alt="up" />
                  </span> <span className="btn_sep">
                    <img src="/images/btn_sep.png" alt="sep" />
                    </span> 
                    <Link to={`/uploadpost/${this.state.email}/${this.state.username}`}>Upload Post</Link>
                    </div>
                <div className="rght_btn"   >
                   <span className="rght_btn_icon"><img src="/images/btn_icona.png" alt="up" /></span>
                    <span className="btn_sep">
                      <img src="/images/btn_sep.png" alt="sep" />
                    </span> <a >Add Category</a>
                    <form onSubmit={this.handleSubmitCategory}>
                    <input type="text" id="addCategory" value={this.state.addCategory} onChange={this.handleUserInput} />
                    <input defaultValue="Add me"     type="submit"/>
                    </form>
                </div>
                
                <div className="rght_cate">
                  <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                  <div className="rght_list">
                    <ul>
                      <li><a  name='Cats' onClick={this.handleClickCategory} ><span    className="list_icon"></span> Cats</a></li>
                      <li><a   onClick={this.handleClickCategory} name='Dogs'><span  className="list_icon"></span> Dogs</a></li>
                      <li><a onClick={this.handleClickCategory}  name='Birds' ><span   className="list_icon"></span> Birds</a></li>
                      <li><a  onClick={this.handleClickCategory} name='Rabbits' ><span    className="list_icon"></span> Rabbit</a></li>
                      <li><a  onClick={this.handleClickCategory} name='Others' ><span  className="list_icon"></span> Others</a></li>
                      {

                      
                        this.state.arrayOfCategory.map((data,index)=>{

                        return(

                          <li><a  onClick={this.handleClickCategory} name={data} ><span  className="list_icon"></span> {data}</a></li>

                        );
                        


                      })}
                    </ul>
                  </div>
                </div>
                <div className="rght_cate">
                  <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                  <div className="sub_dwn">
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src="/images/feat_img1.png" alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Cats</div>
                      </div>
                    </div>
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src="/images/feat_img2.png" alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Dogs</div>
                      </div>
                    </div>
                    <div className="feat_sec">
                      <div className="feat_sec_img"><img src="/images/feat_img3.png" alt="image" /></div>
                      <div className="feat_txt">Lorem Ipusum Text</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">Rabbits</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content_lft">
                <div className="contnt_1">
                  <div className="list_1">
                    <ul>
                      <li>
                        <input type="checkbox" className="chk_bx" />
                        Friends</li>
                      <li>
                        <input type="checkbox" className="chk_bx" />
                        Flaged</li>
                    </ul>
                  </div>
                  <div className="post_div">
                    <div className="post_list">
                      <ul>
                        <li><a ><span className="list_img"><img src="/images/img_1.png" /></span>Latest First</a></li>
                        <li><a ><span className="list_img"><img src="/images/img_2.png" /></span>Oldest First</a></li>
                        <li><a ><span className="list_img"><img src="/images/img_3.png" /></span>Most Pet</a></li>
                        <li><a ><span className="list_img"><img src="/images/img_4.png" /></span>Most Clicks</a></li>
                        <li><a ><span className="list_img"><img src="/images/img_5.png" /></span>Most Commented</a></li>
                      </ul>
                    </div>
                    <div className="post_txt">4 New Post Updates</div>
                  </div>
                </div>
                {<Post  category={this.state.category} id={this.state.email} />}
                {/* <div className="contnt_2">
                  <div className="div_a">
                    <div className="div_title">User Interface PSD Source files Web Designing for web</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                    <div className="div_top">
                      <div className="div_top_lft"><img src="/images/img_6.png" />Steave Waugh</div>
                      <div className="div_top_rgt"><span className="span_date">02 Jan 2014</span><span className="span_time">11:15am</span></div>
                    </div>
                    <div className="div_image"><img src="/images/lft_img1.png" alt="pet" /></div>
                    <div className="div_btm">
                      <div className="btm_list">
                        <ul>
                          <li><a ><span className="btn_icon"><img src="/images/icon_001.png" alt="share" /></span>Share</a></li>
                          <li><a ><span className="btn_icon"><img src="/images/icon_002.png" alt="share" /></span>Flag</a></li>
                          <li><a ><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>4 Comments</a></li>
                          <li><a ><span className="btn_icon"><img src="/images/icon_003.png" alt="share" /></span>Likes</a></li>
                          <div className="like_count" style={{marginRight: '10px'}}><span className="lft_cnt" /><span className="mid_cnt">10</span><span className="rit_cnt" /></div>
                          <li><a ><span className="btn_icon"><img src="/images/icon_003.png" alt="share" /></span>Unlike</a></li>
                          <div className="like_count"><span className="lft_cnt" /><span className="mid_cnt">4</span><span className="rit_cnt" /></div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="clear" />
          </div>
         </div>
      );
    }

}


export default Home;
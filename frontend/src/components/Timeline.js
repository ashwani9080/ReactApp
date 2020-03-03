import React from 'react'
import axios from 'axios';
import Post from './Posts'
class Timeline extends React.Component{


  constructor(props){
    super(props);
    this.state={
      postsData:[],
      category:''

    }
  }

    componentDidMount(){

      if(localStorage.getItem('authUser')==='false'){
         this.props.history.push('/login')
        console.log(this.props)

       }

    //   console.log('timeline email','sdfsd@gmial.com')
      const email={eCouponsEmail:'sdfsd@gmial.com'}
      axios.post('http://localhost:8086/posts',email)
         .then((data) => { 
            if(data){
            
               this.setState({postsData:data.data});
               
            }else{    
                this.setState({conditionalcss:true,logInMessage:'Wrong password'})
            }

   });

    }


   



    handleClickCategory=(event)=>{
   
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
                    <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#">Upload Post</a> </div>
                    <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#">Invite Friends</a> </div>
                    <div className="rght_cate">
                      <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                      <div className="rght_list">
                      <ul>
                      <li><a  name='Cats' onClick={this.handleClickCategory} ><span    className="list_icon"><img src="/images/icon_01.png" alt="up" /></span> Cats</a></li>
                      <li><a   onClick={this.handleClickCategory} name='Dogs'><span  className="list_icon"><img src="/images/icon_02.png" alt="up" /></span> Dogs</a></li>
                      <li><a onClick={this.handleClickCategory}  name='Birds' ><span   className="list_icon"><img src="/images/icon_03.png" alt="up" /></span> Birds</a></li>
                      <li><a  onClick={this.handleClickCategory} name='Rabbits' ><span    className="list_icon"><img src="/images/icon_04.png" alt="up" /></span> Rabbit</a></li>
                      <li><a  onClick={this.handleClickCategory} name='Others' ><span  className="list_icon"><img src="/images/icon_05.png" alt="up" /></span> Others</a></li>
                    </ul>
                      </div>
                    </div>
                    <div className="rght_cate">
                      <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
                      <div className="sub_dwn">
                        <div className="feat_sec">
                          <div className="feat_sec_img"><img src="/images/feat_img1.png" alt="image" /></div>
                          <div className="feat_txt">Lorem Ipusum Text</div>
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
                      <div className="timeline_div">
                        <div className="timeline_div1">
                          <div className="profile_pic">
                            <img src="/images/timeline_img1.png" />
                            <div className="profile_text"><a href="#">Change Profile Pic</a></div>
                          </div>
                          <div className="profile_info">
                            <div className="edit_div"><a href="#">Edit <img src="/images/timeline_img.png" /></a></div>
                            <div className="profile_form">
                              <ul>
                                <li>
                                  <div className="div_name1">Name :</div>
                                  <div className="div_name2">Stefiney Gibbs</div>
                                </li>
                                <li>
                                  <div className="div_name1">Sex :</div>
                                  <div className="div_name2">Female</div>
                                </li>
                                <li>
                                  <div className="div_name1">Description :</div>
                                  <div className="div_name3">This is an example of a comment. You can create as many comments like this one
                                    or sub comments as you like and manage all of your content inside Account.</div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="timeline_div2">
                          <ul>
                            <li><a href="#" className="active">Timeline    </a></li>
                            <li><a href="#">About  </a></li>
                            <li><a href="#">Album</a></li>
                            <li><a href="#"> Pets</a></li>
                            <li><a href="#">My Uploads </a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {<Post  category={this.state.category} />}
                    <div className="contnt_2">
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
                              <li><a href="#"><span className="btn_icon"><img src="/images/icon_001.png" alt="share" /></span>Share</a></li>
                              <li><a href="#"><span className="btn_icon"><img src="/images/icon_002.png" alt="share" /></span>Flag</a></li>
                              <li><a href="#"><span className="btn_icon"><img src="/images/icon_003.png" alt="share" /></span>0 Likes</a></li>
                              <li><a href="#"><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>4 Comments</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="clear" />
              </div>
             
            </div>
          );
    }
}


export default Timeline;
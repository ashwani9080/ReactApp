import React from 'react'
import axios from 'axios';
import queryString from 'query-string';
export  default class UploadPost extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email: this.props.match.params.username,
            title:'',
            category:'Cats',
            pic:null, 
            arrayOfCategory:[]
        }

     console.log(  'upload',  this.props.match.params)
     
    }



    componentDidMount(){
  
        if(localStorage.getItem('authUser')==='false'){
          
            this.props.history.push('/login')
        }

        else{
        
        //getcategory
        axios.post('http://localhost:8086/getcategory').
        then((data)=>{
         if(data.data.length!==0)
           this.setState({arrayOfCategory:data.data[0].categoriesArray})
         
        
        })
        
        }

      }

    handleInput=(e)=>{
        if(e.target.name=='pic'){
            console.log('file console in upload',e.target.files[0])
            this.setState({'pic':e.target.files[0]});           
        }else{
        this.setState({[e.target.name]:e.target.value});
        }
    }

   

    handleSubmit=(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('pic',this.state.pic);
        formData.append('id',this.state.email);
        formData.append('title',this.state.title);
        formData.append('category',this.state.category);
        

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        console.log('data uploaded',formData)
        axios.post('http://localhost:8086/addpost',  formData,config )
        .then((data) => { 

            console.log('data returned after uploading',data);
            document.getElementById('success').style.display='block';
          });

      
    }


   

    render(){
        return(
            <div >
                <link href="/css/style2.css" rel="stylesheet" type="text/css" />
                 <form   id='form'  onSubmit={this.handleSubmit} >
                 <div><span style={{fontSize:30}} >UPLOAD WEB DATA </span></div>
                 <div><span>Title</span></div>
                 <input type="text" name='title'  value={this.state.title} onChange={this.handleInput}  required/>
                 <div><span>Category</span></div>
                 <select name="category"  value={this.state.value}  onChange={this.handleInput} required>
                     <option value="Cats">Cats</option>
                     <option value="Dogs">Dogs</option>
                     <option value="Birds">Birds</option>
                     <option value="Rabbits">Rabbits</option>
                     <option value="Others">Others</option>
                     {this.state.arrayOfCategory.length>0?
                              this.state.arrayOfCategory.map((data,index)=>{
                           return(
                            <option value={data}>{data}</option>  
                           )
                       })
                    
                    :null}

                 </select>
                 <div><span>Choose image</span></div>
                 <input type="file" name='pic' onChange={this.handleInput} required />
                  <input type='submit' value="Upload"/>
                    <div id='success' style={{color:'green',fontStyle:'bold',display:'none' }}>Successfully sent</div>
                </form> 
                
            </div>
        );
    }
}
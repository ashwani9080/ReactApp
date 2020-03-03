import React from 'react';
import Register from './components/Register'
import Home from './components/Home'
import Login from './components/login';
import SignalPost from './components/Signal_post'
import Header from './components/Header'
import Footer from './components/Footer';
import UploadPost from './components/UploadPost'
import Timeline from './components/Timeline';
import Forget from './components/Forget';
import Reset from './components/Reset';
import SinglePost  from './components/Signal_post';
import PrivateRoute from 'react-private-route';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch
} from "react-router-dom";
import Posts from './components/Posts';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      clickEvent:true,
      clickEventHome:false,
      showTimeline:false, 
      email:'',
      header:false,

    }
 
  }
  handleClickHome = (mail) =>{
    this.setState({email:mail}); 
  }

  setHeaderState=(headerState)=>{
    this.setState({header:headerState})
  }

  render(){
    
    return( 
      <div>
         
       
             <Header stateOfHeader={this.state.header} email={this.state.email} />
              <Switch> 
                <Route path='/singlepost' component={SinglePost} />
                <Route path='/reset/:id' component={Reset} />
                <Route path='/forget' component={Forget} />
                <Route path='/uploadpost/:id/:username'  component={UploadPost} /> 
                <Route path='/timeline'  component={Timeline} />
                <Route  path='/home/:id'  render={(props) => <Home {...props} isAuthed={this.handleClickHome}  setHeaderState={this.setHeaderState} />} />
                <Route path='/login' render={(props) => <Login {...props} isAuthed={this.handleClickHome}   />}  />
                <Route  exact path='/'  render={(props) => <Register {...props} setHeaderState={this.setHeaderState}  />}  />
                <Router path='/posts' component={Posts}/>
              </Switch>
        
       <Footer/>
     
      </div>
    )
  }
}

export default App;

// <Route path='/timeline' component={Timeline}/>
// <Route path='/forget' component={Forget}/>
// <Route path='/Reset' component={Reset}/>
// <Route path='/home' component={Home}/>
// <Route path='/uploadpost' component={UploadPost}/>


//showComponent =(component)=>{ 
//   if(this.state.componentName==='register'){ 
//        return  <Register  onClick={this.handleClick} componentChange={this.handleClick}  />
//   }else if(this.state.componentName==='login'){
//         return <Login  onClick={this.handleClick} componentChange={this.handleClick}  onClickHome={this.handleClickHome}  />
//   }else if(this.state.componentName==='home'){
//        return   <Home  componentChange={this.handleClick}  />
//   }else if(this.state.componentName==='timeline'){
//        return <Timeline/>
//   }else if(this.state.componentName==='upload'){
//        return <UploadPost email={this.state.email}  emailSent={this.state.email}  />
//   }

// }

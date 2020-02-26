import React from 'react';
import Register from './components/Register'
import Home from './components/Home'
import Login from './components/login';
class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      clickEvent:true,
      clickEventHome:false
    }
 
  }

  handleClick = (event) =>{
      this.setState({clickEvent:this.state.clickEvent?false:true});
   
  }

  
  handleClickHome = (event) =>{
    this.setState({clickEventHome:true});
    console.log('home',this.clickEventHome)
 
}



  render(){
    
   
    return(
      <div>
        { this.state.clickEventHome? <Home /> :this.state.clickEvent?<Register onClick={this.handleClick} />:<Login onClick={this.handleClick}   onClickHome={this.handleClickHome}/>}
      </div>
    )
  }
}

export default App;

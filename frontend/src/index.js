import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './components/serviceWorker';
import Header from './components/Header';
import Footer from './components/Footer'
import { BrowserRouter } from 'react-router-dom'


class Index extends React.Component{
    render(){
        return(
            (<BrowserRouter>
                 <App />
          </BrowserRouter>)
        );
    } 
}


ReactDOM.render(<Index/>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

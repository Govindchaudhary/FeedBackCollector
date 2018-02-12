import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './Header';
import Landing from './landing';
import * as actions from '../actions'
import Dashboard from './Dashboard';
const SurveyNew = ()=> <h2>SurveyNew</h2>



class App extends Component {
    componentDidMount() {
        this.props.fetchUser()

    }
    render() {
       return(
        <div className="container">
           <BrowserRouter>
             <div>
                 <Header/>
                 <Route  exact  path ="/" component = {Landing}/>
                 <Route exact path ="/surveys" component = {Dashboard}/>
                 <Route exact path ="/surveys/new" component = {SurveyNew}/>
                 
             </div>
           </BrowserRouter>
        </div>
    );
    }
}


export default connect(null,actions)(App);
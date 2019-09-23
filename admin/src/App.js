

import React,{Component} from 'react'
import {message} from 'antd'
import './App.css'
import {BrowserRouter,HashRouter,Route,Switch} from 'react-router-dom'
import WrappedNormalLoginForm from './pages/login/login'
import Admin from './pages/admin/admin'
import { INCREMENT } from './redux/action-type';
import {increment,decrement,incrementAsync,incrementStep} from './redux/actions'




export default class App extends Component{


    

    render(){
        return(
            <div className='App' style={{height:'100%'}}>
           

            <HashRouter>
                 <Switch>
                 <Route path='/' exact component={Admin}></Route>
                 <Route path='/admin' component={Admin}></Route>
                     <Route path='/login' component={WrappedNormalLoginForm}></Route>
                   

                 </Switch>
             </HashRouter> 
            </div>
        )
    }
}
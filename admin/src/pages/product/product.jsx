import React ,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import {ProductHome} from './home'
import {AddProduct} from './addproduct'

import {ProductDetail} from './detailproduct'




export default class Product extends Component{


    render(){
        return(
            <div>
             <Switch>
                 <Route path='/admin/product' exact component={ProductHome}></Route>
                 <Route path='/admin/product/add' component={AddProduct}></Route>

                 <Route path='/admin/product/detail/:product' component={ProductDetail}></Route>
                 <Redirect to={'/admin/product'}></Redirect>

             </Switch>
            </div>
        )
    }
}
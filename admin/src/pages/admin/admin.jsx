import React, { Component, } from 'react'
import { Redirect,Switch,Route } from 'react-router-dom'


import { Layout } from 'antd';
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import Home from '../home/home'
import Category from '../category/category'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import {connect} from 'react-redux'


const {  Footer, Sider, Content } = Layout;



 class Admin extends Component {


    render() {
      
        if (!localStorage.getItem('user_key')||!JSON.parse(localStorage.getItem('user_key')).username) {
            // console.log(999)
            return <Redirect to='/login' />
        }
        return (
           
                <Layout style={{height:'100%'}}>
                    <Sider><LeftNav></LeftNav></Sider>
                    <Layout>
                        <Header style={{color:'white'}}>Header</Header>
                        <Content style={{backgroundColor:'#fff' ,margin:20,height:500}}>
                            <Switch>
                                <Route path='/admin/home' component={Home}/>
                                <Route path='/admin/product' component={Product}/>
                                <Route path='/admin/category' component={Category}/>
                                <Route path='/admin/charts/bar' component={Bar}/>
                                <Route path='/admin/charts/line' component={Line}/>
                                <Route path='/admin/charts/pie' component={Pie}/>
                                <Route path='/admin/role' component={Role}/>
                                <Route path='/admin/user' component={User}/>
                                <Redirect to='/admin/home' />
                            </Switch>
                        </Content>
                        <Footer style={{backgroundColor:'#eee',color:'black',fontSize:16}}>欢迎使用Admin管理后台</Footer>
                    </Layout>
                </Layout>
            
        )
    }
}


export default connect(
state=>({
    user:state.user
})
)(Admin)
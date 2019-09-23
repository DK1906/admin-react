import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.less'
import User from '../../utils/localStorage'

import menuList from '../../config/menuConfig'
import { reqWeather, reqChangePassword } from '../../api/index'
import formatDate from '../../utils/formatDate';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import {clearUser} from '../../redux/actions'
// import {}

const { confirm } = Modal;
var timer = null;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: formatDate(),
            dayPictureUrl: '',
            weather: '晴',
            visible: 0,
            password: '',

        }
    }

    handleCancel = () => {
        this.setState({
            visible: 0
        })
    }

    //修改密码
    handleOk = async () => {
        
        const { password } = this.state;
        const username = this.props.user.username
if(password.length>=4&&password.length<=12){
    console.log(username,password)
    const result = await reqChangePassword(username, password)
    console.log(222)
    if(result.status==0){
        this.setState({
            visible: 0
        },()=>{
           
              this.props.clearUser()
            
               
        })
    }
}

    }

    showModal = (event) => {
        event.preventDefault()
        this.setState({
            visible: 1
        })
    }

    //退出登录
    showConfirm = (event) => {
        event.preventDefault()

        confirm({
            title: '确定退出登录吗?',

            onOk: () => {
               
              this.props.clearUser()
           
              

            },

        });
    }

 

    //获取标题
    getTitle = () => {
        const pathname = this.props.location.pathname;
        menuList.forEach((item) => {
            if (item.key === pathname) {
                this.title = item.name;
            } else if (item.children) {
                item.children.forEach((child) => {
                    if (child.key === pathname) {
                        this.title = child.name;
                    }
                })
            }

            return this.title;
        })
    }

    //头部时间
    getTime = () => {
        timer = setInterval(() => {

            this.setState({
                time: formatDate()
            })
        }, 1000)
    }




    componentDidMount() {
        this.getTime();

        // console.log( reqWeather('武汉'))
        reqWeather('武汉').then(res => {
            const { dayPictureUrl, weather } = res

            this.setState({
                dayPictureUrl,
                weather
            })
        })



    }
    componentWillUnmount() {
        clearInterval(timer);
    }

    render() {

    //   const title=  this.getTitle();
      const title = this.props.headerTitle

        return (
            <div className='header'>
                
                <div className='header-top'>
                    
                    <span style={{ fontWeight: 'bold' }}>欢迎，{this.props.user.username}</span>
                    <a href="" onClick={this.showModal}> 修改密码</a>
                    <a href="" onClick={this.showConfirm}> 退出</a>
                    <Modal
                    visible={this.state.visible == 1}
                    title="修改密码"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            取消
            </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            确认
            </Button>,
                    ]}
                >
                    <input type="text" onChange={(e) => this.setState({ password: e.target.value })} />

                </Modal>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{this.state.time}</span>
                        <img src={this.state.dayPictureUrl} alt="" />
                        <span>{this.state.weather}</span>
                    </div>
            
                </div>
            
               
            </div>
        )
    }
}

export default connect(
    state=>({
        headerTitle:state.headerTitle,
        user:state.user

    }),
    {clearUser}
)(withRouter(Header))
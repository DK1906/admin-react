import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import './login.less'
import { Form, Icon, Input, Button,message } from 'antd';
// import bg from '../../assets/images/bg1.jpg'
import {reqLogin} from '../../api'
import User from '../../utils/localStorage'
import Memory from '../../utils/memory'
import {connect} from 'react-redux'
import {login} from '../../redux/actions'



 class Login extends Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async(err, values) => {
          const {username,password}=values;
          // console.log(values)
       
          if (!err) {
            
           this.props.login(username,password)
         
           if(this.props.user.username){
            User.saveUser(this.props.user);
            this.props.history.replace('/admin/home');
           
           
           }else{
            message.error('用户不存在')
           }


          }
        });
      };


    render(){
      // console.log(Memory.user)
      if( localStorage.getItem('user_key')&&JSON.parse(localStorage.getItem('user_key')).username){
        return <Redirect to='/admin/home'/>
      }
        const { getFieldDecorator } = this.props.form;
        return(
            <div className='login'>
              
                <div className='login-header'><h1>Admin:后台管理系统</h1></div>
                <div className='login-content'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true,whitespace:true, message: '请输入用户名!' },
            {min:4,message:'至少4位'},
            {max:12,message:'至多12位'},
            {pattern:/^[a-zA-Z0-9_]+$/,message:'必须是英文数字下划线'},


          ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />}
              placeholder="请输入用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' },
            {min:4,message:'至少4位'},
            {max:12,message:'至多12位'},
            {pattern:/^[a-zA-Z0-9_]+$/,message:'必须是英文数字下划线'},],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />}
              type="password"
              placeholder="请输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          
        
          <Button style={{width:'100%'}} type="primary" htmlType="submit" className="login-form-button">
          登录
          </Button>
        
        </Form.Item>
      </Form>
                </div>
            
            </div>
        )
    }
}

export  default connect(
  state=>({
    user:state.user,
  }),
  {login}
)( Form.create()(Login))
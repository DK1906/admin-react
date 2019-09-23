import React , {Component} from 'react';
import {Form,Icon,Input} from 'antd';


 class UpdateList extends Component{

  componentWillMount(){
    this.props.getForm( this.props.form);
  }

    render(){
        // console.log(this.props)
        const { getFieldDecorator } = this.props.form;
       
        // console.log(getFieldDecorator.categoryName)
        return(
            <div>
               
        <Form.Item>
          {getFieldDecorator('categoryName', {
            rules: [{ required: true, message: '请输入修改内容' }],
            initialValue:this.props.categoryName
          })(
            <Input
           
              placeholder="请输入修改内容"
            />,
          )}
        </Form.Item>
            </div>
        )
    }
}

export const UpdateForm = Form.create()(UpdateList); 

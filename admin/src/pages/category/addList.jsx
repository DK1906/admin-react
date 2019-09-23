

import React , {Component} from 'react';
import {propTypes} from 'prop-types'

import {Form,Icon,Input,Select} from 'antd';
const Option = Select.Option
const Item = Form.Item


class AddList extends Component{
  // static propTypes = {
  //   dataSource:propTypes.array.isRequired,
  //   level:propTypes.string.isRequired,

  
  // }

  componentWillMount(){
    this.props.getForm( this.props.form);
  }
    render(){
        const { getFieldDecorator } = this.props.form;
      
       
        return(
            <div>
                <Item>
                <span>所属分类：</span>
                 {getFieldDecorator('level', {
             rules: [{ required: true, message: '请输入内容' }],
            initialValue: this.props.level
          })(
           
            <Select style={{width:'100%'}}>
          <Option key={'9'} value={this.props.level}>一级分类</Option>
            {this.props.dataSource.map(item=><Option key={item.name} value={item._id}>{item.name}</Option>)}

     
      </Select>
          )}
            </Item>

     
        <Item>
        <span>分类名称：</span>
          {getFieldDecorator('categoryName', {
            rules: [{ required: true, message: '请添加分类!' }],
            initialValue: ''
          })(
            <Input
              placeholder="请添加分类"
            />,
          )}
        </Item>
            </div>
        )
    }
}

export  const AddForm = Form.create()(AddList); 
import React, { Component } from 'react'
import { Card, Table, Button, Icon, Pagination,Modal  } from 'antd'
import './index.less'
import { reqCategory, reqUpdate, reqAdd } from '../../api';
import {AddForm} from './addList'
import {UpdateForm} from './updateList'


export default class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      firstList:[],
      secondList:[],
      visible:0,
      columns: [],
      flag:false,
      level:'1',
      parentName:''
    }
  }
  //查看子分类
  getSecondList=(dataSource)=>{
    // console.log(dataSource)
    this.setState({
      parentName:dataSource.name,
      level:dataSource._id
    },()=>{
      this.getCategory()
      // console.log(this.state.level)
    })
  }
  
  //点击取消
  handleCancel=()=>{
 
    this.form.resetFields()

    this.setState({
      visible:0
    })
    
  }
  //返回一级列表
  returnFirstList=()=>{
    this.setState({
      level:'1',
      parentName:'',
      secondList:[]
    })
  }
  
  //显示修改弹框
  updateList=(dataSource)=>{
    console.log(dataSource)
    this.categoryName=dataSource.name
    this.categoryId = dataSource._id
    this.setState({
      visible:2
    })
  }
  //确认修改
  handleOk= ()=>{
   

    this.form.validateFields(async(err,values)=>{
      if(!err){
        const categoryId =this.categoryId 
        // const categoryId =this.categoryId
    
        const {categoryName} = values
        // console.log(categoryId,categoryName)
        this.form.resetFields();
       const result = await reqUpdate({categoryId,categoryName})
      //  console.log(result)
       this.setState({
        visible:0
      });
     
      if(result.status===0){
      
       this.getCategory()
        
      }
     
      }
    })

  
 
 
  }

  //添加弹框
  addList=()=>{
    this.setState({
      visible:1
    })
  }
  //添加分类
  handleAdd= ()=>{


    this.form.validateFields(async(err,values)=>{
        if(!err){
          const categoryName =this.form.getFieldValue('categoryName')
   const {level} =values

  
  //  console.log(this.state.level)
  //  console.log(categoryName,level)
    this.form.resetFields();

    const result = await reqAdd({level,categoryName})
    // console.log(result)
    this.setState({
      visible:0
    })
    if(result.status===0){
      //同级分类列表下
     if(level===this.state.level)
      this.getCategory()
    }else if(level==='1'){
      //二级分类列表获取一级分类
      this.getCategory('1')

    }
        }
    })
   
  }



  //获取分类列表
  getCategory = async (level) => {
    // console.log(999)
    this.setState({
      flag:true
    })
    var level = level || this.state.level
    // console.log(level)
    const result = await reqCategory(level)
    if(level=='1'){
      this.setState({
        firstList: result.result,
        flag:false
      })
    }else{
      // console.log(2222)
      this.setState({
        secondList: result.result,
        flag:false
      })
      console.log(this.state.secondList)
    }
   
  }
  componentWillMount() {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        width: 300,
      },

      {
        title: '操作',
        dataIndex: '',
        key: 'x',

        render: (dataSource) =>

        <div >
          <a onClick={()=>this.updateList(dataSource)}>修改分类</a>
          {this.state.level=='1'?<a 
          style={{ marginLeft: 20 }} 
          onClick={()=>this.getSecondList(dataSource)}
          >查看子分类</a>:null}
          </div>,
      },
    ];
    this.setState({
      columns: this.columns
    })
  }
  componentDidMount() {
    //获取分类
    this.getCategory()
  }

  render() {
    const {columns,level,firstList,secondList,parentName} = this.state
    const dataSource = level=='1'?firstList:secondList;
    const  categoryName= this.categoryName || {};

    const title =this.state.level=='1'? '一级分类列表':(<div><Button onClick={this.returnFirstList}>{'返回一级分类列表'}</Button><span style={{marginLeft:10,marginRight:10}}>/</span><span>{this.state.parentName}</span></div>);
    const extra = (
      <Button type='primary' onClick={()=>this.addList()} >
       
        +添加
               </Button>
    )

    return (

      <Card className='category' title={title} extra={extra} >
      
        <Table
          rowKey= '_id'
        loading={this.state.flag}
          bordered
          pagination={{ pageSize: 5, showQuickJumper: true }}
          dataSource={dataSource}
          columns={columns}
        >

        </Table>

        <Modal
          title="添加分类"
          visible={this.state.visible==1}
          onOk={this.handleAdd}
          onCancel={this.handleCancel}
        >
           <AddForm dataSource={dataSource} level={level} getForm={(form)=>{this.form=form}}></AddForm>
         
        </Modal>

        <Modal
          title="修改分类"
          visible={this.state.visible==2}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <UpdateForm categoryName={categoryName} getForm={(form)=>{this.form=form}}></UpdateForm>
        </Modal>
      </Card>


    )
  }
}
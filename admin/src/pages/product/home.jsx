

import React,{Component} from 'react';
import {Card,Select,Button,Table,Icon,Input,Modal} from 'antd';
import {reqAllProducts} from '../../api/index'
import {reqName,reqDesc,searchStatus,updateStatus,reqUpdateItem} from '../../api'
const Option = Select.Option;

export class ProductHome extends Component{
        constructor(props){
            super(props)
            this.state={
                products:[],
                type:'1',
                searchName:'',
                visible:0,
                valueS:'1',
                valueN:'',
                valueP:null,
                valueD:'',
                _id:'',
                flag:false
              
            }
        }
//点击修改
updataItem=(product)=>{
    console.log(product._id)
    this.setState({
        visible:1,
        _id:product._id
    })
}
//确认修改
handleOk=async(product)=>{
    const {valueN,valueP,valueD,valueS,_id} = this.state
if(valueN!=''&&valueP!=''&&valueD!=''&&valueS!=null){
   
     const result = await reqUpdateItem({valueN,valueP,valueD,valueS,_id})
     console.log(result)
     if(result.result.ok){
        this.setState({
            visible:0
        })
        this.getAllProducts()
     }
}

   
}

//
handleCancel=()=>{
    this.setState({
        visible:0
    })
}


        updateStatus=async({_id,status})=>{
            const result = await updateStatus({_id,status})
            console.log(result)
            this.getAllProducts()
        }

        //下架上架
        changeStatus=async(product)=>{
            console.log(product._id)
            const _id = product._id;
           const result = await searchStatus(_id)
        //    console.log(result.result[0])
           var status = result.result[0].status
           console.log(status)
           if(status==1){
               status=0
           }else{
               status=1
           }

           this.updateStatus({_id,status})
        }

        getName=(name)=>{
            console.log(name)
            this.setState({
                valueN:name
            })
        }
        getStatus=(status)=>{
            console.log(status)
            this.setState({
                valueS:status
            })
        }
        getPrice=(price)=>{
            console.log(price)
            this.setState({
                valueP:price
            })
        }
        getDesc=(desc)=>{
            console.log(desc)
            this.setState({
                valueD:desc
            })
        }



        //搜索
        search=async()=>{
            const {type, searchName} =this.state
            if(type==='1'){
               const result = await reqName(searchName)
            //    console.log(result)
               this.setState({
                products:result.result
               })

            }else{
                const result = await reqDesc(searchName)
            //    console.log(result)
    
            this.setState({
                products:result.result
               })

            }
        }
        getAllProducts= async()=>{
            this.setState({
             
                flag:true
            })
            const result = await reqAllProducts()
            if(result.status==0){
                this.setState({
                    products:result.result,
                    flag:false
                })
            }
        }
        initColumns=()=>{
            this.columns = [
                {
                  title: '商品名称',
                  dataIndex: 'name',
                 
                },
                {
                    title: '商品描述',
                    dataIndex: 'desc',
                    
                  },
                  {
                    title: '商品价格',
                    dataIndex: 'price',
                    render:(price)=>'￥'+price
                    
                  },
                  {
                    title: '状态',
                  
                   width:100,

                    render:(product)=>{
                       
                        return(
                          
                            <span>
                                <Button type='primary' onClick={()=>this.changeStatus(product)} >{product.status==1?'下架':'上架'}</Button>
                                <span>{product.status==1?'在售':'售罄'}</span>
                            </span>
                        )
                    }
                    
                  },
                  {
                    title: '操作',
                   width:100,
                    render:(product)=>{
                        return(
                            <span>
                                <span 
                              
                                style={{color:'green',marginBottom:20}} 
           
            onClick={()=>this.props.history.push(`/admin/product/detail/${ JSON.stringify(product)}`)}>详情</span><br/>
                                <span style={{color:'green'}} onClick={()=>this.updataItem(product)} >修改</span>
                            </span>
                            
                        )
                    }
                    
                  },
               
              ]
        }
        componentWillMount(){
            this.initColumns()
        }

        componentDidMount(){
            //获取所有商品
        this.getAllProducts()
        }

    render(){


        const dataSource = this.state.products;
          
        
        const title=(
            <span style={{float:'left'}}>
                <Select  value={this.state.type} style={{width:200}} onChange={value=>this.setState({type:value})}>
                <Option value='1'>按名称搜索</Option>
                <Option value='2' >按描述搜索</Option>

                </Select>
                <Input 
                placeholder='搜索关键字' 
                style={{width:150,margin:'0 10px'}}
                 value={this.state.searchName}
                  onChange={event=>this.setState({searchName:event.target.value})}></Input>
                <Button  type='primary' onClick={this.search}>搜索</Button>

            </span>
        )
        const extra=(
            <Button type='primary' onClick={()=>this.props.history.push('/admin/product/add')}>+添加商品</Button>
        )
        return(
            <Card title={title}  extra={extra}>
<Table
 bodered rowKey='_id'
 loading={this.state.flag}
  dataSource={dataSource}
   columns={this.columns} 
   pagination={{ pageSize: 5, showQuickJumper: true }}></Table>


 <Modal
          visible={this.state.visible==1}
          title="修改商品信息"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary"  onClick={this.handleOk}>
              修改
            </Button>,
          ]}
        >
            <span>商品名称:</span>
        <input type="textera" style={{outline:'none',width:'100%',marginBottom:20 }} onChange={(e)=>{this.getName(e.target.value)}} />
        <span>商品描述:</span>
        <input type="textera" style={{outline:'none',width:'100%',marginBottom:20}}  onChange={(e)=>{this.getDesc(e.target.value)}}/>
        <span>商品价格:</span>
        <input type="textera" style={{outline:'none',width:'100%',marginBottom:20}}  onChange={(e)=>{this.getPrice(e.target.value)}}/>
        <span style={{marginRight:20}}>商品状态:</span>
        <select name="" id="" value={this.state.valueS} onChange={(e)=>{this.getStatus(e.target.value)}} >
       
            <option value='1'>在售</option>
            <option value="0">售罄</option>

        </select>
       
       
        

        </Modal>


            </Card>
        )
    }
}
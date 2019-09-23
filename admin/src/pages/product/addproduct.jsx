import React,{Component} from 'react'
import {reqAddItem} from '../../api'

import {List,Button} from 'antd'
const Item = List.Item

export class AddProduct extends Component{

    constructor(props){
        super(props)
        this.state={
            valueS:'1',
            valueN:'',
            valueP:null,
            valueD:'',
        }
    }


    handleAdd=async()=>{
        const {valueN,valueP,valueD,valueS} = this.state
    if(valueN!=''&&valueP!=''&&valueD!=''&&valueS!=null){
       
         const result = await reqAddItem({valueN,valueP,valueD,valueS})
         console.log(result)
        
         
            this.props.history.goBack()
         
    }
    
       
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

    render(){
        return(
            <div>
             <List>
             <Item>
             <span style={{fontSize:20}}>商品名称:</span>
        <input type="textera" style={{outline:'none',width:500,marginBottom:20,marginLeft:50 }} onChange={(e)=>{this.getName(e.target.value)}} />
             </Item>
             <Item>
             <span  style={{fontSize:20}}>商品描述:</span>
        <input type="textera" style={{outline:'none',width:500,marginBottom:20,marginLeft:50}}  onChange={(e)=>{this.getDesc(e.target.value)}}/>
                 
                 </Item>
                 <Item>
                 <span  style={{fontSize:20}}>商品价格:</span>
        <input type="textera" style={{outline:'none',width:500,marginBottom:20,marginLeft:50}}  onChange={(e)=>{this.getPrice(e.target.value)}}/>
                 
                 </Item>
                 <Item>
                 <span style={{marginRight:20,fontSize:20}}>商品状态:</span>
        <select name="" id="" value={this.state.valueS} onChange={(e)=>{this.getStatus(e.target.value)}} >
       
            <option value='1'>在售</option>
            <option value="0">售罄</option>

        </select>
                 
                 </Item>
                 <Button style={{float:'right',marginTop:20,marginRight:50}} type='primary' onClick={this.props.history.goBack}>返回</Button>
                 <Button style={{float:'right',marginTop:20,marginRight:50}} type='primary' onClick={this.handleAdd}>添加</Button>

             </List>
            </div>
        )
    }
}
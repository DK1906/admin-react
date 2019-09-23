import React,{Component} from 'react'
import {List,Button} from 'antd'
const Item = List.Item

export class ProductDetail extends Component{


    render(){
      
        const product =JSON.parse( this.props.match.params.product)
        console.log(product)
        return(
            <div>
               <List>
                   <Item>
                    <span style={{fontSize:20,fontWeight:'bold'}}>商品名称：</span>
                    <span>{product.name}</span>
                   </Item>
                   <Item>
                   <span style={{fontSize:20,fontWeight:'bold'}}>商品价格：</span>
                   <span>{product.price}</span>

                   </Item>
                   <Item>
                   <span style={{fontSize:20,fontWeight:'bold'}}>商品描述：</span>
                   <span>{product.desc}</span>

                   </Item>
                   <Item>
                   <span style={{fontSize:20,fontWeight:'bold'}}>商品状态：</span>
                   <span>{product.status==1?'在售':'售罄'}</span>

                   </Item>

                   <Button style={{float:'right',marginTop:50,marginRight:50}} onClick={this.props.history.goBack}>返回</Button>
               </List>
            </div>
        )
    }
}
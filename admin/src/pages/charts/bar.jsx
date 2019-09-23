import React ,{Component} from 'react'
import {Card,Button} from 'antd'
import ReactEcharts from 'echarts-for-react'


export default class Bar extends Component{

    constructor(props){
        super(props);
        this.state={
            sales:[12510, 12300, 1360, 11030, 4550, 12300],
            stores:[25010, 23000, 3060, 10003, 10003, 20300]
        }
    }

    update=()=>{
        this.setState(state=>({
            
                sales:state.sales.map(sale=>sale+50),
                stores:state.stores.reduce((pre,store)=>{
                    pre.push(store-50)
                    return pre
                },[])
    
            
        }))
    }

    getOption=(sales,stores)=>{
        return {
            title: {
                text: '销量图',
               
            },
            tooltip: {},
            legend: {
                data:['销量','库存']
            },
            xAxis: {
                data: ["电脑","手机","家具","零食","服饰","鞋子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: sales
            },
            {
                name: '库存',
                type: 'bar',
                data: stores
            }]
        };
    }

    render(){
        const {sales,stores} = this.state
        return(
            <div>
               <Card>
            <Button type='primary' onClick={this.update}>更新</Button>
            </Card>
              <Card title='柱状图'>
              <ReactEcharts option={this.getOption(sales,stores)}>

              </ReactEcharts>
              </Card>
            </div>
        )
    }
}
import React ,{Component} from 'react'
import {Card,Button} from 'antd'
import ReactEcharts from 'echarts-for-react'


export default class Pie extends Component{
    constructor(props){
        super(props);
        this.state={
            sales:[
                {value:1210,name:'电脑'},
            {value:1210,name:'家具'}, 
            {value:12130,name:'服饰'},
            {value:12130,name:'鞋子'},
            {value:12130,name:'手机'},
            {value:12310,name:'零食'}
        ],
            stores:[
                {value:12510,name:'电脑'},
            {value:12510,name:'家具'}, 
            {value:12510,name:'服饰'},
            {value:12510,name:'鞋子'},
            {value:12510,name:'手机'},
            {value:12510,name:'零食'}
            ]
        }
    }



    getOption=(sales,stores)=>{
        return {
            title: {
                text: '销量图',
                x:'right'
            },
            tooltip: {
               
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data:['电脑','家具','服饰','鞋子','鞋子','手机','零食']
            },
           
         
            series: [{
                name: '销量',
                type: 'pie',
                radius : '55%',
                center: ['30%', '50%'],
                data: sales,
                label: { normal: { show: true }},
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            {
                name: '库存',
                type: 'pie',
                radius: '55%',
                center: ['70%', '70%'],
                data: stores,
                label: { normal: { show: true}}
            }]
        };
    }

    render(){
        const {sales,stores} = this.state
        return(
            <div style={{textAlign:'left'}}>
            <Card>
           
            </Card>
              <Card title='饼图'>
              <ReactEcharts option={this.getOption(sales,stores)}>

              </ReactEcharts>
              </Card>
            </div>
        )
    }
}
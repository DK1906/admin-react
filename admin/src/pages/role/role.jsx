import React, { Component } from 'react'
import { Card, Table, Button, Modal, message } from 'antd'
import { reqRoles, reqAddRole } from '../../api';
import Memory from '../../utils/memory'



const arr = [
    { "name": "测试", 
    "power": "admin" 
},
     { "name": "产品经理", "power": "admin"},
   { "name": "程序猿", "power": "admin" },
    { "name": "架构师", "power": "admin" },
     { "name": "Boss", "power": "admin" }]

     const arr2=[
         {
             name:'测试',
             power:'admin'
         },
         {
            name:'产品经理',
            power:'admin'
        },
        {
            name:'程序猿',
            power:'admin'
        },
        {
            name:'架构师',
            power:'admin'
        },
        {
            name:'Boss',
            power:'admin'
        },

     ]

export default class Role extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            visible: 0,
            role: '',
        }
    }



    //添加
    handleAdd = () => {
        console.log(99)
        this.setState({
            visible: 1
        })
    }

    //取消
    handleCancel = () => {
        this.setState({
            visible: 0
        })
    }
    //添加
    handleOk = async () => {
        const { role } = this.state;
        if (role != '') {
            const power = Memory.user.username
            console.log(role, power)
            const result = await reqAddRole({ role, power })
            console.log(result)

            if (result.status == 0) {
                message.success(result.message)

                this.setState({
                    visible: 0
                }, () => this.getRoles())
            }
        }

    }
    getRoles = async () => {
        this.setState({
            flag:true
          })
        console.log(999)
        const result = await reqRoles()
        console.log(result.result)
        if (result.status == 0) {
            this.setState({
                dataSource: result.result,
                flag:false
            })
        }
    }

    componentWillMount() {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',

            },
            {
                title: '授权人',
                dataIndex: 'power',

            },

        ]
    }

    componentDidMount() {

        this.getRoles()
    }

    render() {

        const { dataSource } = this.state
        console.log(this.state.dataSource)


        return (
            <Card>
                <Table
                loading={this.state.flag}
                    dataSource={dataSource}
                    columns={this.columns}
                    pagination={{ pageSize: 5, showQuickJumper: true }}
                    bordered
                    rowKey='_id'
                >

                </Table>
                <Modal
                    visible={this.state.visible == 1}
                    title="添加角色"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            取消
            </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            添加
            </Button>,
                    ]}
                >
                    <input type="text" onChange={(e) => this.setState({ role: e.target.value })} />

                </Modal>


                <Button style={{ float: 'right', marginTop: 20, marginRight: 50 }} type='primary' onClick={this.handleAdd}>添加</Button>
            </Card>
        )
    }
}
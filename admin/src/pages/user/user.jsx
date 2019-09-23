import React, { Component } from 'react'
import { Card, Table, message, Button, Modal } from 'antd'
import { reqTeam, reqDeteleInfo, reqRoleList, reqAddInfo,reqUpdataInfo } from '../../api'
// import redux from 'redux'


export default class User extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            flag: false,
            visible: 0,
            roleList: [],
            valueR: '',
            valueU: '',
            valueP: '',
            _id:''

        }
    }

    handleComfirm=async () => {
        const { valueP, valueU, valueR ,_id} = this.state;
        const result = await reqUpdataInfo(valueP, valueU, valueR,_id)
        if (result.status == 0) {
            console.log(111)
            message.success(result.message)

            this.setState({
                visible: 0
            },()=>this.getTeam())
        }



    }

    handleNo=()=>{
        this.setState({
            visible: 0
        })
    }
    //修改
    updateInfo=(info)=>{


        this.setState({
            visible: 2,
            _id:info._id
            
        })
   
    }

    getUsername = (valueU) => {
        // console.log(valueU)
        this.setState({
            valueU
        })
    }

    getPassword = (valueP) => {
        // console.log(valueP)
        this.setState({
            valueP
        })
    }


    getRolename = (valueR) => {
        // console.log(valueR)
        this.setState({
            valueR
        })
    }

    //添加信息
    addInfo = () => {
        this.setState({
            visible: 1
        })
    }

    handleCancel = () => {
        this.setState({
            visible: 0
        })
    }
    //OK
    handleOk = async () => {
        const { valueP, valueU, valueR } = this.state;
        const result = await reqAddInfo(valueP, valueU, valueR)
        if (result.status == 0) {
            console.log(111)
            message.success(result.message)

            this.setState({
                visible: 0
            },()=>this.getTeam())
        }



    }





    //删除信息
    deleteInfo = async (info) => {
        console.log(info)
        const _id = info._id
        const result = await reqDeteleInfo(_id)
        if (result.status == 0) {
            //    console.log(result.message)
            this.getTeam()
            message.success(result.message)

        }
    }
//获取所有成员
    getTeam = async () => {
        this.setState({

            flag: true,
        })
        const result = await reqTeam()
        this.setState({
            dataSource: result.result,
            flag: false,
        })


    }
    getRoleList = async () => {
        this.setState({

            flag: true,
        })
        const result = await reqRoleList()
        this.setState({
            roleList: result.result,
            flag: false,
        })

    }


    componentDidMount() {
        this.getTeam()
        this.getRoleList()
    }

    componentWillMount() {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',

            },
            {
                title: '密码',
                dataIndex: 'password',

            },
            {
                title: '身份',
                dataIndex: 'roleName',

            },
            {
                title: '操作',
                width: 200,
                render: (info) => {
                    return (
                        <span>

                            <span style={{ color: 'green', marginRight: 20 }} onClick={() => this.updateInfo(info)} >修改</span>
                            <span style={{ color: 'green' }} onClick={() => this.deleteInfo(info)} >删除</span>
                        </span>

                    )
                }

            },
        ];
    }

    render() {
        const { dataSource, roleList } = this.state;



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
                    title="添加用户"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            取消
            </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            确定
            </Button>,
                    ]}
                >
                    <span>用户名:</span>
                    <input type="textera" style={{ outline: 'none', width: '100%', marginBottom: 20 }} onChange={(e) => { this.getUsername(e.target.value) }} />
                    <span>密码:</span>
                    <input type="textera" style={{ outline: 'none', width: '100%', marginBottom: 20 }} onChange={(e) => { this.getPassword(e.target.value) }} />

                    <span style={{ marginRight: 20 }}>身份:</span>
                    <select name="" id="" value={this.state.valueR} onChange={(e) => { this.getRolename(e.target.value) }} >

                        {
                            roleList.map((item) => {
                                return (
                                    <option value={item.name} key={item.name}>{item.name}</option>
                                )
                            })
                        }
                    </select>
                </Modal>


                <Modal
                    visible={this.state.visible == 2}
                    title="添加用户"
                    
                    onOk={this.handleComfirm}
                    onCancel={this.handleNo}
                    footer={[
                        <Button key="back" onClick={this.handleNo}>
                            取消
            </Button>,
                        <Button key="submit" type="primary" onClick={this.handleComfirm}>
                            确定
            </Button>,
                    ]}
                  
                >
                    <span>用户名:</span>
                    <input type="textera" style={{ outline: 'none', width: '100%', marginBottom: 20 }} onChange={(e) => { this.getUsername(e.target.value) }} />
                    <span>密码:</span>
                    <input type="textera" style={{ outline: 'none', width: '100%', marginBottom: 20 }} onChange={(e) => { this.getPassword(e.target.value) }} />

                    <span style={{ marginRight: 20 }}>身份:</span>
                    <select name="" id="" value={this.state.valueR} onChange={(e) => { this.getRolename(e.target.value) }} >

                        {
                            roleList.map((item) => {
                                return (
                                    <option value={item.name} key={item.name}>{item.name}</option>
                                )
                            })
                        }
                    </select>
                   

                </Modal>

                <Button type='primary' style={{ float: 'left' }} onClick={this.addInfo}>添加</Button>
            </Card>
        )
    }
}
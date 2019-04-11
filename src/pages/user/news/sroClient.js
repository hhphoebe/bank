import React from 'react';
import { render } from 'react-dom';
import { Upload, Layout, Tabs, Switch, Modal, Button, Row, Col, Form, Input, Select, Icon, message } from 'antd';
import LoraBread from '../../../commons/breadcrumb';
import BasicTable from 'Commons/table/basic';
import { UserList, UserAdd, UserItem, UserDelete  } from 'Api/users';

const { Content } = Layout;

export default class StoClient extends React.Component {
    toAdd = () => {
        this.setState({ add: true })
    }
    toEdit = (item, type) => {
        if(type==='one') {
            this.setState({
                edit: true
            })
        } else {
            this.setState({
                edit: true
            })
        }
    }
    state = {
        breads: [
            {
                href: 'lost',
                text: '客户分析'
            }
        ],
        title: '存款用户',
        type: 'one',
        oneTable: {
            id: 'one',
            rowKey: 'id',
            columns: [
                {
                    title: '账号',
                    dataIndex: 'loginName',
                    key: 'loginName'
                },
                {
                    title: '创建时间',
                    dataIndex: 'gmtCreate',
                    key: 'gmtCreate'
                },
                {
                    title: '登录IP',
                    dataIndex: 'lastIp',
                    key: 'lastIp'
                },
                {
                    title: '登录时间',
                    dataIndex: 'lastTime',
                    key: 'lastTime'
                },
                {
                    title: '操作',
                    dataIndex: 'Operating',
                    key: 'Operating',
                    render: (a, item, index) => {
                        return (
                            <div className="action-list" key={item.loginName + 'opara' + index}>
                                <a href="javascript:;" onClick={this.toEdit.bind(this, item,'one')}>编辑</a>
                                <a href="javascript:;" >删除</a>
                            </div>
                        )
                    }
                }
            ],
            getData: UserList,
            showButtons: true,
            buttonSettings: [
                {
                    text: '添加',
                    type: 'primary',
                    onClick: this.toAdd
                },
            ],
            search: "",
            searchPlaceholder: '搜索',
            history: this.props.history,
            page: 1,
            pageSize: 5,
        },

        twoTable: {
            id: 'two',
            rowKey: 'id',
            columns: [
                {
                    title: '账号',
                    dataIndex: 'loginName',
                    key: 'loginName'
                },
                {
                    title: '创建时间',
                    dataIndex: 'gmtCreate',
                    key: 'gmtCreate'
                },
                {
                    title: '登录IP',
                    dataIndex: 'lastIp',
                    key: 'lastIp'
                },
                {
                    title: '登录时间',
                    dataIndex: 'lastTime',
                    key: 'lastTime'
                },
                {
                    title: '操作',
                    dataIndex: 'Operating',
                    key: 'Operating',
                    render: (a, item, index) => {
                        return (
                            <div className="action-list" key={item.loginName + 'opara' + index}>
                                <a href="javascript:;" onClick={this.toEdit.bind(this, item, 'two')}>编辑</a>
                                <a href="javascript:;" >删除</a>
                            </div>
                        )
                    }
                }
            ],
            getData: UserList,
            showButtons: true,
            buttonSettings: [
                {
                    text: '添加',
                    type: 'primary',
                    onClick: this.toAdd
                },
            ],
            search: "",
            searchPlaceholder: '搜索',
            history: this.props.history,
            page: 1,
            pageSize: 5,
        },
        add: false,
        edit: false,

    }
    handleTab =(type)=> {
        this.setState({ type });
    }
    handleOne = () => {

    }
    handleTwo = () => {

    }
    handleEditOne = () => {

    }
    handleEditTwo = () => {

    }
    handleCancel = () => {
        this.setState({ add: false, edit: false })
    }

    render() {
        const { breads, title, oneTable, type, twoTable, add, edit } = this.state;
        return (
            <Content>
                <div className="content">
                    <LoraBread breads={breads} title={title}/>
                    <div className="title">
                        {/*{type === 'true'? '信用评级':'评价'}*/}
                    </div>
                    <div className="content-detail">
                        <div className="dashboard">
                            <Tabs activeKey={type} onChange={this.handleTab}>
                                <Tabs.TabPane tab='客户业务管理' key='one'>
                                    <BasicTable ref="one" {...oneTable}/>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab='客户等级分类管理' key='two'>
                                    <BasicTable ref="two" {...twoTable}/>
                                </Tabs.TabPane>
                            </Tabs>
                        </div>
                    </div>
                    <Modal ref="addone"
                           centered
                           visible={add&&type === 'one'}
                           title='添加'
                           onOk={this.handleOne}
                           onCancel={this.handleCancel}
                           okText="确定"
                           cancelText="取消">

                    </Modal>
                    <Modal ref="addtwo"
                           centered
                           visible={add&&type === 'two'}
                           title='添加'
                           onOk={this.handleTwo}
                           onCancel={this.handleCancel}
                           okText="确定"
                           cancelText="取消">

                    </Modal>
                    <Modal ref="editone"
                           centered
                           visible={edit&&type === 'one'}
                           title='编辑'
                           onOk={this.handleEditOne}
                           onCancel={this.handleCancel}
                           okText="确定"
                           cancelText="取消">

                    </Modal>
                    <Modal ref="edittwo"
                           centered
                           visible={edit&&type === 'two'}
                           title='编辑'
                           onOk={this.handleEditTwo}
                           onCancel={this.handleCancel}
                           okText="确定"
                           cancelText="取消">

                    </Modal>
                </div>
            </Content>
        )
    }
}
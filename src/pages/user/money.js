import React from 'react';
import { render } from 'react-dom';
import { Layout, Modal } from 'antd';
import LoraBread from '../../commons/breadcrumb';
import { UserList, UserAdd, UserItem, UserDelete  } from 'Api/users';
import BasicTable from 'Commons/table/basic';

const { Content } = Layout;

export default class Money extends React.Component {
    toAdd = () => {
        this.setState({ addMoney: true })
    }
    toEdit = () => {
        this.setState({ editMoney: true })
    }
    handleCancel = () => {
        this.setState({ addMoney: false, editMoney: false })
    }
    state = {
        breads: [
            {
                href: 'evaluate',
                text: '客户评级'
            }
        ],
        title: '存款用户',
        MoneyTable: {
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
                                <a href="javascript:;" onClick={this.toEdit.bind(this, item)}>编辑</a>
                                <a href="javascript:;" onClick={this.toDelete.bind(this, item.id)}>删除</a>
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
        MoneyData: {},
        data: {},
        addMoney: false,
        editMoney: false,
    }
    addStorage = () => {

    }
    editStorage = () => {

    }
    toDelete = () => {

    }
    render() {
        const { breads, title, MoneyTable, MoneyData, addMoney, editMoney } = this.state;
        return (
            <Content>
                <div className="content">
                    <LoraBread breads={breads} title={title}/>
                    <div className="content-detail">
                        <BasicTable ref='MoneyData' {...MoneyTable}/>
                    </div>
                    <Modal visible={addMoney}
                           title="添加评级"
                           maskClosweable={false}
                           width={600}
                           centered={true}
                           onCancel={this.handleCancel}
                           onOk={this.addStorage}
                           destroyOnClose={true}
                           okText="确定"
                           cancelText="取消"
                    >

                    </Modal>
                    <Modal visible={editMoney}
                           title="编辑评级"
                           maskClosweable={false}
                           width={600}
                           centered={true}
                           onCancel={this.handleCancel}
                           onOk={this.editStorage}
                           destroyOnClose={true}
                           okText="确定"
                           cancelText="取消">

                    </Modal>
                </div>
            </Content>
        )
    }
}
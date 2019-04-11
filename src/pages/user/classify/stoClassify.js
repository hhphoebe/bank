import React from 'react';
import { render } from 'react-dom';
import { Layout, Modal } from 'antd';
import LoraBread from '../../../commons/breadcrumb';
import { UserList, UserAdd, UserItem, UserDelete  } from 'Api/users';
import BasicTable from 'Commons/table/basic';

const { Content } = Layout;

export default class StoClassify extends React.Component {
    toAdd = () => {
        this.setState({ addClassify: true })
    }
    toEdit = () => {
        this.setState({ editClassify: true })
    }
    handleCancel = () => {
        this.setState({ addClassify: false, editClassify: false })
    }
    state = {
        breads: [
            {
                href: 'classify',
                text: '客户分类'
            }
        ],
        title: '存款用户',
        StoClassifyTable: {
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
        stoClassifyData: {},
        data: {},
        addClassify: false,
        editClassify: false,
    }

    addStorage = () => {

    }
    editStorage = () => {

    }
    toDelete = () => {

    }



    render() {
        const { breads, title, addClassify, editClassify, StoClassifyTable } = this.state;
        return (
            <Content>
                <div className="content">
                    <LoraBread breads={breads} title={title}/>
                    <div className="content-detail">
                         <BasicTable ref='stoClassifyData' {...StoClassifyTable}/>
                    </div>
                    <Modal visible={addClassify}
                           title="添加信息"
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
                    <Modal visible={editClassify}
                           title="编辑信息"
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
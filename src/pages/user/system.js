import React from 'react';
import { render } from 'react-dom';
import { Layout, Table, Form, Input, Checkbox, Pagination, Button, Modal } from 'antd';
import LoraBread from 'Commons/breadcrumb/index';
import { UserList, UserAdd, UserItem, UserDelete  } from 'Api/users';
import TableUser from 'Commons/table/userTable';
import {domain} from 'Configs/utils';
import UserModal from './UserModal';

const { Content } = Layout;

export default class System extends React.Component {
    toAdd = () => {
        this.setState({ modalVisible: true, type: '添加'});
    }
    toEdit = (item) => {
        this.setState({ modalVisible: true, type: '编辑', data: item })
    }
    handleCancel =() => {
        this.setState({ modalVisible: false, })
    }

    state = {
        breads: [
            {
                href: '/system',
                text: '用户信息'
            }
        ],
        title: '用户信息',
        UserTable: {
            rowKey: 'id',
            columns: [
                {
                    title: '账号',
                    dataIndex: 'loginName',
                    key: 'loginName'
                },
                {
                    title: '用户角色',
                    dataIndex: 'role',
                    key: 'role',
                    width: 120,
                    render: (a) => {
                        return a === '1'?'超级管理员':'普通管理员'
                    }
                },
                {
                    title: '创建时间',
                    dataIndex: 'gmtCreate',
                    key: 'gmtCreate',
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
                                <a href="javascript:;" onClick={this.toEdit.bind(this, item)}>{item.role === '1'?'':'编辑'}</a>
                                <a href="javascript:;" onClick={this.toDelete.bind(this, item.id)}>{item.role === '1'?'':'删除'}</a>
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
        modalVisible: false,
        type: null,
        userData: {},
        data: {}
    }

    onSubmit = (values) => {
        const { type } = this.state;
        Modal.confirm({
            title: `确定要${type}?`,
            onOk: () => {
                if(type === '添加') {
                    UserAdd(this.props.history, values)
                        .then((res) => {
                            if(!!res) {
                                Modal.success({
                                    title: '添加成功！',
                                    onOk: () => {
                                        this.setState({ modalVisible: false });
                                        this.refs.userData.getData();
                                    }
                                })
                            }
                        }).catch(() => {
                            console.log('返回上级')
                    })
                } else {
                    const id = this.state.data.id;
                    UserItem(this.props.history, values, id)
                        .then((res) => {
                            if (!!res) {
                                Modal.success({
                                    title: '编辑成功！',
                                    onOk: () => {
                                        this.setState({modalVisible: false})
                                        this.refs.userData.getData();
                                    }
                                })
                            }
                        }).catch(() => {
                        console.log('返回');
                    })
                }
            }
        })
    }
    toDelete = (item) => {
        Modal.confirm({
            title: '确定要删除么!',
            onOk: () => {
                UserDelete(this.props.history, item)
                    .then((res) => {
                        if (!!res) {
                            Modal.success({
                                title: '删除成功！',
                                onOk: () => {
                                    this.refs.userData.getData();
                                }
                            });
                        }else {
                            Modal.error({
                                title: '删除失败！',
                            })
                        }
                    }) .catch(() => {
                    console.log('catch back');
                })
            }
        })
    }

    render() {
        const { breads, title, modalVisible, type, data } = this.state;

        return (
            <Content>
                <div className="content">
                    <LoraBread breads={breads} title={title}/>
                    <div className="content-detail">
                        <TableUser ref="userData" {...this.state.UserTable} />
                    </div>
                    {modalVisible &&
                        <UserModal
                            visible={modalVisible}
                            title={type === '添加' ? '添加信息': '编辑信息'}
                            maskClosable={false}
                            width={600}
                            centered={true}
                            okText="确定"
                            cancelText="取消"
                            onCancel={this.handleCancel}
                            onOk={this.onSubmit}
                            type={type}
                            record={type === '添加' ? {} : data}

                        />
                    }
                </div>
            </Content>
        )
    }
}





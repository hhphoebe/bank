import React from 'react';
import { render } from 'react-dom';
import { Layout, Table, Form, Input, Checkbox, Pagination, Button, Modal } from 'antd';
import LoraBread from 'Commons/breadcrumb/index';
import { UserList, UserAdd, UserItem, UserDelete  } from 'Api/users';
import TableUser from 'Commons/table/userTable';
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
                    title: 'loginName',
                    dataIndex: 'loginName',
                    key: 'loginName'
                },
                {
                    title: 'gmtCreate',
                    dataIndex: 'gmtCreate',
                    key: 'gmtCreate'
                },
                {
                    title: 'lastIp',
                    dataIndex: 'lastIp',
                    key: 'lastIp'
                },
                {
                    title: 'lastTime',
                    dataIndex: 'lastTime',
                    key: 'lastTime'
                },
                {
                    title: 'Operating',
                    dataIndex: 'Operating',
                    key: 'Operating',
                    render: (a, item, index) => {
                        return (
                            <div className="action-list" key={item.loginName + 'opara' + index}>
                                <a href="javascript:;" onClick={this.toEdit.bind(this, item)}>Edit</a>
                                <a href="javascript:;" onClick={this.toDelete.bind(this, item.id)}>Delete</a>
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
            searchPlaceholder: 'LoginName',
            history: this.props.history,
            page: 1,
            pageSize: 10,
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
                            } else {
                                Modal.error({
                                    title: '添加失败'
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
                                    title: '添加成功！',
                                    onOk: () => {
                                        this.setState({modalVisible: false})
                                        this.refs.userData.getData();
                                    }
                                })
                            } else {
                                Modal.error({
                                    title: '添加失败！',
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
        const { breads, title, modalVisible, type } = this.state;

        return (
            <Content>
                <div className="content">
                    <LoraBread breads={breads} title={title}/>
                    <div className="content-detail">
                        <TableUser ref="userData" {...this.state.UserTable}/>
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





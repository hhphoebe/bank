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
        this.setState({ modalVisible: true, type: 'add'});
    }
    handleCancel =() => {
        this.setState({ modalVisible: false})
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
            rowkey: 'id',
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
                                <a href="javascript:;">Edit</a>
                                <a href="javascript:;">Delete</a>
                            </div>
                        )
                    }
                }
            ],
            getData: UserList,
            showButtons: true,
            buttonSettings: [
                {
                    text: 'Add',
                    type: 'primary',
                    onClick: this.toAdd
                },
            ],
            showSearch: false,
            history: this.props.history,
            page: 1,
            pageSize: 10,
        },
        modalVisible: false,
        type: null
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
                            title={type === 'add' ? 'Add user': 'Edit user'}
                            maskClosable={false}
                            width={600}
                            centered={true}
                            okText="Save"
                            cancelText="Cancel"
                            onCancel={this.handleCancel}
                            onOk={this.onSubmit}
                            type={type}
                            record={type === 'add' ? {} : data}

                        />
                    }
                </div>
            </Content>
        )
    }
}





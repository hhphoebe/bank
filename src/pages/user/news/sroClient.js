import React from 'react';
import { render } from 'react-dom';
import { Layout, Table, Form, Input, Checkbox, Pagination, Button, Modal, Upload, Icon} from 'antd';
import LoraBread from '../../../commons/breadcrumb';
import { UserList, UserAdd, UserItem, UserDelete  } from 'Api/users';
import BasicTable from 'Commons/table/basic';
import {domain} from 'Configs/utils';

const { Content } = Layout;
const { TextArea } = Input;

 class StoNews extends React.Component {
    toAdd = ()  => {
        this.setState({ addNews: true })
    }
    toEdit = () => {
        this.setState({ editNews: true })
    }
    state = {
        breads: [
            {
                href: 'news',
                text: '客户信息'
            }
        ],
        title: '存款用户',
        StoNewsTable: {
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
        stoNewsData: {},
        data: {},
        addNews: false,
        editNews: false,
    }
    addStorage = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if(!err) {
                Modal.confirm({
                    title: "确定添加吗？",
                    onOk: () => {
                        UserAdd(this.props.history, values)
                            .then((res) => {
                                if(!!res) {
                                    Modal.success({
                                        title: '添加成功！',
                                        onOk: () => {
                                            this.setState({ addNews:false }),
                                                this.refs.stoNewsData.getData();
                                        }
                                    });
                                } else {
                                    Modal.error({
                                        title: '添加失败！'
                                    })
                                }
                            }).catch(() => {
                            console.log('catch back')
                        })
                    }
                })
            }
        })

    }
     editStorage = (item) => {

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
                                     this.refs.stoNewsData.getData();
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
    handleCancel = () => {
        this.setState({ addNews: false, editNews: false })
    }
    render() {
        const { breads, title,addNews, editNews  } = this.state;
        const { getFieldDecorator } = this.props.form;
        const uploadProps = {};
        const layout = {
            labelCol: {
                xs: { span: 16 },
                sm: { span: 5 }
            },
            wrapperCol: {
                xs: {span: 16},
                sm: {span: 19}
            }
        }
        return (
            <Content>
                <div className="content">
                    <LoraBread breads={breads} title={title}/>
                    <div className="content-detail">
                        <BasicTable ref='stoNewsData' {...this.state.StoNewsTable}/>
                    </div>
                    <Modal visible={addNews}
                           title="添加信息"
                           maskClosweable={false}
                           width={600}
                           centered={true}
                           onCancel={this.handleCancel}
                           onOk={this.addStorage}
                           destroyOnClose={true}
                           okText="确定"
                           cancelText="取消">
                        <Form.Item label="添加"
                                   {...layout}>
                            {getFieldDecorator('fileList', {
                                rules: [
                                    {
                                        required: true, message: '请上传!'
                                    },
                                ]
                            })(
                                <Upload {...uploadProps}>
                                    <Button>
                                        <Icon type="upload"/>
                                       请上传
                                    </Button>
                                </Upload>
                            )}
                            <span className="Audio-pag">支持文本文件</span>
                        </Form.Item>
                    </Modal>
                    <Modal visible={editNews}
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

export default Form.create()(StoNews)
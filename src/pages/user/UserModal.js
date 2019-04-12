import React from 'react'
import { Modal, Form, Input } from 'antd';

const UserModal = ({ form, type, record, onOk, ...restProps }) => {
    const { getFieldDecorator } = form;
    const layout = {
        labelCol: {
            xs: { span: 16 },
            sm: { span: 5 }
        },
        wrapperCol: {
            xs: { span: 16 },
            sm: { span: 19 }
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if(!err) {
                delete values.confirm;
                onOk(values);
            }
        })
    }

    return (
        <Modal
            {...restProps}
            maskClosable={false}
            onOk={handleSubmit}
        >
            <Form>
                <Form.Item {...layout}
                           label={(<span>loginName</span>)}>
                    {getFieldDecorator('loginName', {
                        initialValue: record && record.loginName,
                        rules: [
                            {
                                required: type === '添加', message: '请输入用户名!'
                            },
                        ],
                    })(
                        <Input placeholder="用户名" />
                    )}
                </Form.Item>
                <Form.Item {...layout}
                           label={(<span >password</span>)}>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true, message: '请输入密码！'
                            },
                        ],
                    })(
                        <Input  type="password" placeholder="密码"/>
                    )}
                </Form.Item>
                <Form.Item {...layout}  style={{display:'none'}}
                           label={(<span>id</span>)}>
                    {getFieldDecorator('id', {
                        initialValue: record.id
                    })(
                        <Input/>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Form.create()(UserModal);

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
    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    const validateToNextPassword = (rule, value, callback) => {
        if (value) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

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
                           label={(<span>username</span>)}>
                    {getFieldDecorator('username', {
                        initialValue: record && record.username,
                        rules: [
                            {
                                required: type === 'add', message: '请输入用户名!'
                            },
                        ],
                    })(
                        <Input placeholder="用户名" readOnly={type === 'add'?false:true}/>
                    )}
                </Form.Item>
                <Form.Item {...layout}
                           label={(<span >password</span>)}>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true, message: '请输入密码！'
                            },
                            {
                                validator: validateToNextPassword
                            }
                        ],
                    })(
                        <Input  type="password" placeholder="密码"/>
                    )}
                </Form.Item>
                <Form.Item {...layout}
                           label={(<span> ConfirmPass</span>)}>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true, message: '请确认密码!'
                            },
                            {
                                validator: compareToFirstPassword
                            }
                        ],
                    })(
                        <Input type="password" placeholder="确认密码"/>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Form.create()(UserModal);

/**
 * FileName: login
 * Auth: Linn
 * Created at: 2018/7/31
 * Description:
 */
import React from 'react';
import { render } from 'react-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { login } from 'Api/user';
import md5 from 'js-md5';

class LoginForm extends React.Component {

	state = {
		loading: false,
	}

	handleSubmit =(e)=> {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				// console.log('values',values)
				this.setState({ loading: true });
				let req = {...values, password: md5(values.password)};
				// console.log("req",req);
				login(this.props.history, req)
					.then((res)=> {
						this.setState({ loading: false });
						if (!!res) {
							console.log('res', res);
							sessionStorage.setItem('token', res.data.token);
							console.log('token',res.data.token);
							sessionStorage.setItem(' loginName', req.loginName);
                            this.props.history.push('/dashboard')
						}
					}).catch(()=>{this.setState({ loading: false });})
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="login-wrap">
				<div className="login-right">
					<div className="login-logo bank-login ">
                        <span className="bank-login">XXXXXXXXXXX</span>
					</div>
					<div className="login-form">
						<Form onSubmit={this.handleSubmit}>
							<Form.Item
								hasFeedback={true}>
								{getFieldDecorator('loginName', {
									rules: [
										{ required: true, message: '请输入账号!' },
									],
								})(
									<Input size="large" prefix={<Icon type="user" />} placeholder="账号" />
								)}
							</Form.Item>
							<Form.Item
								hasFeedback={true}>
								{getFieldDecorator('password', {
									rules: [
										{ required: true, message: '请输入密码!'},
									],
								})(
									<Input size="large" prefix={<Icon type="lock" />} type="password" placeholder="密码"
									/>
								)}
							</Form.Item>
							<Form.Item style={{marginTop: '50px'}}>
								<Button type="primary" size="large"
										loading={this.state.loading}
										id={'login'}
										style={{width: '100%'}}
                                        htmlType="submit">
									登录
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
				<div className="foot">
					<div>
						<span>xxxxxxxx</span>
					</div>
					<div>
						<span>Bank customer information management system</span>
					</div>
				</div>
			</div>
		)
	}
}

const Login = Form.create({})(LoginForm);
export default Login;
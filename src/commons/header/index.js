import React from 'react';
import { render } from 'react-dom';
import {
	Link,
	NavLink,
	Switch,
	Redirect
} from 'react-router-dom';
import $ from 'jquery';
import { Layout, Menu, Icon, Modal, notification,
	Button, Form, Input, Popconfirm, Select } from 'antd';
import { domain } from 'Configs/utils';
import { edit } from 'Api/user';
import { queryDevice } from 'Api/dashboard';

const { Header } = Layout;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
const InputGroup = Input.Group;

export default class UserHeader extends React.Component {

	componentWillUnmount() {
		sessionStorage.setItem('close', 'close');
	}

	handleClick =(e)=> {
		this.setState({active2:'123'});
		if (e.item.props.name === 'out') {
			sessionStorage.clear();
			this.props.history.push('/login');
		}
	}

	render() {
		return (
			<Header className="header" style={{ padding: 0 }}>
				<div id="header-right" className="header-right" style={{ marginRight: '50px' }}>
					<Menu
						mode="horizontal"
						selectedKeys={['123']}
						onClick={this.handleClick}
						className="header-user"
					>
						<SubMenu title={<span><Icon type="user" />{sessionStorage.getItem('name')}</span>}>
							<Menu.Item name="out">退出</Menu.Item>
						</SubMenu>
					</Menu>
				</div>
			</Header>
		)
	}
}
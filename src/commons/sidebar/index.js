import React from 'react';
import { render } from 'react-dom';
import { Menu, Icon, Layout, Button } from 'antd';
const { Sider } = Layout;

export default class Sidebar extends React.Component {

	static defaultProps = {
		menus: [
			{
				href: '/dashboard',
				text: '首页',
			},
			{
				href: '/user/news',
				text: '客户信息',
				children: [
					{
						href: '/news/stoClient',
						text: '存储用户'
					},
					{
						href: '/news/loClient',
						text: '贷款用户'
					}
				]
			},
            {
                href: '/user/classify',
                text: '客户分类',
                children: [
                    {
                        href: '/classify/stoclassify',
                        text: '存储用户'
                    },
                    {
                        href: '/classify/loclassify',
                        text: '贷款用户'
                    },
                ]
            },
			{
				href: '/user/evaluate',
				text: '评价分析',
                children: [
                    {
                        href: '/evaluate/stoClient',
                        text: '存储用户'
                    },
                    {
                        href: '/evaluate/loClient',
                        text: '贷款用户'
                    },
                ]
			},
            {
                href: '/user/count',
                text: '客户统计',
                children: [
                    {
                        href: '/count/stoClient',
                        text: '存储用户'
                    },
                    {
                        href: '/count/loClient',
                        text: '贷款用户'
                    },
				]
            },
            {
                href: '/money',
                text: '客户理财'
            },
            {
                href: '/user/lost',
                text: '客户流失',
                children: [
                    {
                        href: '/lost/stoLost',
                        text: '存储用户'
                    },
                    {
                        href: '/lost/loLost',
                        text: '贷款用户'
                    },
                    {
                        href: '/lost/moPro',
                        text: '理财产品客户'
                    }
                ]
            },
			{
				href: '/system',
				text: '用户信息'
			}
		],
	}

	state = {
		active: this.props.history && ('/'+this.props.history.location.pathname.split('/')[1]),
	}

	getMenus =()=> {
		return this.props.menus.map((m)=> {
			return (
				!m.children ?
                    <Menu.Item key={m.href}>
                        <span>{m.text}</span>
                    </Menu.Item> :
                    <Menu.SubMenu key={m.href} title={<span>{m.text}</span>}>
                        {m.children.map((item) => {
                            return (
                                <Menu.Item key={item.href}>{item.text}</Menu.Item>
                            )
                        })}
                    </Menu.SubMenu>
			);
		});
	}

	handleMenu =(e)=> {
		this.setState({ active: e.key });
		this.props.history.push(e.key);
	}

	render() {
		const menus = this.getMenus();
		return (
			<Sider className="sider" width="256">
				<div className="logo">xxxx</div>
				<Menu
					mode="inline"
					theme="dark"
					onClick={this.handleMenu}
					defaultSelectedKeys={[this.state.active]}
					style={{ height: '100%' }}
				>
					{
						menus
					}
				</Menu>
			</Sider>
		)
	}
}
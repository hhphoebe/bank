import React from 'react';
import { render } from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Link,
	NavLink,
	Switch,
	Redirect
} from 'react-router-dom';
import { Layout } from 'antd';
import UserHeader from 'Commons/header/index';
import Sidebar from 'Commons/sidebar/index';
import UserFooter from 'Commons/footer/index';

import Login from 'Pages/login';
import Dashboard from 'Pages/user/dashboard';

import LoanNews from 'Pages/user/news/loClient';
import StoNews from 'Pages/user/news/sroClient';

import LoanClassify from 'Page/user/loclassify';
import StoClassify from 'Page/user/stoclassify';


import LoanEva from 'Pages/user/evaluate/loClient';
import StoEva from 'Pages/user/evaluate/stoClient';

import LoanCount from 'Pages/user/count/loClient';
import StoCount from 'Pages/user/count/stoClient';

import LoanApply from 'Pages/user/apply/loClient';
import StoApply from 'Pages/user/apply/stoClient';

import Analysis from 'Pages/user/analysis';
import System from 'Pages/user/system';

export default class AppRoute extends React.Component {

	render() {
		return (
			<Router>
				<div>
					<Switch>
						<Route exact path='/login' component={Login} />
						<Route path="/" component={User} />
					</Switch>
				</div>
			</Router>
		)
	}
}

class User extends React.Component {

	render() {
		let token = sessionStorage.getItem('token');
        // console.log('token1', token);
		if (!token) {
			return <Redirect to="/login" />
		}
		return (
			<div className="wrapper">
				<Layout>
					<Sidebar history={this.props.history}>
					</Sidebar>
					<Layout>
						<UserHeader history={this.props.history}/>
						<Switch>
                            <Route exact path='/dashboard' component={Dashboard} />
							<Route exact path='/news/loClient' component={LoanNews} />
							<Route exact path='/news/stoClient' component={StoNews} />
							<Route exact path='/classify/loclassify' component={LoanClassify} />
							<Route exact path='/classify/stoclassify' component={StoClassify} />
							<Route exact path='/evaluate/loClient' component={LoanEva} />
							<Route exact path='/evaluate/stoClient' component={StoEva} />
							<Route exact path='/count/loClient' component={LoanCount} />
							<Route exact path='/count/stoClient' component={StoCount} />
							<Route exact path='/apply/loClient' component={LoanApply} />
							<Route exact path='/apply/stoClient' component={StoApply} />
							<Route exact path='/analysis' component={Analysis} />
							<Route exact path='/system' component={System} />
						</Switch>
						<UserFooter />
					</Layout>
				</Layout>
			</div>
		)
	}
}

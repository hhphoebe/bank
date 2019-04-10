import React from 'react';
import { render } from 'react-dom';
import { Layout, Row, Col, Icon, Select, Tabs, Badge, message, Modal } from 'antd';

const { Content } = Layout;

export default class Dashboard extends React.Component {

	render() {
		return (
			<Content style={{background:'transparent'}}>
				<div className="project-no">
					<img src="../static/images/bg-2.png" className="no-content-image"/>
				</div>
			</Content>
		)
	}
}
/**
 * FileName: index
 * Auth: Linn
 * Created at: 2018/8/8
 * Description:
 */

import React from 'react';
import { render } from 'react-dom';
import { Layout } from 'antd';

export default class UserFooter extends React.Component {

	render() {
		return (
			<Layout.Footer className="lora-footer">
				<div className="footerText">
					<a>xxx</a>
				</div>
				<div className="footerText">Bank customer information management system</div>
			</Layout.Footer>
		)
	}
}
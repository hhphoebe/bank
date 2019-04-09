import React from 'react';
import { render } from 'react-dom';
import { Layout } from 'antd';
const { Content } = Layout;


export default class Four extends React.Component {

    render() {
        return (
            <Content>
                <div className="project-no">
                    <img src="../static/images/404.jpg" className="no-content-image"/>
                </div>
            </Content>
        )
    }
}
import React from 'react';
import { render } from 'react-dom';
import { Layout, Table, Form, Input, Checkbox, Pagination, Button, Modal } from 'antd';
import LoraBread from '../../../commons/breadcrumb';


const { Content } = Layout;

export default class StoNews extends React.Component {
    state = {
        breads: [
            {
                href: 'news',
                text: '客户信息'
            }
        ],
        title: '存款用户',
    }
    render() {
        const { breads, title } = this.state;
        return (
            <Content>
                <div className="content">
                    <LoraBread breads={breads} title={title}/>
                </div>
            </Content>
        )
    }
}
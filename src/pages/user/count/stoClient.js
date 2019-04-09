import React from 'react';
import { render } from 'react-dom';
import { Layout, Table, Form, Input, Checkbox, Pagination, Button, Modal } from 'antd';
import LoraBread from "../../../commons/breadcrumb";


const { Content } = Layout;

export default class StoCount extends React.Component {
    state = {
        breads: [
            {
                href: 'count',
                text: '统计'
            },
        ],
        title: '存储用户统计',

    }
    render() {
        const { title, breads } = this.state;
        return (
            <Content>
                <div className="content">
                    <LoraBread breads={breads} title={title}/>
                </div>
            </Content>
        )
    }
}
import React from 'react';
import { render } from 'react-dom';
import { Layout} from 'antd';
import LoraBread from '../../../commons/breadcrumb';

const { Content } = Layout;

export default class StoEva extends React.Component {
    state = {
        breads: [
            {
                href: 'evaluate',
                text: '客户评价'
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
import React from 'react';
import { render } from 'react-dom';
import { Layout} from 'antd';
import LoraBread from '../../../commons/breadcrumb';

const { Content } = Layout;

export default class MoPro extends React.Component {
    state = {
        breads: [
            {
                href: 'lost',
                text: '客户分析'
            }
        ],
        title: '贷款用户',
    }

    render() {
        const {breads, title} = this.state;
        return (
            <Content>
                <div className="content">
                    <LoraBread breads={breads} title={title}/>
                </div>
            </Content>
        )
    }
}

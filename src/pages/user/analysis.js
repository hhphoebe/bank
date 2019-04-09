import React from 'react';
import { render } from 'react-dom';
import { Layout, Table, Form, Input,  Pagination, Button, Modal, Select, Upload, Icon} from 'antd';
import LoraBread from 'Commons/breadcrumb';
import TableUser from 'Commons/table/userTable';

const { Content } = Layout;

export default class Analysis extends React.Component {

     state = {
         breads: [
             {
                 href: 'news',
                 text: '客户分析'
             }
         ],
         title: '客户分析',
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





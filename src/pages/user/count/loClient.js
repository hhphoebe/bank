import React from 'react';
import { render } from 'react-dom';
import { Layout, Table, Form, Modal } from 'antd'
import LoraBread from "../../../commons/breadcrumb";
import BasicTable from 'Commons/table/basic';
import { UserList } from 'Api/users';

const { Content } = Layout;

export default class LoanCount extends React.Component {

    toAdd = () => {
        this.setState({ addCount: true })
    }
    handleCancel  =() => {
        this.setState({ addCount: false })
    }


    state = {
        breads: [
            {
                href: 'count',
                text: '统计'
            }
        ],
        title: '取款用户统计',
        CountTable: {
            rowKey: 'id',
            columns: [
                {
                    title: 'loginName',
                    dataIndex: 'loginName',
                    key: 'loginName'
                },
                {
                    title: 'gmtCreate',
                    dataIndex: 'gmtCreate',
                    key: 'gmtCreate'
                },
                {
                    title: 'lastTime',
                    dataIndex: 'lastTime',
                    key: 'lastTime'
                }
            ],
            getData: UserList,
            showButtons: true,
            buttonSettings: [
                {
                    text: '添加',
                    type: 'primary',
                    onClick: this.toAdd
                },
            ],
            searchFields: 'loginName: like',
            searchPlaceholder: 'loginName',
            history: this.props.history,
            page: 1,
            pageSize: 10,
        },
        addCount: false
    }
    render() {
        const { title, breads, CountTable, addCount  } = this.state;
           return (
               <Content>
                   <div className="content">
                       <LoraBread breads={breads} title={title}/>
                       <div className="content-detail">
                           <BasicTable ref="userData" {...CountTable}/>
                       </div>
                       <Modal visible={addCount}
                              title={'添加账户'}
                              maskClosable={false}
                              width={600}
                              centered={true}
                              onCancel={this.handleCancel}
                              onOk={this.add}
                              destroyOnClose={true}
                              okText="确定"
                              cancelText="取消">

                       </Modal>
                   </div>

               </Content>
           )
       }
}
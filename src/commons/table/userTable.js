import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { Table, Form, Input, Pagination, Button, Modal, Icon, InputNumber, Spin } from 'antd';

export default class TableUser extends React.Component {

    static defaultProps = {
        columns: [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            }
        ],
        dataSource: [],
        loading: false,
        pageSize: 5,
        page: 1,
        total: 0,
        req: {},
        getData: ()=>{},
        showSelect: false,
        selectedRowKeys: [],
        selectButtons: [],
        showSearch: true,
        searchValue: null,
        search: [],
        searchPlaceholder: '',
        showButtons: false,
        buttonSettings: [],
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, selectedRows });
    }

    state = {
        columns: this.props.columns,
        dataSource: this.props.dataSource,
        loading: this.props.loading,
        pageSize: this.props.pageSize,
        page: this.props.page,
        total: this.props.total,
        req: this.props.req,
        getData: this.props.getData,
        showSelect: this.props.showSelect,
        selectedRowKeys: this.props.selectedRowKeys,
        selectButtons: this.props.selectButtons,
        onSelectChange: this.onSelectChange,
        showSearch: this.props.showSearch,
        searchValue: this.props.searchValue,
        search: this.props.search,
        searchPlaceholder: this.props.searchPlaceholder,
        showButtons: this.props.showButtons,
        buttonSettings: this.props.buttonSettings,
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.reqChange) {
            let state = this.state;
            state.req = nextProps.req;
            this.setState({ ...state });
            this.getData(undefined, undefined, undefined, undefined, state.req);
        }
    }

    getData =(page=this.state.page, pageSize=this.state.pageSize,
              searchValue=this.state.searchValue,
              search=this.state.search, req=this.state.req,
              )=> {
        this.setState({ loading: true, page, pageSize });
        req = {...req, page, pageSize};
            if (!!this.state.showSearch&&!!searchValue) {
                req = {...req, search: searchValue};
            }
        this.props.getData(this.props.history, req)
            .then((res)=> {
                if (!!res) {
                    this.setState({
                        total: res.total,
                        dataSource: res.records,
                        loading: false,
                    });
                } else {
                    Modal.error({
                        title: !!res?(res==='timeout'?'请求超时！':res.msg):'请求失败！',
                        onOk: ()=> {
                            this.setState({
                                loading: false
                            });
                        }
                    })
                }
            }).catch((res)=> {
            if (res === 'timeout') {
                Modal.error({
                    title: '请求超时!',
                    onOk: ()=> {
                        this.setState({ loading: false });
                    }
                });
            } else {
                switch (res.status) {
                    case 401:
                        Modal.confirm({
                            title: '无权限或者登录已过期！',
                            content: '请确认登录或关闭会话!',
                            onOk: ()=> {
                                this.props.history.push('/login');
                            },
                            onCancel: ()=> {
                                this.setState({ loading: false });
                            }
                        });
                        break;
                    case 403:
                        Modal.error({
                            title: '禁止访问!',
                            onOk: ()=> {
                                this.setState({ loading: false });
                            },
                        });
                        break;
                    case 404:
                        Modal.error({
                            title: '未找到资源!',
                            onOk: ()=> {
                                this.setState({ loading: false });
                            },
                        });
                        break;
                    default:
                        Modal.error({
                            title: '请求失败',
                            onOk: ()=> {
                                this.setState({ loading: false });
                            },
                        });
                        break;
                }
            }
        });
    }

    componentDidMount() {
        this.getData();
    }

    handlePage =(page, pageSize)=> {
        this.getData(page, pageSize);
    }

    handleSizeChange =(page, pageSize)=> {
        this.getData(page, pageSize);
    }

    handleSearch =(value)=> {
        this.setState({ searchValue: value });
        this.getData(undefined, undefined, value);
    }
    render() {

        const { loading, selectedRowKeys } = this.state;
        return (
            <Spin tip="loading" spinning={loading}>
                <div className="basic-table" key={this.props.id||'basic'}>
                    <div style={{ marginBottom: '16px', height: '32px', marginTop: '24px',
                        display: `${(this.state.showSearch||this.state.showButtons)?'block':'none'}`}}>
                        <div className="button">
                            {
                                this.state.buttonSettings.map((b, index)=> {
                                    return (
                                        <Button key={b.text+index} {...b}>{b.text}</Button>
                                    )
                                })
                            }
                        </div>
                        <div className="search clearfix">
                            {
                                this.props.searchLable?
                                    <span style={{paddingRight: 4}}>{this.props.searchLable}</span>:null
                            }
                            <Input.Search placeholder={this.state.searchPlaceholder}
                                          style={{width: this.props.searchWidth||'200px'}}
                                          onSearch={(value)=>this.handleSearch(value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="actions">
                            {
                                this.state.selectButtons.map((b, index)=> {
                                    return (
                                        <a href="javascript:;" key={b.text+index}
                                           style={{ paddingRight: 17 }}
                                           onClick={b.handleClick.bind(this, this.state.selectedRowKeys, this.state.selectedRows)}>
                                            {b.text}
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Table className="clearfix" columns={this.state.columns}
                           rowKey={this.props.rowKey||'id'}
                           pagination={{size: 'small', showSizeChanger: true,
                               showQuickJumper: true, onShowSizeChange: this.handleSizeChange,
                               onChange: this.handlePage, pageSizeOptions: ['5','10','15','20'],
                               defaultPageSize: 5, defaultCurrent: 1,
                               total: this.state.total,
                           }}
                           dataSource={this.state.dataSource} />
                </div>
                {
                    !loading&&Number(this.state.dataSource).length<1?
                        <div className="no-data">
                            <div className="img">
                            </div>
                        </div>
                        :null
                }
            </Spin>
        )
    }
}
import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { Table, Form, Input, Pagination, Button, Modal, Icon, InputNumber, Spin } from 'antd';

export default class BasicTable extends React.Component {

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
		searchFields: [],
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
		reqChange: false,
		getData: this.props.getData,
		showSelect: this.props.showSelect,
		selectedRowKeys: this.props.selectedRowKeys,
		selectButtons: this.props.selectButtons,
		onSelectChange: this.onSelectChange,
		showSearch: this.props.showSearch,
		searchValue: this.props.searchValue,
		searchFields: this.props.searchFields,
		searchPlaceholder: this.props.searchPlaceholder,
		showButtons: this.props.showButtons,
		buttonSettings: this.props.buttonSettings,
		fuzzy: this.props.fuzzy||true,
	}

	componentWillReceiveProps(nextProps) {
		let state = this.state;
		state.buttonSettings = nextProps.buttonSettings;
		if (this.props.reqChange) {
			state.req = nextProps.req;
			this.setState({ ...state });
			this.getData(undefined, undefined, undefined, undefined, state.req);
		}
	}

	getData =(page=this.state.page, pageSize=this.state.pageSize,
			  searchValue=this.state.searchValue,
			  searchFields=this.state.searchFields, req=this.state.req, fuzzy=this.state.fuzzy)=> {
		this.setState({ loading: true, searchFields });
		req = {...req, page, pageSize};
		if (fuzzy) {
			if (this.state.showSearch) {
				if (!!searchValue) {
                    req = {...req, search: searchValue, searchFields};
				} else {
					let l = searchFields.split(',');
					let e = '';
					l.map((li)=> {
						if (li.indexOf('true')>-1||li.indexOf(false)>-1) {
							e = e + li;
						}
					})
					req.searchFields = e;
				}

			}
		} else {
			let searchKey = this.props.searchKey;
			req[searchKey] = searchValue;
		}
		this.props.getData(this.props.history, req)
			.then((res)=> {
				if (!!res) {
					this.setState({
						total: res.total,
						dataSource: res.list,
						loading: false,
					});
				} else {
					Modal.error({
						title: !!res?(res==='timeout'?'Request timeout':res.msg):'Error, please try again later',
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
						title: 'Request timeout',
						onOk: ()=> {
							this.setState({ loading: false });
						}
					});
				} else {
					switch (res.status) {
						case 401:
							Modal.confirm({
								title: 'No authority or token has expired',
								content: 'confirm to login or cancel to continue',
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
								title: 'Forbidden',
								onOk: ()=> {
									this.setState({ loading: false });
								},
							});
							break;
						case 404:
							Modal.error({
								title: 'Not found',
								onOk: ()=> {
									this.setState({ loading: false });
								},
							});
							break;
						default:
							Modal.error({
								title: 'Error, please try again later',
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

	handlePage =(page)=> {
		this.setState({ page });
		this.getData(page);
	}

	handleSizeChange =(page, pageSize)=> {
		this.setState({ pageSize, page });
		this.getData(page, pageSize);
	}

	handleSearch =(value)=> {
		this.setState({ searchValue: value });
		this.getData(undefined, undefined, value);
	}
    handleClear =()=> {
        this.setState({
            selectedRowKeys: [],
        })
    }

	render() {
		const { loading, selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		}
		return (
			<Spin tip="loading" spinning={this.state.loading}>
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
					<div style={{ marginBottom: '25px', height: '40px',
						display: `${this.state.selectedRowKeys.length>0?'block':'none'}`}}>
						<div className="tip">
							<Icon type="info-circle" style={{ color: 'rgba(24,144,255,1)'}} />
							<div className="text">
								Selected
								<span style={{ color: 'rgba(24,144,255,1)', paddingLeft: 5}}>
								{this.state.selectedRowKeys.length}
							</span>
								<a style={{paddingLeft: 8 }} onClick={this.handleClear}>Clear</a>
							</div>
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
					</div>
					<Table className="clearfix" columns={this.state.columns}
						   rowSelection={rowSelection} rowKey={this.props.rowKey||'id'}
						   rowClassName={!!this.props.rowClassName?this.props.rowClassName:()=>{}}
						   pagination={{size: 'small', showSizeChanger: true,
							   showQuickJumper: true, onShowSizeChange: this.handleSizeChange,
							   onChange: this.handlePage, pageSizeOptions: ['5','10','15','20'],
							   defaultPageSize: 5, defaultCurrent: this.state.page,
							   total: this.state.total,
						   }}
						   dataSource={this.state.dataSource} />
				</div>
				{
					!loading&&this.state.dataSource.length<1?
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
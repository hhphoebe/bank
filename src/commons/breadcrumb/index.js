/**
 * FileName: index
 * Auth: Linn
 * Created at: 2018/8/8
 * Description:
 */
import React from 'react';
import { render } from 'react-dom';
import { Layout, Breadcrumb, Badge, Icon, Popover } from 'antd';
import $ from 'jquery';

export default class LoraBread extends React.Component {

    state = {
        extra: this.props.extra||false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.extra) {
            this.setState({ extra: nextProps.extra });
        }
    }

    getStatus =()=> {
        let extra = this.state.extra||{};
        this.props.queryStatus(this.props.history, this.props.data)
            .then((res)=> {
                if (res) {
                    extra.text = res.status.online?'Online':'Offline';
                    this.setState(( extra ));

                }
            });
    }

    render() {
        let extra = this.state.extra;
        let title = this.props.title;
        let a, b, c, total;
        if (typeof title === 'object') {
            a = title[0];
            b = title.slice(1, 3);
            total = 'Total ' + (title.length - 1);
            c = title.slice(1, title.length);
            c = c.join(',');
        }
        return (
            <div className="bread">
                <Breadcrumb separator="/">
                    <Breadcrumb.Item style={{ paddingLeft: '32px' }} key={'/dashboard'} href={'/dashboard'}>
                        Home
                    </Breadcrumb.Item>
                    {
                        this.props.breads.map((b, index)=> {
                            if (index+1 === this.props.breads.length) {
                                return (
                                    <Breadcrumb.Item key={b.href}>
                                        {b.text}
                                    </Breadcrumb.Item>
                                )
                            }
                            return (
                                <Breadcrumb.Item key={b.href} href={b.href}>
                                    {b.text}
                                </Breadcrumb.Item>
                            )
                        })
                    }
                </Breadcrumb>
                <div className="current">
                    {
                        typeof title !== 'object'?
                            title:
                            <span>
								{`${a} ${b.join(',')}`}
                                {
                                    title.length < 4?
                                        null:
                                        <Popover placement="bottom" content={c} trigger="click">
                                            <a  style={{padding: '0 3px', color: 'rgba(0,0,0,0.85)'}} >...</a>
                                        </Popover>
                                }
                                <span style={{padding: '0 5px'}}>{total}</span>
							</span>

                    }
                    {
                        extra?
                            (
                                extra.text==='Offline'?
                                    <span style={{marginLeft: 10}}>
										<Badge count={'?'} style={{background: '#d9d9d9', cursor: 'pointer' }}
                                               onClick={this.getStatus}
                                               title="Offline, edit is not available , you can click to update status">
											<a href="javascript:;" style={{color: '#bfbfbf'}}>{extra.text}</a>
										</Badge>
									</span>
                                    :
                                    <span style={{marginLeft: 10}}>
										<Badge count={'?'} style={{background: '#1890ff', cursor: 'pointer'}}
                                               onClick={this.getStatus}
                                               title="Online, you can click to update status">
											<a href="javascript:;">{extra.text}</a>
										</Badge>
									</span>
                            )

                            :null
                    }
                    <div id="show" className="bread-show">
                        {`${c}`}
                    </div>
                </div>
            </div>
        )
    }
}
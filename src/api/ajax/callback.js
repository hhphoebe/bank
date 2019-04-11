import { ajax } from 'jquery';
import { domain } from 'Configs/utils';
import { Modal } from 'antd';

const callback =(history, url, type, data={}, auth=true, alert=true, extraUrl='?', noCode=false)=> {
	if (type === 'get' && Object.keys(data).length > 0) {
		let keys = Object.keys(data);
		keys.map((k, i)=> {
			if (keys.length === i+1) {
				extraUrl = extraUrl + k + '=' + data[k];
			} else {
				extraUrl = extraUrl + k + '=' + data[k] +'&'
			}
		});
        url = url + extraUrl;
	}
	let httpback = new Promise((resolve, reject)=> {
		ajax({
			type: type,
			url: domain + url,
			data: type.toLowerCase()==='get'?null:JSON.stringify(data),
			contentType: 'application/json',
			timeout: 5000,
			async: true,
			beforeSend: (xhr)=> {
				if (auth) {
					xhr.setRequestHeader(
						'Authorization', sessionStorage.getItem('token')
					);
				}
			},
			success: (res)=> {
				resolve(res);
			},
			complete: (xml, textStatus)=> {
				if (textStatus === 'timeout') {
					reject('timeout');
				}
			},
			error: (xml, textStatus)=> {
				reject(xml);
			}
		})
	});
	return httpback.then((res)=> {
		if (!!res) {
			if (noCode) {
				return res;
			}
			if (res.code === '8001') {
				return res;//!!res.data?res.data:'success';
			} else {
                    let title = res.msg || '报错啦, 请再试一次';
                    if (alert) {
                        Modal.error({
                            title: title,
                        });
                    }
				}
				return null;
		}
	}).catch((res)=> {
		console.log('catch', res);
		if (alert) {
			if (res === 'timeout') {
				Modal.error({
					title: '请求超时',
				});
			}
			// else if(code === '4001') {
             //        Modal.error({
             //            title: '权限不足！',
             //            content:'点击确定返回登录页面',
             //            onOk: () => {
             //                history.push('/login');
             //            }
             //        })
			// }
			else {
				switch (res.status) {
					case 401:
						if (auth) {
							Modal.error({
								title: '无权限或会话超时！',
								content: '请再次登录！',
								onOk: ()=> {
									sessionStorage.clear();
									history.push('/login');
								}
							});
						} else {
							Modal.error({
								title: '账号或密码不正确！',
								centered: true,
							});
						}
						break;
					case 403:
						Modal.error({
							title: '无权限',
                            onOk: ()=> {
                                history.push('/login');
                            }

						});
						break;
					case 400:
						Modal.error({
							title: '错误字段',
						});
						break;
					case 404:
						Modal.error({
							title: '未找到',
						});
						break;
					default:
						Modal.error({
							title: '报错啦, 点击返回首页',
							onOk: () => {
                                history.push('/login')
							}
						});
						break;
				}
			}
			return null;
		} else {
			return res;
		}
	});
}

export default callback;
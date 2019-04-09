/**
 * FileName: upload
 * Auth: Linn
 * Created at: 2018/8/23
 * Description:
 */
import { ajax } from 'jquery';
import { domain } from 'Configs/utils';
import { Modal } from 'antd';

const uploadBack =(history, url, type, data, file)=> {
	console.log('file', file);
	let formData = new FormData();
	formData.append('file', file);
	let keys = Object.keys(data);
	keys.map((k)=> {
		formData.append(k, data[k]);
	});
	let httpback = new Promise((resolve, reject)=> {
		ajax({
			type: type,
			url: domain + url,
			data: formData,
			contentType: false,
			processData: false,
			beforeSend: (xhr)=> {
				xhr.setRequestHeader(
					'Authorization', 'Bearer '+sessionStorage.getItem('token')
				);
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
			if (res.code === 8000) {
				return !!res.data?res.data:'success';
			} else {
				let title = res.msg || 'Request error';
				if (alert) {
					Modal.error({
						title: title,
					});
				}
				return null;
			}
		}
	}).catch((res)=> {
		if (alert) {
			if (res === 'timeout') {
				Modal.error({
					title: 'request timeout',
				});
			} else {
				switch (res.status) {
					case 401:
						Modal.error({
							title: 'No privileges or login has expired！',
							onOk: ()=> {
								sessionStorage.clear();
								history.push('/login');
							}
						});
						break;
					case 400:
						Modal.error({
							title: 'Request parameters are not valid',
						});
						break;
					case 403:
						Modal.error({
							title: 'No access',
						});
						break;
					case 404:
						Modal.error({
							title: 'No resources found',
						});
						break;
					default:
						Modal.error({
							title: 'The server has gone missing……',
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

export default uploadBack;
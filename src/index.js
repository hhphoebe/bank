/**
 * FileName: index
 * Auth: Linn
 * Created at: 2018/7/30
 * Description:
 */
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoute from './router/index';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';


ReactDOM.render(
	<LocaleProvider locale={enUS}>
		<AppRoute />
	</LocaleProvider>,
	document.getElementById('app')
);
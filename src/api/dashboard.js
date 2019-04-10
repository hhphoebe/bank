import callback from './ajax/callback';

const queryDevice = (history, data) => {
	return callback(history, 'api/v1/userinfo/'+data, 'get');
}

/*项目概况*/
const queryDashboard = (history, data) => {
    return callback(history, 'api/v1/users/survey', 'get', data);
}

const queryMap =(history, data)=> {
	return callback(history, 'api/v1/lorawan/gatewayList', 'get', data);
}

export {
	queryDevice, queryDashboard, queryMap,
}
import callback from './ajax/callback';

/**
 * 获取车辆列表
 */
const getVehicles = (history, data) => {
	return callback(history, 'api/v1/scooters', 'get', data )
}

/**
 * 获取单个车辆的信息
 */
const getVehicle = (history, data, alert=true) => {
	return callback(history, 'api/v1/scooter/voices/'+data.vcu, 'get', {}, true, alert)
}

/**
 * 获取全部音频
 */
const getAudios = (history, alert=true) => {
	return callback(history, 'api/v1/voices/by/type', 'get', {}, true, alert);
}

/**
 * 获取全部语音类型
 */
const getTypes = (history, alert=true)=> {
	return callback(history, 'api/v1/voice/types/all', 'get', {}, true, alert);
}

/**
 * 获取某个类型的全部音频
 */
const getAudioBytype = (history, type, alert=false)=> {
	return callback(history, 'api/v1/voice/type/'+type, 'get', {}, true, alert);
}

/**
 * 获取播放文件
 */
const getWav = (history, name, alert=false)=> {
	return callback(history, 'api/v1/voice/'+name, 'get', {}, true, alert, undefined, true);
}

/**
 * 电动车播放
 */
const playAudio = (history, data) => {
	return callback(history, 'api/v1/scooter/voice/play', 'put', data);
}

/**
 * 电动车语音设置
 */
const editVehicle = (history, data) => {
	return callback(history, 'api/v1/scooter/voice', 'put', data);
}


/**
 * 电动车语音启用禁用以及设置
 */
const setVehicle = (history, data) => {
	let vcu = data.vcu;
	delete data.vcu;
	return callback(history, 'api/v1/scooter/voice/set/'+vcu, 'put', data);
}


/**
 * 电动车语音启用禁用以及设置 批量
 */
const setVehicles = (history, data) => {
	return callback(history, 'api/v1/scooters/voices', 'put', data);
}

/**
 * 电动车语音启用禁用以及设置 所有
 */
const setAllVehicles = (history, data) => {
	return callback(history, 'api/v1/scooters/voice/online', 'put', data);
}

/**
 * 获取电动车状态
 */
const queryStatus = (history, data) => {
	return callback(history, 'api/v1/scooter/status/'+data.vcu, 'get');
}

export {
	getVehicles, getAudios, getTypes, getVehicle, getAudioBytype, getWav, playAudio, editVehicle,
	setVehicle, setVehicles, setAllVehicles,
	queryStatus
}


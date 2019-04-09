import callback from './ajax/callback';
import upload from './ajax/upload';
import { domain } from 'Configs/utils';
import uploadBack from './ajax/upload';

/**
 * 语音列表
 */
const voiceList = (history, data) => {
    return callback(history, `api/v1/voices`, 'get',data)
}

/**
 * 添加语音
 */
const voiceAdd = (history, data, file) => {
    return upload(history, `api/v1/voice`, 'POST', data, file)
}

/**
 * 删除语音
 */
const voiceDelete = (history, data) => {
   return callback(history, `api/v1/voice/${data}`, 'DELETE')
}


/**
 *获取语音类型列表
 **/

const voiceTypeList = (history, data) => {
    return callback(history, `api/v1/voice/types`, 'get', data)
}

/**
 *获取语音全部类型
 **/

const voiceTypeAllList = (history, data) => {
    return callback(history, `api/v1/voice/types/all`, 'get', data)
}


export {
    voiceList, voiceTypeList, voiceTypeAllList, voiceAdd, voiceDelete
}


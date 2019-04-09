import callback from './ajax/callback';
import uploadBack from './ajax/upload';
import { ajax } from 'jquery';
import { domain } from 'Configs/utils';

/**
 * 广告数据列表
 */
const getAdDatas = (history, data) => {
    return callback(history, 'api/v1/adverts', 'get', data );
}

/**
 * 添加广告数据
 */
const addAdvert = (history, data, file) => {
    return uploadBack(history, 'api/v1/advert', 'post', data, file);
}

/**
 * 编辑广告数据
 */
const editAdvert = (history, data, file) => {
    return uploadBack(history, `api/v1/advert/${data.advertId}`, 'PUT', data, file);
}

/*删除广告*/
const deleteAdvert = (history, data ) => {
    return callback(history, `api/v1/advert/${data}`, 'DELETE');
}

/*启用/禁用广告*/
const switchAdvert = (history, data ) => {
    console.log(data,'ssss')
    return callback(history, `api/v1/advert/setting/${data.advertId}`, 'PUT',data);
}

/**
 * 广告详情
 */
const getAdDetail = (history, data) => {
    return callback(history, `api/v1/advert/${data}`, 'get' );
}
/**
 * 广告详情图表
 */
const getAdChart = (history, data) => {
    return callback(history, `api/v1/advert/statis/total/${data}`, 'get' );
}
/**
 * 获取当天广告播放统计
 */
const getAdTodayChart = (history, data) => {
    return callback(history, `api/v1/advert/statis/today/${data}`, 'get' );
}
/**
 * 获取最近N天广告播放统计
 */
const getAvgChart = (history, data) => {
    return callback(history, `api/v1/advert/statis/avg/${data.advertId}?nDaysBefore=${data.day}`, 'get');
}
/**
 * 获取所有广告播放统计
 */
const getAllChart = (history, data) => {
    return callback(history, `api/v1/advert/statis/all/${data.advertId}?dateUnit=${data.dateUnit}`, 'get');
}



export {
    getAdDatas, deleteAdvert, addAdvert, editAdvert, switchAdvert, getAdDetail, getAdChart, getAdTodayChart, getAvgChart, getAllChart
}
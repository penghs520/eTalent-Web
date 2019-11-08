// axios请求配置
import axios from 'axios';

function request_get(url, data, callback) {
    axios.get(url, {params: data})
        .then(function (response) {
            callback(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function request_post(url, data, callback) {
    axios.post(url, data)
        .then(function (response) {
            callback(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// 请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let headers = {
        tokens: 'aaaaa'
    };
    Object.assign(config.headers, headers);
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

/**
 * 请求方法
 * @param {string} type 请求方式
 * @param {string} url 请求地址
 * @param {object} data 请求发送的数据
 * @param {function} callback 回调函数
 */
export default function request(type,url, data, callback) {
    switch (type) {
        case 'get' || 'GET':
            request_get(url, data, callback);
            break;
        
        case 'post' || 'POST':
            request_post(url, data, callback);
            break;
    
        default:
            console.error('请求方式写错了，请检查');
            break;
    }
}
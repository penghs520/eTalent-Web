// 基础js方法
import { Message } from 'element-ui';
let base = {
    /**
     * http请求log输出方法
     * @param {string} type http动作，s/send：发送，r/receive：接收
     * @param {string} log 要输出的请求名称
     * @param {object} data http请求返回的值
     */
    log(type, log, data) {
        if (type === 's' || type === 'send') {
            console.log(`${log}----发送的数据是:`);
            console.log(data);
        }else if(type === 'r' || type === 'receive') {
            console.log(`${log}----返回的数据是:`);
            console.log(data);
        }
    },

    /**
     * http请求success !== true 时的提醒
     * @param {json} data http请求接收的数据res.data
     */
    error(data) {
        Message({
            message: `${data.message} code: ${data.code}`,
            type: 'error'
        })
    },

    /**
     * http请求success === true 时的提醒
     * @param {json} data http请求接收的数据res.data
     */
    success(data) {
        Message({
            message: `${data.message} code: ${data.code}`,
            type: 'success'
        })
    },
};

export default base;
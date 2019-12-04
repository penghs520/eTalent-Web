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

    /**
     * 根据身份证号码计算年龄，向下取整
     * @param {string} idNumber 身份证号码
     */
    getAgeFromIdNumber(idNumber) {
        if (typeof idNumber === 'string' && idNumber.length === 18) {
            let idDate = idNumber.slice(6, 14);
            let date = `${idDate.slice(0,4)}-${idDate.slice(4,6)}-${idDate.slice(6)}`;
            let birthday = new Date(date).getTime();
            let now = Date.now();
            let age = Math.floor((now - birthday)/(1000 * 60 * 60 * 24 * 365));
            return age;
        }else{
            return '请传入正确的身份证号码：字符串格式、18位'
        }
    },

    blobDownLoad(response, isTxt=false, uncode=false) {
        if (response.status === 200) {
            // 
            console.log(response.headers)
            let name = response.headers['filename'];
            if (uncode) {
                // 解码
                name = decodeURI(name);
            }
            console.log('文件名')
            console.log(name);
            let blob;
            if (isTxt) {
                blob = new Blob([JSON.stringify(response.data)]);
            }else{
                blob = new Blob([response.data]);
            }
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = name;
            // document.body.appendChild(a)
            
            a.click();
            // 释放这个临时的对象url
            window.URL.revokeObjectURL(url);
        }else{
            Message({
                message: `下载失败，http status: ${response.status}`,
                type: 'error'
            })
        }
    },
};

export default base;
// 基础js方法
import { Message } from 'element-ui';
import XLSX from 'xlsx';
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


     /**
     * 将本地单个excel文件转为数组,返回该数组(待更新)
     * @param {file} file 上传的文件
     * @param {Function}  解析数据成功后的回调,传入解析成功的数据 
     */
    getExcelTable(file,callBack){
         let fileReader = new FileReader()

        fileReader.onload = function(ev) {
            try {
                var data = ev.target.result
                var workbook = XLSX.read(data, { // 以二进制流方式读取得到整份excel表格对象
                        type: 'binary'
                    })
                var persons = []; // 存储获取到的数据
            } catch (e) {
                console.log('文件类型不正确');
                return;
            }
            // 表格的表格范围，可用于判断表头数量是否正确
            var fromTo = '';
            // 遍历每张表读取
            for (var sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    fromTo = workbook.Sheets[sheet]['!ref'];
                    // console.log(fromTo);//打印表格范围
                    persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));                   
                    /*使用XLSX.utils.sheet_to_json方法解析表格对象返回相应的JSON数据 */ 

                    // break; // 如果只取第一张表，就取消注释这行
                }
            }
            callBack(persons)
        }; 
         fileReader.readAsBinaryString(file);              
    },

    /**
     * dom对象转字符串
     * @param {Object} domObject dom对象，ref注册的dom
     */
    domString(domObject) {
        const div = document.createElement("div")
        div.appendChild(domObject)
        return div.innerHTML
    },
};

export default base;
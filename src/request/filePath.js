// 下载文件的路径配置
/**
 * 使用方法
import file from '../../request/filePath';
 
 download(fileName) {
    let url = file[fileName];
    if (url) {
        window.open(url, "_self");
    }
 }
 download('工作经历);
 */
let path = {
    '工作经历':     'http://193.112.188.180/file/importTemplate/archive/%B9%A4%D7%F7%BE%AD%C0%FA%D7%D3%BC%AF.xls',
    '黑名单导入':   'http://193.112.188.180/file/importTemplate/archive/%BA%DA%C3%FB%B5%A5%B5%BC%C8%EB.xls',
    '家庭成员':     'http://193.112.188.180/file/importTemplate/archive/%BC%D2%CD%A5%B3%C9%D4%B1%D7%D3%BC%AF.xls',
    '教育经历':     'http://193.112.188.180/file/importTemplate/archive/%BD%CC%D3%FD%BE%AD%C0%FA%D7%D3%BC%AF.xls',
    '人事异动':     'http://193.112.188.180/file/importTemplate/archive/%C8%CB%CA%C2%D2%EC%B6%AF%D7%D3%BC%AF%B5%BC%C8%EB%C4%A3%B0%E5%A3%A8%D0%C2%D4%F6%29.xls',
    '人员基本信息': 'http://193.112.188.180/file/importTemplate/archive/%C8%CB%D4%B1%BB%F9%B1%BE%D0%C5%CF%A2%B5%BC%C8%EB%C4%A3%B0%E5%28%D3%D0%B8%C4%B6%AF%A3%A9.xls',
    '新签合同':     'http://193.112.188.180/file/importTemplate/archive/%D0%C2%C7%A9%BA%CF%CD%AC%B5%BC%C8%EB%C4%A3%B0%E5.xls',
    '预入职':       'http://193.112.188.180/file/importTemplate/archive/%D4%A4%C8%EB%D6%B0%B5%BC%C8%EB%C4%A3%B0%E5%A3%A8%D3%D0%B8%C4%B6%AF%C9%BE%B3%FD%D6%B0%BC%B6%D6%B0%B5%C8%A3%A9.xls',
    '职称':         'http://193.112.188.180/file/importTemplate/archive/%D6%B0%B3%C6%D7%D3%BC%AF.xls',
    '职业资格':     'http://193.112.188.180/file/importTemplate/archive/%D6%B0%D2%B5%D7%CA%B8%F1%D7%D3%BC%AF.xls',
    '机构导入':     'http://193.112.188.180/file/importTemplate/organization/%BB%FA%B9%B9%B5%BC%C8%EB%C4%A3%B0%E5.xls',
    '岗位导入':     'http://193.112.188.180/file/importTemplate/organization/%B8%DA%CE%BB%B5%BC%C8%EB%C4%A3%B0%E5.xls',

};

export default path;
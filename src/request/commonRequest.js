// 请求公用数据法用法
import base from '../assets/js/base';
import {staff_api1,staff_api2, orgRepair_api1} from './api';

// 请求方法
let method = {
    // 请求机构树
    orgTree_getCompany(callback) {
        staff_api1(null, res => {
            base.log('s', 'commonRequest--公司id', res)
            let d = res.data;
            if (d.success) {
                this.orgTree_getDepartment(d.result, callback);
            }else{
                base.error(d);
            }
        })
    },
    orgTree_getDepartment(id, callback) {
        let send = {"companyId": id};
        base.log('s', 'commonRequest--机构树', send);
        staff_api2(send, res => {
            let d = res.data;
            base.log('r', 'commonRequest--机构树', d);
            if (d.success) {
                callback([d.result])
            }else{
                base.error(d);
            }
        })
    },

    // 从彭洪思这里取机构树
    getOrgTreeFromP(callback) {
        let send = {
            isEnable: 0
        };
        base.log("s", "commonRequest--机构树p", send);
        orgRepair_api1(send, res => {
            let d = res.data;
            base.log("r", "commonRequest--机构树p", d);
            if (d.success) {
                callback(d.result.list);
            } else {
                base.error(d);
            }
        });
    },
};

// 页面调用的方法
let commonRequest = {
    // 机构树
    getOrg(callback) {
        method.orgTree_getCompany(callback);
    },

    // 从彭洪思那里取机构树
    getOrgP(callback) {
        method.getOrgTreeFromP(callback);
    },
};

export default commonRequest;
<style scoped>
    @import url(../../assets/js/orgChart/orgchart-webcomponents.css);
</style>

<template>
    <div id="orgChart">
        <!-- 组织图demo -->
        <div class="chart" id="orgChart"></div>
    </div>
</template>

<script>
import OrgChart from "../../assets/js/orgChart/orgchart-webcomponents.js"

export default {
    name: 'orgChart',           /* 组织图demo */
    data() {
        return {
            direction: 't2b',                       /* 显示方向 */
            tier: 0,                                /* 显示层级 */
            tierList: [1,2,3,4,5,6,7,8,9,10],       /* 显示层级 */
            orgChartData: null,                     /* 机构图数据 */
        }
    },
    methods: {
        // 创建机构图
        /**
         * @param {string} direction    图形显示方向，可能的值：'l2r'-从左到右、't2b'-从上到下
         * @param {number} tier         显示的层级,，0是全显示
         */
        createChart(direction='t2b',tier) {
            let orgchart = new OrgChart({
                'chartContainer': '#orgChart',
                'chartClass': 'orgchartSingleClassName',
                'data' : this.orgChartData,
                'nodeTitle': 'orgName',                 /* 节点标题字段 */
                'childTitle': 'childList',
                'zoom': true,                           /* 鼠标滚轮缩放 */
                'pan': true,                      /* 是否可以拖动 */
                'depth': tier ? tier : 999,
                'direction': direction,
                // 'nodeContent': 'orgType',
                'createNode': function(node, data) {
                    // 创建节点
                    let cont = document.createElement('div');

                    // 添加点击事件
                    cont.addEventListener('click', (event) => {
                        // 这里可以添加点击事件
                    });
                    // 添加属性
                    cont.setAttribute('class', 'nodeCont');
                    // 添加内容
                    let html = `<div>
                                    <img class="personPic" src="${data.attachmentUrl}">
                                    <div class="info">
                                        <p class="text" title="${data.orgManagerName}/${data.orgManagerPositionName}" >${data.orgManagerName}/${data.orgManagerPositionName}</p>
                                        <p class="number">${data.staffNumbers}/${data.planNumbers}</p>
                                    </div>
                                </div>`;
                    cont.innerHTML = html;
                    // 插入节点内
                    node.appendChild(cont);
                }
            });
            let chartNode = document.querySelector('.orgchartSingleClassName');
            if (chartNode) {
                document.querySelector('#orgChart').removeChild(chartNode);
            };
            document.querySelector('#orgChart').appendChild(orgchart);
        },
    }
}
</script>
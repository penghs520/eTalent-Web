<style lang="stylus" scoped>

</style>
<template>
    <div id="organization_station">
        <h1>岗位维护a</h1>
        <organization-chart :datasource="ds" :zoom="true" :pan="true" @node-clic="nodeClick" ></organization-chart>
    </div>
</template>
<script>
import OrganizationChart from 'vue-organization-chart'
import 'vue-organization-chart/dist/orgchart.css'

export default {
    name: "station" /* 岗位维护 */,
    components: {
        OrganizationChart
    },
    data() {
        return {
            ds: {
                'id': '1',
                'name': 'Lao Lao',
                'title': 'general manager',
                'children': [
                    { 'id': '2', 'name': 'Bo Miao', 'title': 'department manager' },
                    { 'id': '3', 'name': 'Su Miao', 'title': 'department manager',
                    'children': [
                        { 'id': '4', 'name': 'Tie Hua', 'title': 'senior engineer' },
                        { 'id': '5', 'name': 'Hei Hei', 'title': 'senior engineer',
                        'children': [
                            { 'id': '6', 'name': 'Pang Pang', 'title': 'engineer' },
                            { 'id': '7', 'name': 'Xiang Xiang', 'title': 'UE engineer' }
                        ]
                        }
                    ]
                    },
                    { 'id': '8', 'name': 'Hong Miao', 'title': 'department manager' },
                    { 'id': '9', 'name': 'Chun Miao', 'title': 'department manager' }
                ],
            }
        };
    },
    mounted() {},
    methods: {
        nodeClick(node) {
            console.log(node)
        },
    }
};
</script>
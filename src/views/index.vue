<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header,
.el-footer {
  background-color: #666C7B;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
}

.el-main {
  color: #333;
  text-align: center;
}
.el-header{
  height: 64px !important;
  display: flex;
  padding: 0 !important;
}
.logo, img{
  width: 240px;
  height: 64px;
  cursor: pointer;
}
.el-menu{
  width: calc(100% - 240px);
}
.el-menu-item{
  height: 63px !important;
}
.topMenu{
  box-shadow: 0px -2px 3px #252525;
}
.el-menu{
  width: 100%;
}
</style>

<template>
    <div id="index">
        <el-container>
            <!-- 顶部导航 -->
            <el-header>
                <div class="logo">
                    <img src="@/assets/img/logo.png" alt="">
                </div>
                <el-menu
                    default-active="0"
                    class="topMenu"
                    mode="horizontal"
                    background-color="#666C7B"
                    text-color="#fff"
                    @select="topSelect"
                    active-text-color="#ffd04b"
                >
                    <el-menu-item v-for="(item,index) in topMenu" :key="index" :index="String(index)">{{item}}</el-menu-item>
                </el-menu>
            </el-header>

            <el-container>
                <!-- 左侧菜单 -->
                <el-aside width="240px">
                    <el-menu default-active="0-0" @select="sideSelect">
                        <el-submenu v-for="(item,index) in sideMenu" :key="index" :index="String(index)" >
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{item.title}}</span>
                            </template>
                            <el-menu-item v-for="(menu, menuIndex) in item.list" :key="menuIndex" :index="`${index}-${menuIndex}`">{{menu}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>

                <!-- 内容区 -->
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import pageName from '../router/pageName.js';
export default {
    name: 'index',
    data() {
        return {
            topMenu: ['组织管理', '员工管理', '权限管理'],
            sideMenuTotal: {
                '组织管理': [
                    {title: '组织机构',list: ['机构维护']},
                    {title: '职位管理',list: ['职位体系']},
                    {title: '岗位管理',list: ['岗位维护']},
                    {title: '用户管理',list: ['用户信息']}
                ],
                '员工管理': [
                    {title: '档案管理',list: ['信息维护', '员工台账', '附件管理']},
                    {title: '劳动合同',list: ['未签合同', '已签合同', '合同概况']}
                ],
                '权限管理': [
                    {title: '角色授权',list: ['角色授权']},
                    {title: '用户授权',list: ['用户授权']},
                    {title: '角色反查',list: ['角色反查']},
                    {title: '权限移交',list: ['权限移交']}
                ],
            },
            topMenuIndex: 0,
            sideMenuIndex: '0-0',
            lastRouteId: '0*0-0'
        };
    },
    computed: {
        sideMenu() {
            return this.sideMenuTotal[this.topMenu[this.topMenuIndex]];
        },
    },
    mounted() {
    },
    methods: {
        topSelect(index) {
            this.topMenuIndex = Number(index);
        },
        sideSelect(index) {
            this.sideMenuIndex = index;
            let routeId = `${this.topMenuIndex}*${index}`;
            if (routeId === this.lastRouteId) {
            return false;
            }else{
            this.lastRouteId = routeId;
            }
            let position = index.split('-');
            let pageNameCh = this.sideMenu[Number(position[0])]['list'][Number(position[1])];
            let route = pageName[pageNameCh];
            this.$router.push(route);
        }
    }
}
</script>

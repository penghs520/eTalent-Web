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
  background-color: #666C7B;
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
#index{
    height: 100%;
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

            <el-container class="section">
                <!-- 左侧菜单 -->
                <el-aside width="240px">
                    <el-menu default-active="organization_repair" :router="true" background-color="#666C7B" text-color="#fff" active-text-color="#FF8C58" >
                        <div v-for="(item,index) in sideMenu" :key="index" >
                            <el-menu-item v-if="!item.children" :index="item.path" >
                                <i class="el-icon-menu"></i>
                                <span slot="title">{{item.chName}}</span>
                            </el-menu-item>
                            <el-submenu v-else :index="String(index)" >
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>{{item.chName}}</span>
                                </template>
                                <el-menu-item v-for="(menu, menuIndex) in item.children" :key="menuIndex" :index="menu.path" :aa="menu.path" >{{menu.chName}}</el-menu-item>
                            </el-submenu>
                        </div>
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
export default {
    name: 'index',
    data() {
        return {
            topMenu: ['组织管理', '员工管理', '权限管理'],
            sideMenuTotal: {
                '组织管理': [],
            },
            topMenuIndex: 0,
        };
    },
    computed: {
        sideMenu() {
            return this.sideMenuTotal[this.topMenu[this.topMenuIndex]];
        }
    },
    mounted() {
        this.topMenu = JSON.parse(localStorage.getItem('topMenu'));
        this.sideMenuTotal = JSON.parse(localStorage.getItem('sideMenu'));
        console.log(this.topMenu)
        console.log(this.sideMenuTotal)
    },
    methods: {
        topSelect(index) {
            this.topMenuIndex = Number(index);
        },
    }
}
</script>

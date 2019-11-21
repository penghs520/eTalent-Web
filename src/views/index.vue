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
    background-color: #666c7b;
    color: #333;
    text-align: center;
}

.el-aside {
    background-color: #666c7b;
    color: #333;
    text-align: center;
}

.el-main {
    color: #333;
    text-align: center;
}
.el-header {
    height: 64px !important;
    display: flex;
    padding: 0 !important;
}
.logo img {
    width: 240px;
    height: 64px;
    cursor: pointer;
}
.el-menu {
    width: calc(100% - 240px);
}
.el-menu-item {
    height: 63px !important;
}
.topMenu {
    box-shadow: 0px -2px 3px #252525;
}
.el-menu {
    width: 100%;
}
#index {
    height: 100%;
}
// 退出
.log_out {
    float: right;
    display: flex;
    align-items: center;
    padding: 10px 30px;
    &:focus {
        outline: none;
    }
    .avatar {
        width: 45px;
        height: 45px;
        border-radius: 25px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .info {
        margin: 0px 10px;
        color: #fff;
        font-size: 16px;
    }
    .el-icon-arrow-down {
        box-sizing: border-box;
        padding: 15px 5px;
        color: #fff;
    }
}
.headerSelect {
    cursor: pointer;
}
.menuTitle{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
}
.menuTitle .text{
    color: #FFFFFF;
    font-size: 16px;
    line-height: 16px;
}
.menuTitle .icon{
    color: #fff;
    font-size: 14px;
    line-height: 14px;
    cursor: pointer;
}
</style>

<template>
    <div id="index">
        <el-container>
            <!-- 顶部导航 -->
            <el-header>
                <div class="logo">
                    <img src="@/assets/img/logo.png" alt />
                </div>
                <el-menu
                    :default-active="String(topMenuIndex)"
                    class="topMenu"
                    mode="horizontal"
                    background-color="#666C7B"
                    text-color="#fff"
                    @select="topSelect"
                    active-text-color="#ffd04b"
                >
                    <el-menu-item
                        v-for="(item,index) in topMenu"
                        :key="index"
                        :index="String(index)"
                    >{{item}}</el-menu-item>
                    <!-- 退出 -->
                    <div class="log_out">
                        <div class="avatar">
                            <img src="../assets/logo.png" alt />
                        </div>
                        <div class="info">
                            <p>{{userInfo.userName}}</p>
                            <p>{{userInfo.companyName}}</p>
                        </div>
                        <el-dropdown class="headerSelect" @command="handleCommand" trigger="click">
                            <span class="el-dropdown-link">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="logOut">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-menu>
            </el-header>

            <el-container class="section">
                <!-- 左侧菜单 -->
                <el-aside width="240px">
                    <div class="menuTitle">
                        <span class="text">导航栏</span>
                        <span class="qj-drawer icon"></span>
                    </div>
                    <el-menu
                        :default-active="activeMenu"
                        :router="true"
                        v-if="resizeMenu"
                        background-color="#666C7B"
                        text-color="#fff"
                        @select="menuSelect"
                        :collapse-transition="false"
                        :collapse="sideMenuCollapse"
                        active-text-color="#FF8C58"
                    >
                        <div v-for="(item,index) in sideMenu" :key="index">
                            <el-menu-item v-if="!item.children" :index="item.path">
                                <i class="el-icon-menu"></i>
                                <span slot="title">{{item.chName}}</span>
                            </el-menu-item>
                            <el-submenu v-else :index="String(index)">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>{{item.chName}}</span>
                                </template>
                                <el-menu-item
                                    v-for="(menu, menuIndex) in item.children"
                                    :key="menuIndex"
                                    :index="menu.path"
                                    :aa="menu.path"
                                >{{menu.chName}}</el-menu-item>
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
import { login_api5 } from "../request/api";
export default {
    name: "index",
    data() {
        return {
            topMenu: ["组织管理", "员工管理", "权限管理"],
            sideMenuTotal: {
                组织管理: []
            },
            topMenuIndex: 0,
            sideMenu: [],
            activeMenu: '',
            resizeMenu: true,
            sideMenuCollapse: false,
            userInfo: {
                userName: "",
                companyName: ""
            }
        };
    },
    created() {
        //设置用户信息,缓存里没有数据返回登录页
        try {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            this.userInfo.userName = userInfo.result.userName;
            this.userInfo.companyName = userInfo.result.companyName;
        } catch (error) {
            this.$message.warning("请先登录");
            this.$router.push("/");
        };
        this.init();
    },
    mounted() {
    },
    methods: {
        topSelect(index) {
            this.resizeMenu = false;
            this.sideMenu = [];
            // 存顶部当前激活菜单index值
            localStorage.setItem('topMenuIndex',String(index));
            // 取侧边显示的菜单
            this.sideMenu = this.sideMenuTotal[this.topMenu[Number(index)]];
            // 设置侧边菜单的默认激活节点
            this.setActiveFromTop();
            setTimeout(() => {
                this.resizeMenu = true;
            },0);
            // 跳转到侧边菜单的默认激活节点上
            this.$router.push(`${this.activeMenu}`);
        },
        init() {
            // 取顶部菜单
            this.topMenu = JSON.parse(localStorage.getItem("topMenu"));
            // 取侧边总菜单
            this.sideMenuTotal = JSON.parse(localStorage.getItem("sideMenu"));
            // 取顶部当前激活菜单index值
            this.topMenuIndex = localStorage.getItem('topMenuIndex') ? Number(localStorage.getItem('topMenuIndex')) : 0;
            // 取侧边显示的菜单
            this.sideMenu = this.sideMenuTotal[this.topMenu[this.topMenuIndex]];
            // 取侧边显示菜单的当前激活节点
            this.setCurrentPath();
        },
        setCurrentPath() {
            let leftMenuActive = localStorage.getItem('leftMenuActive');
            if (leftMenuActive) {
                this.activeMenu = leftMenuActive;
            }else{
                this.setActiveFromTop();
            }
        },
        // 根据顶部菜单设置侧边菜单的默认激活节点
        setActiveFromTop() {
            if (this.sideMenu[0].children) {
                this.activeMenu =  this.sideMenu[0].children[0].path;
            }else{
                this.activeMenu =  this.sideMenu[0].path;
            }
        },
        menuSelect(index) {
            // 存侧边菜单当前节点
            localStorage.setItem('leftMenuActive', index);
        },
        //退出登陆
        handleCommand(command) {
            if (command == "logOut") {
                login_api5(null, () => {
                    localStorage.removeItem("userInfo");
                    this.$message.success("已退出");
                    this.$router.push("/");
                    // 清空存储的数据
                    localStorage.setItem("topMenu", '');
                    localStorage.setItem("sideMenu", '');
                    localStorage.setItem("topMenuIndex", '');
                    localStorage.setItem("leftMenuActive", '');
                });
            }
        }
    }
};
</script>

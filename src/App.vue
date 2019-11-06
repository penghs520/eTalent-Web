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
  <div id="app">
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
          <el-menu-item v-for="(item,index) in topMenu" :key="index" :index="index">{{item}}</el-menu-item>
        </el-menu>
      </el-header>

      <el-container>
        <!-- 左侧菜单 -->
        <el-aside width="240px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
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
export default {
  data() {
    return {
      topMenu: ['个人门户', '组织中台', '系统管理'],
    };
  },
  mounted() {},
  methods: {
    topSelect(index,path) {
      console.log('------------');
      console.log(index);
      console.log(path);
    },
  }
}
</script>

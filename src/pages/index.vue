<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <img class="logo" alt @click="$router.push({path:'/'}).catch(()=>{})" />
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="welcome">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">文章管理</span>
            </template>
            <el-menu-item index="postlist">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>文章列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2-2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>文章发布</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>栏目管理</span>
            </template>
            <el-menu-item index="3-1">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>栏目列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="el-icon-s-fold toggle-btn"></span>
          <span class="system-title">黑马头条后台管理系统</span>
          <div class="welcomes">
            <span class="user">
              <img :src="user.head_img" alt />
            </span>
            <span>欢迎你：52期的小伙伴</span> &nbsp;&nbsp;
            <span>退出</span>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { user, baseURL } from '../myapi/user'
export default {
  data () {
    return {
      user: {}
    }
  },
  async mounted () {
    console.log(JSON.parse(localStorage.getItem('heima_back_user')).id)
    const res = await user(JSON.parse(localStorage.getItem('heima_back_user')).id)
    console.log(res)
    res.data.data.head_img = baseURL + res.data.data.head_img
    this.user = res.data.data
    console.log(this.user)
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;

  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    width: 100%;
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcomes {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: white;

    > span {
      padding-left: 10px;
      //   vertical-align: middle;
    }
    > .user {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
</style>

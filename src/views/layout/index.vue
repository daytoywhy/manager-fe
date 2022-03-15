<template>
  <div class="common-layout">
    <el-container class="container">
      <el-aside class="layout-aside">
        <div class="logo-wrapper">
          <img src="../../assets/img/cloud-experience.png"
               class="logo"
               alt="vue3">
          <h3 class="title">Vue3开发</h3>
        </div>
        <el-menu active-text-color="#ffd04b"
                 background-color="#051427"
                 class="el-menu-vertical-demo"
                 router
                 :default-active="activeMenu"
                 text-color="#fff">
          <treeMenu :menuList="menuList" />
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="layout-header">
          <LyHeader />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LyHeader from './head/index.vue'
import treeMenu from "./menu/treeMenu.vue";
import { menuList } from "./menu.js";
import { ref } from "vue";
export default {
  components: { treeMenu, LyHeader },
  setup (props) {
    const activeMenu = ref(location.hash.slice(1))
    return {
      menuList,
      activeMenu
    }
  }
}

</script>

<style lang="sass">
.common-layout
  width: 100vw
  height: 100vh
  background-color: #e0e1e5
  .container
    height: 100%
    .layout-aside
      background-color: #051427
      width: 200px
      .logo-wrapper
        display: flex
        justify-content: center
        align-items: center
        .logo
          width: 35px
          height: 35px
          margin-right: 10px
    .layout-header
      background-color: #fff
</style>
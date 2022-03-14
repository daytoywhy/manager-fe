<template>
  <div class="common-layout">
    <el-container class="container">
      <el-aside class="layout-aside">
        <LyMenu />
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
import LyMenu from './menu/index.vue'
import LyHeader from './head/index.vue'
export default {
  components: { LyMenu, LyHeader },
  setup (props) {
    return {

    }
  }
}

</script>

<style lang="sass">
.common-layout
  width: 100vw
  height: 100vh
  .container
    height: 100%
    .layout-aside
      background-color: #545c64
      width: 200px
    .layout-header
      background-color: #545c64
</style>
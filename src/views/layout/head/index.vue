<template>
  <div class="layout-head">
    <div>
      <h3 class="title">学以致用后台管理</h3>
    </div>
    <div class="avatar">
      <el-avatar class="avatar-icon"
                 :size="40"
                 :src="circleUrl" />
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
          陈祥雄<el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  setup (props) {
    const circleUrl = ref(
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    )
    return {
      circleUrl
    }
  }
}
</script>

<style lang="sass">
.layout-head
  display: flex
  justify-content: space-between
  .title
    line-height: 66px
    color: #fff
  .avatar
    .avatar-icon
      margin: 12px 20px 12px 0
    .el-dropdown-link
      line-height: 66px
      color: #fff
</style>
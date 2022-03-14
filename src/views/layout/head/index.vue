<template>
  <div class="layout-head">
    <div class="breadcrumb">
      <h2 class="router-title">当前路由名称</h2>
      <el-breadcrumb :separator-icon="ArrowRight"
                     class="breadcrumb-container">
        <el-breadcrumb-item>homepage</el-breadcrumb-item>
        <el-breadcrumb-item>promotion management</el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
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
            <el-dropdown-item>基本信息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ArrowRight } from '@element-plus/icons-vue'
export default {
  setup (props) {
    const router = useRouter()
    const circleUrl = ref(
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    )
    const logout = () => {
      router.push('/login')
    }
    return {
      circleUrl,
      logout,
      ArrowRight
    }
  }
}
</script>

<style lang="sass">
.layout-head
  display: flex
  justify-content: space-between
  .breadcrumb
    color: #fff
    .router-title
      margin-top: 5px
    .breadcrumb-container
      color: blue
      margin-top: 5px
  .avatar
    .avatar-icon
      margin: 12px 20px 12px 0
    .el-dropdown-link
      line-height: 66px
      color: #fff
</style>
<template>
  <div class="layout-head">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     class="breadcrumb-container">
        <el-breadcrumb-item v-for="(item,index) in breadList"
                            :key="item.path">
          <router-link to="/"
                       v-if="index == 0">{{item.meta.title}}</router-link>
          <span v-else>{{item.meta.title}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="avatar">
      <el-avatar class="avatar-icon"
                 :size="40"
                 :src="circleUrl" />
      <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
          陈祥雄
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
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  setup (props) {
    const route = useRoute()
    const router = useRouter()
    const circleUrl = ref(
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    )
    const logout = () => {
      router.push('/login')
    }
    const breadList = computed(() => {
      console.log(route.matched, 'match');
      return route.matched
    })
    return {
      circleUrl,
      logout,
      breadList,
    }
  }
}
</script>

<style lang="sass">
.layout-head
  display: flex
  justify-content: space-between
  padding-right: 30px
  .breadcrumb
    padding-top: 20px
    .breadcrumb-container
      color: blue
      margin-top: 5px
  .avatar
    .avatar-icon
      margin: 12px 10px 12px 0
    .el-dropdown-link
      color: #789ccc
      line-height: 66px
</style>
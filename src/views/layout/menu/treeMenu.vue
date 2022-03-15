<template>
  <template v-for="menu in menuList"
            :key="menu._id">
    <el-sub-menu v-if="menu.children && menu.children.length > 0 && menu.children[0].menuType == 1"
                 :index="menu.path">
      <template #title>
        <el-icon>
          <setting />
        </el-icon>
        <span>{{ menu.menuName}}</span>
      </template>
      <treeMenu :menuList="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else-if="menu.menuType == 1"
                  :index="menu.path"
                  :key="menu._id">{{menu.menuName}}</el-menu-item>
  </template>
</template>

<script>
import {
  Setting,
} from '@element-plus/icons-vue'
export default {
  name: 'treeMenu',
  components: { Setting },
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    return {

    }
  }
}
</script>

<style lang="sass">
.title
  line-height: 66px
  color: #fff
  text-align: center
.el-menu-vertical-demo
  border-right: 1px solid #545c64
</style>
<template>
  <div style="margin-bottom:20px">
    <el-card>
      <el-form :inline="true"
               ref="formRef"
               :model="menuForm">
        <el-form-item label="菜单名称"
                      prop="menuName">
          <el-input v-model="menuForm.menuName"
                    placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单状态"
                      prop="menuStatus">
          <el-select v-model="menuForm.menuStatus"
                     placeholder="请选择菜单状态">
            <el-option value="0"
                       label="正常"></el-option>
            <el-option value="1"
                       label="停用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
  <div>
    <el-card>
      <div style="margin-bottom:20px">
        <el-button type="primary"
                   @click="createMenu">创建</el-button>
      </div>
      <el-table :data="tableData"
                row-key="_id">
        <el-table-column v-for="item in column"
                         :key="item.prop"
                         :prop="item.prop"
                         :label="item.label"
                         :formatter="item.formatter" />
        <el-table-column label="操作"
                         width="200px">
          <template #default="scoped">
            <el-button @click="add(scoped.row)"
                       size="small">新增</el-button>
            <el-button @click="edit(scoped.row)"
                       size="small">编辑</el-button>
            <el-button @click="del(scoped.row)"
                       type="danger"
                       size="small">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <CreateMenu ref="createMenuRef"
                  :menuData="tableData" />
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";
import { menuData } from "./data.js";
import CreateMenu from "./componets/createMenu/index.vue";
export default {
  components: { CreateMenu },
  setup () {
    const { ctx } = getCurrentInstance()
    const tableData = ref(menuData)
    const column = ref(
      [
        {
          label: '菜单名称',
          prop: 'menuName',
        },
        {
          label: '图标',
          prop: 'icon',
        },
        {
          label: '菜单类型',
          prop: 'menuType',
        },
        {
          label: '权限标识',
          prop: 'permission',
        },
        {
          label: '路由地址',
          prop: 'routerAddress',
        },
        {
          label: '组件路径',
          prop: 'componentRoute',
        },
        {
          label: '菜单状态',
          prop: 'menuStatus',
          formatter (row, column, value) {
            return {
              1: '正常',
              2: '停用'
            }[value];
          }
        },
        {
          label: '创建时间',
          prop: 'createTime',
        },
      ]
    )
    const menuForm = reactive({
      menuName: '',
      menuStatus: ''
    })
    const resetForm = () => {
      ctx.$refs.formRef.resetFields()
    }
    const createMenu = () => {
      ctx.$refs.createMenuRef.show()
    }
    return {
      menuForm,
      column,
      tableData,
      resetForm,
      createMenu
    }
  }
}
</script>

<style>
</style>
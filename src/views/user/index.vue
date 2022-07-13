<template>
  <div style="margin-bottom:20px">
    <el-card>
      <el-form :inline="true"
               ref="formRef"
               :model="userForm">
        <el-form-item label="用户ID"
                      prop="userId">
          <el-input v-model="userForm.userId"
                    placeholder="请输入用户Id"></el-input>
        </el-form-item>
        <el-form-item label="用户名"
                      prop="userName">
          <el-input v-model="userForm.userName"
                    placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="职业"
                      prop="position">
          <el-select v-model="userForm.position"
                     placeholder="请选择职业">
            <el-option value="0"
                       label="所有"></el-option>
            <el-option value="1"
                       label="在职"></el-option>
            <el-option value="2"
                       label="离职"></el-option>
            <el-option value="3"
                       label="试用期"></el-option>
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
                   @click="addUser">新增</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
      <el-table :data="tableData">
        <el-table-column type="selection"
                         width="50px"></el-table-column>
        <el-table-column v-for="item in column"
                         :key="item.prop"
                         :prop="item.prop"
                         :label="item.label" />
        <el-table-column label="操作"
                         width="200px">
          <template #default="scoped">
            <el-button @click="edit(scoped.row)"
                       size="small">编辑</el-button>
            <el-button @click="edit(scoped.row)"
                       type="danger"
                       size="small">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="pagination">
        <el-pagination background
                       :page-size="pager.pageSize"
                       layout="prev, pager, next"
                       :total="pager.total"
                       @current-change="handleCurrentChange" />
      </div>

    </el-card>
    <AddUser ref="addUserRef" />
  </div>
</template>

<script>
const data = [
  {
    userId: '20220315',
    userName: '陈祥熊',
    address: '132378@qq.com',
    role: '丑八怪',
    status: '离职',
    registerTime: '2022-03-15',
    finalTime: '2022-03-15'
  }, {
    userId: '20220315',
    userName: '黄泽锋色鬼',
    address: '132378@qq.com',
    role: '老色鬼',
    status: '离职',
    registerTime: '2022-03-15',
    finalTime: '2022-03-15'
  }
]
import { ref, reactive, getCurrentInstance } from "vue";
import AddUser from "./components/add/index.vue";
export default {
  name: 'userManage',
  components: {
    AddUser
  },
  setup (props) {
    const { ctx } = getCurrentInstance()
    const userForm = reactive({
      userId: '',
      userName: '',
      position: ''
    })
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
      total: 100
    })
    const column = reactive([
      {
        label: '用户ID',
        prop: 'userId'
      },
      {
        label: '用户名',
        prop: 'userName'
      },
      {
        label: '用户邮箱',
        prop: 'address'
      },
      {
        label: '用户角色',
        prop: 'role'
      },
      {
        label: '用户状态',
        prop: 'status'
      },
      {
        label: '注册时间',
        prop: 'registerTime'
      },
      {
        label: '最后登录时间',
        prop: 'finalTime'
      },
    ])
    const tableData = ref(data)
    const resetForm = () => {
      ctx.$refs.formRef.resetFields()
    }
    const handleCurrentChange = (current) => {
      pager.pageNum = current
    }
    const addUser = () => {
      ctx.$refs.addUserRef.show()
    }
    return {
      userForm,
      tableData,
      column,
      resetForm,
      pager,
      handleCurrentChange,
      addUser
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
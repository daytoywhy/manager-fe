<template>
  <div style="margin-bottom:20px">
    <el-card>
      <el-form :inline="true"
               :model="userForm">
        <el-form-item label="用户ID">
          <el-input v-model="userForm.userId"
                    placeholder="请输入用户Id"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userForm.userName"
                    placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="职业">
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
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
  <div>
    <el-card>
      <el-table :data="tableData">
        <el-table-column prop="userId"
                         label="用户ID"
                         width="180" />
        <el-table-column prop="userName"
                         label="用户名"
                         width="180" />
        <el-table-column prop="address"
                         label="用户邮箱" />
        <el-table-column prop="role"
                         label="用户角色" />
        <el-table-column prop="status"
                         label="用户状态" />
        <el-table-column prop="registerTime"
                         label="注册时间" />
        <el-table-column prop="finalTime"
                         label="最后登录时间" />
        <el-table-column prop="operate"
                         label="操作" />

      </el-table>
    </el-card>
  </div>
</template>

<script>
const data = [
  {
    userId: '20220315',
    userName: '曾涵友',
    address: '132378@qq.com',
    role: '丑八怪',
    status: '离职',
    registerTime: '2022-03-15',
    finalTime: '2022-03-15'
  }
]
import { ref, reactive } from "vue";
export default {
  name: 'userManage',
  setup (props) {
    const userForm = reactive({
      userId: '',
      userName: '',
      position: ''
    })
    const tableData = ref(data)
    return {
      userForm,
      tableData
    }
  }
}
</script>

<style>
</style>
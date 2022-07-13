<template>
  <el-dialog v-model="dialogVisible"
             title="新增用户"
             width="600px"
             :destroy-on-close="true"
             draggable>
    <el-form ref="formRef"
             :rules="addRule"
             label-width="100px"
             :model="addForm">
      <el-form-item label="用户名"
                    prop="userName">
        <el-input v-model="addForm.userName"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="email">
        <el-input v-model="addForm.email"
                  placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号"
                    prop="phone">
        <el-input v-model="addForm.phone"
                  placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="职业"
                    prop="work">
        <el-input v-model="addForm.work"
                  placeholder="请输入职业"></el-input>
      </el-form-item>
      <el-form-item label="性别"
                    prop="sex">
        <el-select v-model="addForm.sex"
                   placeholder="请选择性别">
          <el-option value="0"
                     label="女"></el-option>
          <el-option value="1"
                     label="男"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="爱好"
                    prop="ability">
        <el-input v-model="addForm.ability"
                  placeholder="请输入爱好"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary"
                   @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";
import { userApi } from '@/api'
export default {
  setup () {
    const { ctx } = getCurrentInstance()
    const addForm = reactive({})
    const dialogVisible = ref(false)
    const addRule = reactive({
      userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      address: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
      sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
      phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { pattern: /1\d{10}/, message: '请输入正确的手机号', trigger: 'blur' }],
    })
    const show = () => {
      dialogVisible.value = true
    }
    const cancel = () => {
      dialogVisible.value = false
    }
    const confirm = () => {
      ctx.$refs.formRef.validate(valid => {
        if (valid) {
          addUsersApi()

        }
      })
    }
    const addUsersApi = () => {
      const params = Object.assign({}, addForm)
      userApi.addUsers(params).then(res => {
        dialogVisible.value = true
      })
    }
    return {
      dialogVisible,
      addForm,
      show,
      cancel,
      confirm,
      addRule
    }
  }
}
</script>

<style>
</style>
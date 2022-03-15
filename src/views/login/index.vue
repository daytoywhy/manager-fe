<template>
  <div class="login-wrapper">
    <div class="container">
      <p class="login-title">后台管理系统</p>
      <el-form ref="ruleFormRef"
               :model="ruleForm"
               :rules="rules">
        <el-form-item prop="userName"
                      style="margin:30px 0">
          <el-input v-model="ruleForm.userName"
                    :prefix-icon="Avatar"></el-input>
        </el-form-item>
        <el-form-item prop="password"
                      style="margin:30px 0">
          <el-input v-model="ruleForm.password"
                    :prefix-icon="Key"></el-input>
        </el-form-item>
        <el-form-item style="margin:30px 0">
          <el-button type="primary"
                     @click="submitForm(ruleFormRef)"
                     style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { Avatar, Key } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
export default {
  setup (props, cxt) {
    const router = useRouter()
    const ruleFormRef = ref(null)
    const ruleForm = reactive({
      userName: '',
      password: ''
    })
    const rules = reactive({
      userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
      ],
    })
    const submitForm = async (ruleFormRef) => {
      if (!ruleFormRef) return
      ruleFormRef.validate((valid, fields) => {
        if (valid) {
          router.push('/welcome')
        } else {
          ElMessage.warning('填写不规范，请确认后提交')
        }
      })
    }
    return {
      ruleFormRef,
      ruleForm,
      rules,
      Avatar,
      Key,
      submitForm
    }
  }
}



</script>

<style lang="sass">
.login-wrapper
  height: 100vh
  width: 100vw
  display: flex
  justify-content: center
  align-items: center
  .container
    padding: 50px
    height: 400px
    width: 450px
    border: 1px solid #f9f3f9
    border-radius: 5px
    box-shadow: 0 0 10px 5px #c7c9cb
    .login-title
      height: 50px
      line-height: 50px
      font-size: 22px
      text-align: center
</style>
<template>
  <div class="login-wrapper">
    <div class="container">
      <p class="login-title">后台管理系统</p>
      <el-form ref="ruleFormRef"
               :model="ruleForm"
               :rules="rules">
        <el-form-item prop="username"
                      style="margin:30px 0">
          <el-input v-model="ruleForm.username"
                    placeholder="请输入用户名"
                    :prefix-icon="Avatar"></el-input>
        </el-form-item>
        <el-form-item prop="password"
                      style="margin:30px 0">
          <el-input v-model="ruleForm.password"
                    type="password"
                    placeholder="请输入密码"
                    :prefix-icon="Key"></el-input>
        </el-form-item>
        <el-form-item style="margin:30px 0">
          <el-button type="primary"
                     @click="submitForm(ruleFormRef)"
                     style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="footer">
        <div @click="registry">注册账号</div>
        <div @click="findPassword">找回密码</div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible"
               title="注册账号"
               width="600px"
               :destroy-on-close="true"
               draggable>
      <el-form ref="formRef"
               :rules="registryRule"
               label-width="100px"
               :model="registryForm">
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="registryForm.username"
                    placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="registryForm.password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary"
                     @click="registryConfirm(formRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { Avatar, Key } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { userApi } from '../../api/index'
import { useStore } from 'vuex'
export default {
  setup (props, cxt) {
    const store = useStore()
    const router = useRouter()
    const ruleFormRef = ref(null)
    const formRef = ref(null)
    const dialogVisible = ref(false)
    const ruleForm = reactive({
      username: '',
      password: ''
    })
    const registryForm = reactive({
      username: '',
      password: ''
    })
    const rules = reactive({
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
      ],
    })
    const registryRule = reactive({
      username: [
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
          loginApi()
        } else {
          ElMessage.warning('填写不规范，请确认后提交')
        }
      })
    }
    const registryConfirm = async (formRef) => {
      if (!formRef) return
      formRef.validate((valid, fields) => {
        if (valid) {
          registryApi()
        } else {
          ElMessage.warning('填写不规范，请确认后提交')
        }
      })
    }
    const loginApi = () => {
      const params = Object.assign({}, ruleForm)
      userApi.login(params).then(res => {
        const { code, token } = res
        if (code == 200) {
          store.commit('SET_TOKEN', token)
          sessionStorage.setItem('token', token)
          router.push('/welcome')
        } else {
          ElMessage.error('用户名不存在或者密码错误～')
        }
      })
    }
    const registryApi = () => {
      const params = Object.assign({}, registryForm)
      console.log(params, 'param');
      userApi.registry(params).then(res => {
        const { code, message } = res
        if (code == 200) {
          cancel()
          ElMessage.success(message)
        }
      })
    }
    const registry = () => {
      dialogVisible.value = true
    }
    const cancel = () => {
      dialogVisible.value = false
    }
    return {
      ruleFormRef,
      formRef,
      ruleForm,
      rules,
      Avatar,
      Key,
      submitForm,
      registryForm,
      registryRule,
      registry,
      dialogVisible,
      registryConfirm,
      cancel
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
  background-image: url('../../assets/img/login-background.png')
  .container
    padding: 50px
    height: 400px
    width: 450px
    border: 1px solid #f9f3f9
    border-radius: 5px
    background-color: #fff
    .login-title
      height: 50px
      line-height: 50px
      font-size: 22px
      text-align: center
    .footer
      display: flex
      align-items: center
      justify-content: space-around
      color: #409eff
</style>